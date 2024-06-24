import createHttp from "./BaseService";

// URL base de la API local
const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, true); // Suponiendo que necesitas autenticación

// Servicio para obtener información del usuario actual
export const getCurrentUserService = () => {
  return http.get('/users/me');
};

// Otros servicios para la API local
// ...
