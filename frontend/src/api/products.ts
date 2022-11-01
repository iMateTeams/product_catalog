import axios from 'axios';

const baseUrl = 'http://localhost:4000/products';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};