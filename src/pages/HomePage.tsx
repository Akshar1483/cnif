import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterDropdown } from '../components/FilterDropdown';
import { CountryList } from '../components/CountryList';
import { getAllCountries, searchCountries, getCountriesByRegion } from '../services/api';
import { Country } from '../types/country';

export function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let data: Country[];
        
        if (search) {
          data = await searchCountries(search);
        } else if (region !== 'All') {
          data = await getCountriesByRegion(region);
        } else {
          data = await getAllCountries();
        }
        
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchCountries, 300);
    return () => clearTimeout(debounceTimeout);
  }, [search, region]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <FilterDropdown value={region} onChange={setRegion} />
      </div>
      
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">Loading countries...</div>
        </div>
      ) : countries.length > 0 ? (
        <CountryList countries={countries} />
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">No countries found</div>
        </div>
      )}
    </div>
  );
}