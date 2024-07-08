import axios from './axiosConfig';

export const getMortalityTable = (country, year) => {
  return axios.get(`mortality/country/${country}/year/${year}`);
};

export const getCountries = () => {
  return axios.get(`/countries`);
};
