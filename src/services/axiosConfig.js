import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // Adicionar cabeçalhos CORS à requisição
    config.headers['Access-Control-Allow-Origin'] = '*'; // Ou ajuste conforme necessário
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = '*';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
