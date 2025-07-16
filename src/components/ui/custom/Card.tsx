
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
  noPadding?: boolean;
  hoverEffect?: boolean;
  glassEffect?: boolean;
  gradientType?: 'primary' | 'income' | 'expense' | 'savings' | 'none';
  onClick?: () => void;
}

const Card = ({ 
  className, 
  children, 
  noPadding = false, 
  hoverEffect = false,
  glassEffect = false,
  gradientType = 'none',
  onClick
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-smooth transition-all duration-200 overflow-hidden",
        hoverEffect && "hover:shadow-smooth-lg hover:translate-y-[-2px]",
        glassEffect && "glass-panel",
        gradientType !== 'none' && `gradient-${gradientType}`,
        !noPadding && "p-6",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
