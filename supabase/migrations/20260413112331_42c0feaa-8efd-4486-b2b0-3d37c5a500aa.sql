-- Revoke UPDATE privilege on score columns from authenticated role
-- This prevents direct REST API manipulation of scores
-- The update_user_stats SECURITY DEFINER function (runs as owner) is unaffected
REVOKE UPDATE (points, correct_answers, questions_answered, quizzes_completed)
ON public.profiles FROM authenticated;