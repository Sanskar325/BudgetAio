
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout className="flex items-center justify-center">
      <div className="text-center max-w-md mx-auto py-16 px-4">
        <div className="text-6xl font-bold text-primary mb-4 animate-slide-down">404</div>
        <h1 className="text-2xl font-semibold mb-4 animate-slide-down" style={{ animationDelay: '100ms' }}>
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8 animate-slide-down" style={{ animationDelay: '200ms' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="animate-slide-down" 
          style={{ animationDelay: '300ms' }}
          onClick={() => window.location.href = '/'}
        >
          Return to Dashboard
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
