import axios from 'axios';
import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const searchCountries = async (name: string): Promise<Country[]> => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data;
};

export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  const response = await axios.get(`${BASE_URL}/region/${region}`);
  return response.data;
};

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};