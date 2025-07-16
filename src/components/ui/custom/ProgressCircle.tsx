
import { cn } from "@/lib/utils";
import { CSSProperties, useEffect, useState } from "react";

interface ProgressCircleProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  showPercentage?: boolean;
  animationDuration?: number;
}

const ProgressCircle = ({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--secondary))",
  className,
  showPercentage = true,
  animationDuration = 1000,
}: ProgressCircleProps) => {
  const [progress, setProgress] = useState(0);
  const normalizedValue = Math.min(Math.max(0, value), maxValue);
  const percentage = (normalizedValue / maxValue) * 100;
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [percentage]);
  
  // Calculate the circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on progress
  const dashOffset = circumference - (progress / 100) * circumference;
  
  // Styles for animation and appearance
  const circleStyle: CSSProperties = {
    strokeDasharray: circumference,
    strokeDashoffset: dashOffset,
    transition: `stroke-dashoffset ${animationDuration}ms ease-in-out`,
  };
  
  return (
    <div 
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={circleStyle}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-medium">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
