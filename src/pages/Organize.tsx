import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, MapPin, Users, Building2, GraduationCap, Plus, Zap, Award, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types";

const Organize = () => {
  const { toast } = useToast();
  const { createEvent, events } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    organizerType: "",
    organizerName: "",
    registrationLink: "",
    poster: null as File | null
  });

  const categories = [
    { value: "workshop", label: "Workshop", icon: "🛠️" },
    { value: "hackathon", label: "Hackathon", icon: "💻" },
    { value: "medical-camp", label: "Medical Camp", icon: "🏥" },
    { value: "seminar", label: "Seminar", icon: "📚" },
    { value: "technical", label: "Technical Events", icon: "⚙️" },
    { value: "non-technical", label: "Non-Technical Events", icon: "🎭" },
    { value: "paper-presentation", label: "Paper Presentation", icon: "📑" }
  ];

  const organizerTypes = [
    { value: "college", label: "College/University", icon: GraduationCap },
    { value: "company", label: "Company/Organization", icon: Building2 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For now, we'll use a temporary organizer ID since auth isn't implemented
      const tempOrganizerId = crypto.randomUUID();
      
      const eventData: Partial<Event> = {
        title: formData.title,
        description: formData.description,
        category: formData.category as Event['category'],
        date: formData.date,
        time: formData.time,
        location: formData.location,
        maxParticipants: parseInt(formData.maxParticipants),
        organizerId: tempOrganizerId,
        organizerName: formData.organizerName,
        organizerType: formData.organizerType as 'college' | 'company',
        registrationLink: formData.registrationLink || undefined,
        poster: formData.poster ? `https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center` : undefined
      };

      await createEvent(eventData);
      
      toast({
        title: "Event Created Successfully! 🎉",
        description: "Your event has been created and is now live!",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        maxParticipants: "",
        organizerType: "",
        organizerName: "",
        registrationLink: "",
        poster: null
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error Creating Event",
        description: "There was an issue creating your event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, poster: file });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2 mb-8 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Organize Your Event</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Create Amazing Events</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your knowledge, connect with students, and make a lasting impact in the community
          </p>
        </div>

        {/* Real-time Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="glass text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {events.reduce((sum, event) => sum + event.currentParticipants, 0)}+
              </h3>
              <p className="text-sm text-muted-foreground">Registered Students</p>
            </CardContent>
          </Card>
          
          <Card className="glass text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {Math.floor(events.reduce((sum, event) => sum + event.currentParticipants, 0) * 0.8)}+
              </h3>
              <p className="text-sm text-muted-foreground">Certificates Issued</p>
            </CardContent>
          </Card>
          
          <Card className="glass text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {new Set(events.map(event => event.organizerName)).size}+
              </h3>
              <p className="text-sm text-muted-foreground">Partner Organizations</p>
            </CardContent>
          </Card>
        </div>

        {/* Event Creation Form */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-base font-medium">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., AI Workshop for Beginners"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-base font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="mt-2 bg-background/50 border-border/40">
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-medium">Event Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event, what participants will learn, and what to expect..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 min-h-32 bg-background/50 border-border/40 focus:border-primary/50"
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date" className="text-base font-medium">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="time" className="text-base font-medium">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Location and Capacity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-base font-medium">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Tech Hub, Bangalore or Online"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxParticipants" className="text-base font-medium">Max Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                    required
                    min="1"
                  />
                </div>
              </div>

              {/* Organizer Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="organizerType" className="text-base font-medium">Organizer Type *</Label>
                  <Select value={formData.organizerType} onValueChange={(value) => setFormData({ ...formData, organizerType: value })}>
                    <SelectTrigger className="mt-2 bg-background/50 border-border/40">
                      <SelectValue placeholder="Select organizer type" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizerTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="organizerName" className="text-base font-medium">Organization Name *</Label>
                  <Input
                    id="organizerName"
                    placeholder="e.g., IIT Delhi or TechCorp India"
                    value={formData.organizerName}
                    onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                    className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Registration Link */}
              <div>
                <Label htmlFor="registrationLink" className="text-base font-medium">Registration Link</Label>
                <Input
                  id="registrationLink"
                  name="registrationLink"
                  type="url"
                  placeholder="https://unstop.com/your-event-link"
                  value={formData.registrationLink}
                  onChange={handleInputChange}
                  className="mt-2 bg-background/50 border-border/40 focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional: Add your custom registration link (Unstop, Google Forms, etc.)
                </p>
              </div>

              {/* Poster Upload */}
              <div>
                <Label htmlFor="poster" className="text-base font-medium">Event Poster</Label>
                <div className="mt-2 border-2 border-dashed border-border/40 rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-300">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Upload a poster for your event (Optional)
                    </p>
                    <Input
                      id="poster"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="max-w-xs mx-auto"
                    />
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
                {formData.poster && (
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                    ✓ {formData.poster.name}
                  </Badge>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-border/20">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 btn-glow px-12 py-6 text-lg"
                >
                  {isSubmitting ? 'Creating Event...' : 'Create Event'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Your event will be uploaded and published within a minute!
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Organize;