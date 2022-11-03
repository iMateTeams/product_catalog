import axios from 'axios';

const baseUrl = 'http://localhost:4001/products';
const phonesUrl = 'http://localhost:4001/phones';

export const getPart = async (numberOfItems: number, currentPage: number) => {
  const response = await axios.get(`${baseUrl}?_limit=${numberOfItems}&_page=${currentPage}`);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const update = async (id: number, data: any) => {
  const response = await axios.put(`${phonesUrl}/${id}`, data);
  return response.data;
};
