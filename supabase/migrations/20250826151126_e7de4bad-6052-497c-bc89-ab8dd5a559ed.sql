-- Create events table with real-time capabilities
CREATE TABLE public.events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    poster TEXT,
    organizer_id UUID NOT NULL,
    organizer_name TEXT NOT NULL,
    organizer_type TEXT CHECK (organizer_type IN ('college', 'company')) NOT NULL,
    category TEXT CHECK (category IN ('workshop', 'hackathon', 'medical-camp', 'seminar', 'technical', 'non-technical', 'paper-presentation')) NOT NULL,
    max_participants INTEGER NOT NULL,
    current_participants INTEGER NOT NULL DEFAULT 0,
    registration_open BOOLEAN NOT NULL DEFAULT true,
    registration_link TEXT,
    certificate TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events" 
ON public.events 
FOR UPDATE 
USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete their own events" 
ON public.events 
FOR DELETE 
USING (auth.uid() = organizer_id);

-- Enable realtime
ALTER TABLE public.events REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create registrations table
CREATE TABLE public.registrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_college TEXT NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    attended BOOLEAN NOT NULL DEFAULT false,
    certificate_downloaded BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security for registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for registrations
CREATE POLICY "Users can view their own registrations" 
ON public.registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations" 
ON public.registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Event organizers can view registrations for their events" 
ON public.registrations 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.events 
        WHERE events.id = registrations.event_id 
        AND events.organizer_id = auth.uid()
    )
);