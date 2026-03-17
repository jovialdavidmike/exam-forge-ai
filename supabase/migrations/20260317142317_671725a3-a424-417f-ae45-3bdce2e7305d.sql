
-- Fix 1: Add auth.uid() check and bounds validation to update_user_stats
CREATE OR REPLACE FUNCTION public.update_user_stats(p_user_id uuid, p_points_to_add integer, p_questions_to_add integer, p_correct_to_add integer, p_quizzes_to_add integer DEFAULT 0)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
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

-- Fix 2: Add trigger to prevent direct score column manipulation
CREATE OR REPLACE FUNCTION public.restrict_profile_columns()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.points IS DISTINCT FROM OLD.points
     OR NEW.correct_answers IS DISTINCT FROM OLD.correct_answers
     OR NEW.questions_answered IS DISTINCT FROM OLD.questions_answered
     OR NEW.quizzes_completed IS DISTINCT FROM OLD.quizzes_completed THEN
    RAISE EXCEPTION 'cannot directly modify stats columns';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_profile_columns
BEFORE UPDATE ON public.profiles
FOR EACH ROW
WHEN (current_setting('role') != 'postgres')
EXECUTE FUNCTION public.restrict_profile_columns();
