import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Download, CheckCircle, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEvents } from "@/hooks/useEvents";

const MyEvents = () => {
  const { toast } = useToast();
  const { events, loading, error } = useEvents();
  
  // Since anyone can create events, show all events as user's events for now
  // In future, this can be filtered by organizer_id when auth is implemented
  const registeredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate >= today;
  });
  
  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate < today;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownloadCertificate = (eventTitle: string) => {
    toast({
      title: "Certificate Downloaded! 🎉",
      description: `Your certificate for "${eventTitle}" has been downloaded.`,
    });
  };

  const EventCard = ({ event, isPast = false }: { event: any, isPast?: boolean }) => (
    <Card className="glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-border/40">
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0 m-4 rounded-lg overflow-hidden">
          <img 
            src={event.poster} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-4 pl-0">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg line-clamp-1 hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  by {event.organizerName}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
                  {event.category.replace('-', ' ')}
                </Badge>
                {isPast && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Attended
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(event.date)} at {event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link to={`/events/${event.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
              
              {isPast ? (
                <Button 
                  size="sm"
                  onClick={() => handleDownloadCertificate(event.title)}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Certificate
                </Button>
              ) : (
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-semibold">Loading your events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-semibold text-red-500">Error loading events: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Events</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your registrations and download certificates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary mb-4">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold gradient-text mb-2">{registeredEvents.length}</h3>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
          
          <Card className="glass text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text mb-2">{pastEvents.length}</h3>
              <p className="text-sm text-muted-foreground">Events Attended</p>
            </CardContent>
          </Card>
          
          <Card className="glass text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text mb-2">{pastEvents.length}</h3>
              <p className="text-sm text-muted-foreground">Certificates Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/20">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Upcoming Events ({registeredEvents.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Past Events ({pastEvents.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {registeredEvents.length > 0 ? (
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-muted/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">No Upcoming Events</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't registered for any upcoming events yet. Explore our events to find something interesting!
                </p>
                <Link to="/events">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground">
                    Browse Events
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastEvents.length > 0 ? (
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-muted/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">No Past Events</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't attended any events yet. Start exploring and building your portfolio!
                </p>
                <Link to="/events">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground">
                    Find Events
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyEvents;