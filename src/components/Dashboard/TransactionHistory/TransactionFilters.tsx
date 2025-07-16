
import { useState } from 'react';
import { FilterOptions } from './types';
import SearchForm from './FilterComponents/SearchForm';
import TypeFilters from './FilterComponents/TypeFilters';
import CategoryFilters from './FilterComponents/CategoryFilters';
import ClearFiltersButton from './FilterComponents/ClearFiltersButton';

interface TransactionFiltersProps {
  onSearch?: (value: string) => void;
  onFilterByType?: (type: string) => void;
  onFilterByCategory?: (category: string) => void;
  categories: string[];
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  filterOptions?: FilterOptions;
  setFilterOptions?: (options: FilterOptions) => void;
  isFilterOpen?: boolean;
  setIsFilterOpen?: (isOpen: boolean) => void;
  activeFilters?: number;
  handleClearFilters?: () => void;
}

const TransactionFilters = ({
  onSearch,
  onFilterByType,
  onFilterByCategory,
  categories,
  searchTerm = '',
  setSearchTerm,
  filterOptions,
  setFilterOptions,
  isFilterOpen = false,
  setIsFilterOpen,
  activeFilters = 0,
  handleClearFilters
}: TransactionFiltersProps) => {
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  return (
    <div className="space-y-4">
      <SearchForm 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={onSearch}
      />

      <div className="space-y-2">
        <TypeFilters 
          activeTypeFilter={activeTypeFilter}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onFilterByType={onFilterByType}
        />

        <CategoryFilters 
          activeCategoryFilter={activeCategoryFilter}
          categories={categories}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onFilterByCategory={onFilterByCategory}
        />
        
        {activeFilters != null && handleClearFilters && (
          <ClearFiltersButton 
            activeFilters={activeFilters}
            handleClearFilters={handleClearFilters}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;
