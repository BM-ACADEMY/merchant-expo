import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FilterHeader = ({
  searchLocation,
  onSearchLocationChange,
  nearMe,
  onNearMeToggle,
  selectedCity,
  onCityChange,
  cities = [],
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
      {/* 🔍 Search by location */}
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-500 " />
        <Input
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => onSearchLocationChange(e.target.value)}
        />
      </div>

      {/* 📍 Near Me Checkbox using ShadCN UI */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="near-me"
          checked={nearMe}
          onCheckedChange={(checked) => {
            if (typeof checked === "boolean") {
              onNearMeToggle(checked);
            }
          }}
          className="h-4 w-4 border-gray-300 rounded bg-white data-[state=checked]:bg-black data-[state=checked]:text-white"
        >
          <Check className="h-4 w-4" />
        </Checkbox>
        <Label htmlFor="near-me" className="text-sm font-medium">
          Near Me
        </Label>
      </div>
      {/* 🏙️ City Dropdown using ShadCN UI */}
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city, idx) => (
            <SelectItem key={idx} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterHeader;
