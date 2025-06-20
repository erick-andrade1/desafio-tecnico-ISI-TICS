import Axios from 'axios';
import { BASE_API_URL } from '@/config';

const options = {
  baseURL: BASE_API_URL || 'http://localhost:8000/api',
};

const api = Axios.create(options);

export default api;
