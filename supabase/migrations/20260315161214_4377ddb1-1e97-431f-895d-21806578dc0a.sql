
-- 1. Drop the existing permissive UPDATE policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 2. Create a restrictive UPDATE policy that only allows username changes
CREATE POLICY "Users can update own username"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. Create a SECURITY DEFINER function to safely update stats (only callable server-side)
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
SET search_path = public
AS $$
BEGIN
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

-- 4. Grant execute to authenticated users (they call it, but it runs with definer privileges)
GRANT EXECUTE ON FUNCTION public.update_user_stats TO authenticated;
