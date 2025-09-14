import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Calendar, Users, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2 mb-8 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to NextUp</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Event Hub
            <span className="block gradient-text">Awaits</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover workshops, hackathons, and camps from top colleges and companies. 
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

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Active Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">25K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Organizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">18K+</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
            Get Started
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of students building their future through NextUp events
          </p>
          <Link to="/events">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 btn-glow px-8 py-6 text-lg"
            >
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
