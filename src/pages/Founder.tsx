import { ArrowLeft, Github, Mail, MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function Founder() {
  return <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/events">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-4xl font-bold">
              S
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Shalini Muthukumar
            </h1>
            <p className="text-xl text-muted-foreground mb-4">Developer of NextUp (Event Discovery Platform)</p>
            <div className="flex items-center justify-center text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Saveetha University, Tamil Nadu</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Badge variant="secondary" className="px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                Event Discovery
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Student Empowerment
              </Badge>
            </div>
          </div>

          {/* Quote Section */}
          <Card className="mb-8 border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                "I founded NextUp because, during my university days, I often didn't even know when events were happening in my own college. Many opportunities slipped by simply because they weren't well-publicized. That's why I created NextUp — a platform where event organizers can easily post their events and students can effortlessly discover them. My vision is to make sure no student misses out on opportunities, whether it's a campus workshop or a national-level summit."
              </blockquote>
              <footer className="text-right mt-4 text-sm text-muted-foreground">
                — Shalini Muthukumar
              </footer>
            </CardContent>
          </Card>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create a world where every student has equal access to opportunities, ensuring that no one misses out on events that could shape their future.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From college fests to national summits — discover what's NextUp. We bridge the gap between event organizers and students through seamless event discovery.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Features */}
          <Card>
            <CardHeader>
              <CardTitle>Why NextUp?</CardTitle>
              <CardDescription>
                Built by students, for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Easy Discovery</h3>
                  <p className="text-sm text-muted-foreground">
                    Find events happening around you with our intuitive platform
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Direct Registration</h3>
                  <p className="text-sm text-muted-foreground">
                    Register for events instantly with custom registration links
                  </p>
                </div>
                
                 <div className="text-center">
                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                     <Mail className="h-8 w-8 text-primary" />
                   </div>
                   <h3 className="font-semibold mb-2">Real-time Updates</h3>
                   <p className="text-sm text-muted-foreground">
                     Get notified about new events as they're posted
                   </p>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground mb-6">
              Have ideas or want to collaborate? Reach out!
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://github.com/shalz-collab" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
              <a href="mailto:shalinimuthukumar1434@gmail.com">
                <Button variant="outline" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border/40 text-center">
            <p className="text-muted-foreground">
              © 2025 NextUp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>;
}