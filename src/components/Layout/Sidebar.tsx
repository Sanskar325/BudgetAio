
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PieChart, BarChart4, Target, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Budgets",
    path: "/budgets",
    icon: <BarChart4 size={20} />,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: <PieChart size={20} />,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: <Target size={20} />,
  },
  {
    name: "Banking",
    path: "/banking",
    icon: <CreditCard size={20} />,
  },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-background border-r border-border h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0">
      <div className="p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary"
                )
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
        
        <div className="pt-6 mt-6 border-t border-border">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary"
              )
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
