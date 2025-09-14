import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Building2, GraduationCap } from "lucide-react";
import { Event } from "@/types";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const categoryColors = {
    workshop: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30",
    hackathon: "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30",
    "medical-camp": "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border-red-500/30",
    seminar: "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/30",
    technical: "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-400 border-cyan-500/30",
    "non-technical": "bg-gradient-to-r from-pink-500/20 to-pink-600/20 text-pink-400 border-pink-500/30",
    "paper-presentation": "bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-400 border-indigo-500/30"
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = spotsLeft <= 10;

  return (
    <Card className="glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group border border-border/40 hover:border-primary/50 overflow-hidden">
      {/* Event Poster */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.poster} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <Badge className={categoryColors[event.category]}>
            {event.category.replace('-', ' ')}
          </Badge>
          {event.organizerType === 'college' ? (
            <Badge variant="outline" className="bg-background/80">
              <GraduationCap className="h-3 w-3 mr-1" />
              College
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-background/80">
              <Building2 className="h-3 w-3 mr-1" />
              Company
            </Badge>
          )}
        </div>
        {isAlmostFull && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
              Only {spotsLeft} spots left!
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{formatDate(event.date)} at {event.time}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 text-primary" />
          <span>{event.currentParticipants} / {event.maxParticipants} registered</span>
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Organized by:</span> {event.organizerName}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
          />
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex space-x-2 w-full">
          <Link to={`/events/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full hover:bg-muted/50 transition-all duration-300">
              View Details
            </Button>
          </Link>
          <Button 
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 btn-glow"
            disabled={!event.registrationOpen || spotsLeft === 0}
            onClick={() => {
              if (event.registrationLink) {
                window.open(event.registrationLink, '_blank');
              }
            }}
          >
            {spotsLeft === 0 ? 'Full' : 'Register'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;