import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { searchCountries } from '../services/api';
import { Country } from '../types/country';

export function CountryDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await searchCountries(name || '');
        setCountry(data[0]);
      } catch (error) {
        console.error('Error fetching country:', error);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="text-lg text-gray-600">Loading country information...</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="text-lg text-gray-600">Country not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 rounded-lg bg-white px-6 py-2 shadow-md transition-colors hover:bg-gray-50"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full rounded-lg shadow-lg"
        />
        

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{country.name.common}</h1>
          
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <p><span className="font-semibold">Official Name:</span> {country.name.official}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.join(', ') || 'N/A'}</p>
            </div>
            
            <div className="space-y-2">
              <p><span className="font-semibold">Languages:</span> {Object.values(country.languages || {}).join(', ')}</p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {Object.values(country.currencies || {})
                  .map((currency) => `${currency.name} (${currency.symbol})`)
                  .join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}