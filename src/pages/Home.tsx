import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Calendar, Users, Award, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/hooks/useEvents";

const Home = () => {
  const { events, loading } = useEvents();
  const featuredEvents = events.slice(0, 3);
  
  // Calculate real statistics from database
  const totalRegistrations = events.reduce((sum, event) => sum + event.currentParticipants, 0);
  const uniqueOrganizers = new Set(events.map(event => event.organizerName)).size;
  
  const stats = [
    { label: "Active Events", value: events.length.toString(), icon: Calendar },
    { label: "Registered Students", value: totalRegistrations.toString(), icon: Users },
    { label: "Categories Available", value: new Set(events.map(event => event.category)).size.toString(), icon: Award },
    { label: "Partner Organizations", value: uniqueOrganizers.toString(), icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2 mb-8 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your next opportunity awaits</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block gradient-text">NextUp Event</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join workshops, hackathons, and camps from top colleges and companies. 
            Build skills, network, and get certified.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/events">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 btn-glow px-8 py-6 text-lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Explore Events
              </Button>
            </Link>
            <Link to="/organize">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-8 py-6 text-lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Organize Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="glass text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{value}</h3>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Hot Events
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Featured Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these amazing opportunities to learn, grow, and connect
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="text-lg">Loading events...</div>
              </div>
            ) : featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <div className="text-lg text-muted-foreground">No events available yet</div>
                <Link to="/organize" className="mt-4 inline-block">
                  <Button>Create the first event</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Link to="/events">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of students already building their future through NextUp events
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/events">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 btn-glow px-8 py-6 text-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;