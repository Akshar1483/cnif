import React from 'react';
import { Link } from 'react-router-dom';
import { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link to={`/country/${country.name.common}`}>
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-800">{country.name.common}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}