// TmdbService.js
import axios from "axios"

const tmdbApiUrl = 'https://api.themoviedb.org/3';
const apiKey = '917b39a24ea5f789a5f9e0e8d94e7d17'; // Reemplaza 'TU_API_KEY' con tu clave de API real de TMDb

const httpTmdb = axios.create({
  baseURL: tmdbApiUrl,
});


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

httpTmdb.interceptors.response.use(
  function (response) {
    return response.data;
  }
);
// Ejemplo de función para listar películas populares
export const listPopularMovies = () => {
  return httpTmdb.get('/movie/popular?language=es-ES&page=1');
};

export const detailsPopularMovies = (id) => {
  return httpTmdb.get(`/movie/${id}?language=es-ES`)
}

export const searchMovies = (query) => {
  return httpTmdb.get(`/search/movie?language=es-ES&query=${encodeURIComponent(query)}&page=1`);
}

export const trailerMovie = (id) => {
  return httpTmdb.get(`/movie/${id}/videos?language=es-ES`)
}

export const CreditsPopularMovies = (id) => {
  return httpTmdb.get(`/movie/${id}/credits`)
}

export const DiscoverMovies = () => {
  return httpTmdb.get('/discover/movie', {
    params: {
      include_adult: true,
      include_video: true,
      language: 'es-ES',
      page: 1,
      sort_by: 'popularity.desc',
    },
  });
};

export default httpTmdb;
