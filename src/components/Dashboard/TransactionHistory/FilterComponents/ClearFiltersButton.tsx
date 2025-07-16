
import { Button } from "@/components/ui/button";

interface ClearFiltersButtonProps {
  activeFilters: number;
  handleClearFilters: () => void;
}

const ClearFiltersButton = ({ 
  activeFilters, 
  handleClearFilters 
}: ClearFiltersButtonProps) => {
  if (!activeFilters || activeFilters <= 0) {
    return null;
  }

  return (
    <div className="pt-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleClearFilters}
        className="text-muted-foreground hover:text-foreground"
      >
        Clear filters ({activeFilters})
      </Button>
    </div>
  );
};

export default ClearFiltersButton;