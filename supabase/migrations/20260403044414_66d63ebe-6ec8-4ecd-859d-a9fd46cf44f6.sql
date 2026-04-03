
-- Add user_id to search_logs (nullable for backward compat)
ALTER TABLE public.search_logs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop old permissive insert policy
DROP POLICY IF EXISTS "Anyone can insert search logs" ON public.search_logs;

-- Authenticated users can insert their own search logs
CREATE POLICY "Authenticated users can insert search logs"
ON public.search_logs
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can only view their own search logs
DROP POLICY IF EXISTS "Search logs are viewable by everyone" ON public.search_logs;
CREATE POLICY "Users can view own search logs"
ON public.search_logs
FOR SELECT
TO authenticated
USING (user_id = auth.uid());
