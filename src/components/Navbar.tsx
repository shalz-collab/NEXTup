import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Home, User, Plus, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { mockUser } from "@/data/mockData";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/my-events", label: "My Events", icon: User },
    { path: "/organize", label: "Organize", icon: Plus },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-secondary glow-hover">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">NextUp</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={location.pathname === path ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    location.pathname === path 
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg glow-primary" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <Link to="/founder" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground">{mockUser.college}</p>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-300">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border/20">
        <div className="flex justify-around py-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full flex flex-col items-center space-y-1 h-auto py-2 ${
                  location.pathname === path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;