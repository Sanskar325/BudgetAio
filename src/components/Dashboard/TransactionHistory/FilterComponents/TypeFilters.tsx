
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FilterOptions } from '../types';

interface TypeFiltersProps {
  activeTypeFilter: string;
  filterOptions?: FilterOptions;
  setFilterOptions?: (options: FilterOptions) => void;
  onFilterByType?: (type: string) => void;
}

const TypeFilters = ({ 
  activeTypeFilter, 
  filterOptions, 
  setFilterOptions, 
  onFilterByType 
}: TypeFiltersProps) => {
  const handleTypeFilter = (type: string) => {
    if (onFilterByType) onFilterByType(type);
    
    if (setFilterOptions && filterOptions) {
      setFilterOptions({
        ...filterOptions,
        type: type === 'all' ? '' : type
      });
    }
  };

  return (
    <div>
      <Label className="text-sm font-medium mb-1 block">Filter by type</Label>
      <div className="flex flex-wrap gap-2">
        {['all', 'income', 'expense'].map((type) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => handleTypeFilter(type)}
            className={cn(
              (activeTypeFilter === type || 
               (filterOptions && filterOptions.type === type && type !== 'all') || 
               (filterOptions && !filterOptions.type && type === 'all')) 
                && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilters;