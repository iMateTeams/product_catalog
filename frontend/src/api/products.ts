import axios from 'axios';
import { SortBy } from '../types/SortBy';


const baseUrl = 'https://i-mate-teams-product-catalog.herokuapp.com/phones';

// const baseUrl = 'http://localhost:4002/phones';
const updateUrl = `${baseUrl}/update`;
const newestUrl = `${baseUrl}/new`;
const discountUrl = `${baseUrl}/discount`;

export const getPart = async (numberOfItems: number, currentPage: number, sortBy: SortBy | string) => {
  const response = await axios.get(`${baseUrl}?_limit=${numberOfItems}&_page=${currentPage}&_sort=${sortBy}`);
  console.log(response.data);
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const update = async (id: number, data: any) => {
  const response = await axios.put(`${updateUrl}/${id}`, data);
  return response;
};

export const getNewest = async () => {
  const response = await axios.get(newestUrl);
  return response;
};

export const getBestPrice = async () => {
  const response = await axios.get(discountUrl);
  return response;
};

