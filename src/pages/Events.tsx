import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, MapPin } from "lucide-react";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types";

const Events = () => {
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrganizer, setSelectedOrganizer] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "workshop", label: "Workshops" },
    { value: "hackathon", label: "Hackathons" },
    { value: "medical-camp", label: "Medical Camps" },
    { value: "seminar", label: "Seminars" },
    { value: "technical", label: "Technical Events" },
    { value: "non-technical", label: "Non-Technical Events" },
    { value: "paper-presentation", label: "Paper Presentations" }
  ];

  const organizerTypes = [
    { value: "all", label: "All Organizers" },
    { value: "college", label: "Colleges" },
    { value: "company", label: "Companies" }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesOrganizer = selectedOrganizer === "all" || event.organizerType === selectedOrganizer;
    
    return matchesSearch && matchesCategory && matchesOrganizer;
  });

  const categoryStats = categories.slice(1).map(cat => ({
    ...cat,
    count: events.filter(event => event.category === cat.value).length
  }));

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-semibold">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-semibold text-red-500">Error loading events: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Upcoming Events</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover amazing opportunities to learn, grow, and connect
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categoryStats.map(({ value, label, count }) => (
              <Badge 
                key={value}
                variant="outline" 
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors duration-300"
                onClick={() => setSelectedCategory(value)}
              >
                {label}: {count}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/40 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, organizers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/40 focus:border-primary/50 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 bg-background/50 border-border/40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Organizer Filter */}
            <Select value={selectedOrganizer} onValueChange={setSelectedOrganizer}>
              <SelectTrigger className="w-full lg:w-48 bg-background/50 border-border/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {organizerTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== "all" || selectedOrganizer !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedOrganizer("all");
                }}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold">
              {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
            </h2>
            {(searchTerm || selectedCategory !== "all" || selectedOrganizer !== "all") && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Filtered Results
              </Badge>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Sorted by date</span>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-muted/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No Events Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any events matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedOrganizer("all");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;