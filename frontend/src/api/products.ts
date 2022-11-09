import axios from 'axios';
import { SortBy } from '../types/SortBy';

// const baseUrl = 'https://i-mate-teams-product-catalog.herokuapp.com/products';
// const phonesUrl = 'https://i-mate-teams-product-catalog.herokuapp.com/phones';

const baseUrl = 'http://localhost:4002/products';
// const phonesUrl = 'http://localhost:4002/phones';

export const getPart = async (numberOfItems: number, currentPage: number, sortBy: SortBy | string) => {
  const response = await axios.get(`${baseUrl}?_limit=${numberOfItems}&_page=${currentPage}&_sort=${sortBy}`);
  console.log(response.data);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const update = async (id: number, data: any) => {
  await axios.patch(`${baseUrl}/${id}`, data);
  console.log(data);
};

