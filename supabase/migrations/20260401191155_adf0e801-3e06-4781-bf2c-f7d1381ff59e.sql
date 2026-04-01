
-- Create a table to log stat update calls for rate limiting
CREATE TABLE public.stat_update_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stat_update_log ENABLE ROW LEVEL SECURITY;

-- No direct client access to this table
-- Only the SECURITY DEFINER function will interact with it

-- Update the function to include rate limiting
CREATE OR REPLACE FUNCTION public.update_user_stats(
  p_user_id uuid,
  p_points_to_add integer,
  p_questions_to_add integer,
  p_correct_to_add integer,
  p_quizzes_to_add integer DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  recent_calls integer;
BEGIN
  -- Ensure caller can only update their own stats
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  -- Validate reasonable bounds per call
  IF p_points_to_add < 0 OR p_points_to_add > 10 THEN
    RAISE EXCEPTION 'invalid increment';
  END IF;
  IF p_questions_to_add < 0 OR p_questions_to_add > 1 THEN
    RAISE EXCEPTION 'invalid increment';
  END IF;
  IF p_correct_to_add < 0 OR p_correct_to_add > 1 THEN
    RAISE EXCEPTION 'invalid increment';
  END IF;
  IF p_quizzes_to_add < 0 OR p_quizzes_to_add > 1 THEN
    RAISE EXCEPTION 'invalid increment';
  END IF;

  -- Rate limit: max 5 calls per 10 seconds per user
  SELECT count(*) INTO recent_calls
  FROM public.stat_update_log
  WHERE user_id = p_user_id
    AND created_at > now() - interval '10 seconds';

  IF recent_calls >= 5 THEN
    RAISE EXCEPTION 'rate limit exceeded';
  END IF;

  -- Log this call
  INSERT INTO public.stat_update_log (user_id) VALUES (p_user_id);

  -- Clean up old logs (older than 1 minute)
  DELETE FROM public.stat_update_log
  WHERE created_at < now() - interval '1 minute';

  UPDATE profiles
  SET
    points = points + p_points_to_add,
    questions_answered = questions_answered + p_questions_to_add,
    correct_answers = correct_answers + p_correct_to_add,
    quizzes_completed = quizzes_completed + p_quizzes_to_add,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;
