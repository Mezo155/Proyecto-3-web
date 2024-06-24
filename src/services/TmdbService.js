// TmdbService.js
import createHttp from './BaseService';

const tmdbApiUrl = 'https://api.themoviedb.org/3';
const apiKey = '917b39a24ea5f789a5f9e0e8d94e7d17'; // Reemplaza 'TU_API_KEY' con tu clave de API real de TMDb

const httpTmdb = createHttp(tmdbApiUrl, false); // No se requiere autenticación con JWT, pero se necesita la clave de API en las consultas

// Interceptor para agregar la clave de API a cada solicitud
httpTmdb.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: apiKey,
    };
    return config;
  },
  (err) => Promise.reject(err)
);

// Ejemplo de función para listar películas populares
export const listPopularMovies = () => {
  return httpTmdb.get('/movie/popular');
};

// Ejemplo de función para obtener detalles de una película por ID
export const getMovieDetails = (id) => {
  return httpTmdb.get(`/movie/${id}`);
};

export default httpTmdb;
