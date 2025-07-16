
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FilterOptions } from '../types';

interface CategoryFiltersProps {
  activeCategoryFilter: string;
  categories: string[];
  filterOptions?: FilterOptions;
  setFilterOptions?: (options: FilterOptions) => void;
  onFilterByCategory?: (category: string) => void;
}

const CategoryFilters = ({ 
  activeCategoryFilter, 
  categories, 
  filterOptions, 
  setFilterOptions, 
  onFilterByCategory 
}: CategoryFiltersProps) => {
  const handleCategoryFilter = (category: string) => {
    if (onFilterByCategory) onFilterByCategory(category);
    
    if (setFilterOptions && filterOptions) {
      setFilterOptions({
        ...filterOptions,
        category: category === 'all' ? '' : category
      });
    }
  };

  return (
    <div>
      <Label className="text-sm font-medium mb-1 block">Filter by category</Label>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCategoryFilter('all')}
          className={cn(
            (activeCategoryFilter === 'all' || 
             (filterOptions && !filterOptions.category)) 
              && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => handleCategoryFilter(category)}
            className={cn(
              (activeCategoryFilter === category || 
               (filterOptions && filterOptions.category === category)) 
                && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;