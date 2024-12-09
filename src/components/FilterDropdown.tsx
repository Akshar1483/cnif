import React from 'react';

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}