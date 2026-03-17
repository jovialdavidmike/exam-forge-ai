
CREATE OR REPLACE FUNCTION public.restrict_profile_columns()
RETURNS TRIGGER LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
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
