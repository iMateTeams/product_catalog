import axios from 'axios';

// const baseUrl = 'https://i-mate-teams-product-catalog.herokuapp.com/products';
// const phonesUrl = 'https://i-mate-teams-product-catalog.herokuapp.com/phones';

const baseUrl = 'http://localhost:4002/products';
const phonesUrl = 'http://localhost:4002/phones';

export const getPart = async (numberOfItems: number, currentPage: number) => {
  const response = await axios.get(`${baseUrl}?_limit=${numberOfItems}&_page=${currentPage}`);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const update = async (id: number, data: any) => {
  await axios.patch(`${phonesUrl}/${id}`, data);
};
