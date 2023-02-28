import axios from 'axios';

const app = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080'
});

app.interceptors.request.use((config) => {
  config.headers['X-Version'] = '0.1';
  return config;
});

app.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const { config, response } = error;
    if (response && response.status === 401) {
      return app.get('/auth/refresh')
        .then(() => {
          config.baseURL = undefined;
          return app({
            ...config,
            headers: { ...config.headers },
            sent: true,
          });
        });
    }
    return Promise.reject(error);
  },
);

export default app;
