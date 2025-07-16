
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const SearchForm = ({ searchTerm, setSearchTerm, onSearch }: SearchFormProps) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm || '');
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="flex-1">
        <Label htmlFor="search" className="sr-only">Search transactions</Label>
        <Input
          id="search"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm ? setSearchTerm(e.target.value) : null}
          className="w-full"
        />
      </div>
      <Button type="submit" variant="outline">Search</Button>
    </form>
  );
};

export default SearchForm;