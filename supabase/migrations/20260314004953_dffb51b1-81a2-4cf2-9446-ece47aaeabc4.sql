
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS questions_answered integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS correct_answers integer NOT NULL DEFAULT 0;
