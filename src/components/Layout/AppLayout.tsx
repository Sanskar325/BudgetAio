
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; 
import { ReactNode, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
  showSidebar?: boolean;
}

const AppLayout = ({ children, className, showSidebar = true }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Adjust sidebar when switching between mobile and desktop
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 pt-16 w-full">
        {showSidebar && (
          <div 
            className={cn(
              "fixed inset-0 z-20 transition-all duration-300 lg:relative lg:z-auto",
              sidebarOpen 
                ? "visible bg-black/50 backdrop-blur-sm" 
                : "invisible lg:visible bg-transparent"
            )}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div 
              className={cn(
                "h-full w-64 transition-all duration-300 bg-background border-r border-border overflow-y-auto",
                sidebarOpen 
                  ? "translate-x-0" 
                  : "-translate-x-full lg:translate-x-0"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}
        <main className={cn(
          "flex-1 w-full transition-all duration-300 overflow-x-hidden flex flex-col items-center",
          showSidebar && !isMobile ? "lg:pl-64" : "",
          className
        )}>
          <div className="universal-container py-2 md:py-3 lg:py-4 animate-fade-in w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
