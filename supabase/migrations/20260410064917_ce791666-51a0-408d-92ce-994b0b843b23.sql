
CREATE OR REPLACE FUNCTION public.restrict_profile_columns()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Allow updates from the update_user_stats function (SECURITY DEFINER context)
  -- by checking a session variable set by that function
  IF current_setting('app.bypass_profile_trigger', true) = 'true' THEN
    RETURN NEW;
  END IF;

  IF NEW.points IS DISTINCT FROM OLD.points
     OR NEW.correct_answers IS DISTINCT FROM OLD.correct_answers
     OR NEW.questions_answered IS DISTINCT FROM OLD.questions_answered
     OR NEW.quizzes_completed IS DISTINCT FROM OLD.quizzes_completed THEN
    RAISE EXCEPTION 'cannot directly modify stats columns';
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_stats(p_user_id uuid, p_points_to_add integer, p_questions_to_add integer, p_correct_to_add integer, p_quizzes_to_add integer DEFAULT 0)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  recent_calls integer;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

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

  SELECT count(*) INTO recent_calls
  FROM public.stat_update_log
  WHERE user_id = p_user_id
    AND created_at > now() - interval '10 seconds';

  IF recent_calls >= 5 THEN
    RAISE EXCEPTION 'rate limit exceeded';
  END IF;

  INSERT INTO public.stat_update_log (user_id) VALUES (p_user_id);

  DELETE FROM public.stat_update_log
  WHERE created_at < now() - interval '1 minute';

  -- Set bypass flag so the trigger allows this update
  PERFORM set_config('app.bypass_profile_trigger', 'true', true);

  UPDATE profiles
  SET
    points = points + p_points_to_add,
    questions_answered = questions_answered + p_questions_to_add,
    correct_answers = correct_answers + p_correct_to_add,
    quizzes_completed = quizzes_completed + p_quizzes_to_add,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$function$;
