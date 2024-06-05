import axios from 'axios';

const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL;
const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

export const wooInstance = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});
