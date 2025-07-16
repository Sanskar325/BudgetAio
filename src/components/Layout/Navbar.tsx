
import { User, Lightbulb, Menu, Settings, LogOut } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import CalendarPopover from "@/components/Calendar/CalendarPopover";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-background border-b">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {onMenuClick && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full lg:hidden"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-primary w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  src ="/images/onenew.png" 
                </svg>
              </div>
              <h1 className="text-xl font-medium tracking-tight">
                budget<span className="text-primary">AI</span>
              </h1>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Calendar Popover */}
          <CalendarPopover />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <Lightbulb size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("rounded-full bg-green-500 text-white", theme === 'dark' ? "hover:bg-green-600" : "hover:bg-green-400")}
                aria-label="User profile"
              >
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium">sansa</p>
                <p className="text-xs text-muted-foreground">User@gmail.com</p>
              </div>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
