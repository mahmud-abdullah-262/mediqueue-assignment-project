export default function SearchAndFilter() {
  import {Label, SearchField} from "@heroui/react";
  return (
    <div className="p-6">
      <SearchField name="search">
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>

    
    </div>
  );
}