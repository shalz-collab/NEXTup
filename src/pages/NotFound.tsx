import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like this event got cancelled! The page you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-primary-foreground rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Home
          </a>
          <p className="text-sm text-muted-foreground">
            or <a href="/events" className="text-primary hover:underline">browse events</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
