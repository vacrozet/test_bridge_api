import axios from 'axios';

const URL_TEST = 'https://dsague.fr';
const API_KEY = '17066624-8fef-4b49-b2b5-d0b8cebcf171';

export const instance = axios.create({
  baseURL: URL_TEST,
  timeout: 1000,
  headers: { 'X-API-KEY': API_KEY },
});

export default async (arg: string): Promise<any> => {
  try {
    const { data } = await instance.get(`${arg}`);
    return data;
  } catch (error) {
    throw error;
  }
};
