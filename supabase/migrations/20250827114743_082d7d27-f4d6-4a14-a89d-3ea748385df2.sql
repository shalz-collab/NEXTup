-- Temporarily allow anonymous event creation for testing
-- This should be replaced with proper authentication later

DROP POLICY IF EXISTS "Users can create events" ON public.events;

CREATE POLICY "Anyone can create events temporarily" 
ON public.events 
FOR INSERT 
WITH CHECK (true);