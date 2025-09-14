import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchEvents(); // Refetch events on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
        return;
      }

      if (data) {
        // Transform Supabase data to match our Event interface
        const transformedEvents: Event[] = data.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          poster: event.poster || `https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center`,
          organizerId: event.organizer_id,
          organizerName: event.organizer_name,
          organizerType: event.organizer_type as 'college' | 'company',
          category: event.category as Event['category'],
          maxParticipants: event.max_participants,
          currentParticipants: event.current_participants,
          registrationOpen: event.registration_open,
          registrationLink: event.registration_link,
          certificate: event.certificate,
          createdAt: event.created_at
        }));

        setEvents(transformedEvents);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<Event>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          poster: eventData.poster,
          organizer_id: eventData.organizerId,
          organizer_name: eventData.organizerName,
          organizer_type: eventData.organizerType,
          category: eventData.category,
          max_participants: eventData.maxParticipants,
          current_participants: 0,
          registration_open: true,
          registration_link: eventData.registrationLink,
          certificate: eventData.certificate
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error creating event:', err);
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    refetch: fetchEvents
  };
};