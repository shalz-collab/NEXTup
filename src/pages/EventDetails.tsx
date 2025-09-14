import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users, Building2, GraduationCap, Clock, Share2, ArrowLeft, Download, ExternalLink } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { events, loading, error } = useEvents();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    experience: "",
    expectations: ""
  });

  const event = events.find(e => e.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Loading event details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-500">Error loading event: {error}</h1>
          <Link to="/events" className="mt-4 inline-block">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = spotsLeft <= 10;

  const handleRegister = () => {
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      toast({
        title: "Registration Successful! 🎉",
        description: "You've been registered for the event. Check your email for confirmation.",
      });
    }, 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to your clipboard.",
      });
    }
  };

  const addToCalendar = () => {
    const startDate = new Date(`${event.date} ${event.time}`);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link to="/events" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
                  {event.category.replace('-', ' ')}
                </Badge>
                {event.organizerType === 'college' ? (
                  <Badge variant="outline">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    College Event
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <Building2 className="h-3 w-3 mr-1" />
                    Company Event
                  </Badge>
                )}
                {isAlmostFull && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                    Only {spotsLeft} spots left!
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                {event.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img 
                src={event.poster} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Event Details */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Event Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-muted-foreground">{formatDate(event.date)}</p>
                        <p className="text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Participants</p>
                        <p className="text-muted-foreground">
                          {event.currentParticipants} / {event.maxParticipants} registered
                        </p>
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Building2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Organized by</p>
                        <p className="text-muted-foreground">{event.organizerName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description} This event offers a unique opportunity to learn from industry experts, 
                    network with like-minded individuals, and gain practical experience in your field of interest.
                  </p>
                  
                  <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Hands-on practical experience with real-world projects</li>
                    <li>Industry best practices and current trends</li>
                    <li>Networking opportunities with professionals and peers</li>
                    <li>Certificate of completion for your portfolio</li>
                  </ul>
                  
                  <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground">Who Should Attend:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Students interested in advancing their skills</li>
                    <li>Professionals looking to upskill</li>
                    <li>Anyone passionate about learning and growth</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <Card className="glass glow-hover">
                <CardHeader>
                  <CardTitle className="text-center">Register Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold gradient-text">FREE</p>
                    <p className="text-sm text-muted-foreground">Limited seats available</p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 btn-glow"
                        disabled={!event.registrationOpen || spotsLeft === 0}
                        onClick={() => {
                          if (event.registrationLink) {
                            window.open(event.registrationLink, '_blank');
                          }
                        }}
                      >
                        {spotsLeft === 0 ? 'Event Full' : event.registrationLink ? 'Register on Unstop' : 'Register Now'}
                      </Button>
                    </DialogTrigger>
                    {!event.registrationLink && (
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Register for {event.title}</DialogTitle>
                          <DialogDescription>
                            Fill in your details to register for this event
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="college">College/University</Label>
                              <Input
                                id="college"
                                value={formData.college}
                                onChange={(e) => setFormData({...formData, college: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="experience">Why are you interested in this event?</Label>
                            <Textarea
                              id="experience"
                              placeholder="Tell us about your background and what you hope to learn..."
                              value={formData.experience}
                              onChange={(e) => setFormData({...formData, experience: e.target.value})}
                            />
                          </div>
                          <Button 
                            onClick={handleRegister} 
                            disabled={isRegistering}
                            className="w-full bg-gradient-to-r from-primary to-secondary"
                          >
                            {isRegistering ? 'Registering...' : 'Complete Registration'}
                          </Button>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={addToCalendar} className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Event Info
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Organizer Profile
                  </Button>
                  <Link to="/events" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Browse More Events
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Event Stats */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Event Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Registration Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Open
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Spots Remaining</span>
                    <span className="font-medium">{spotsLeft}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Event Category</span>
                    <span className="font-medium capitalize">{event.category.replace('-', ' ')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;