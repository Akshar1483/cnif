import React from 'react';
import { Country } from '../types/country';
import { CountryCard } from './CountryCard';

interface CountryListProps {
  countries: Country[];
}

export function CountryList({ countries }: CountryListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}