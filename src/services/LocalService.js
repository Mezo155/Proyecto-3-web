import createHttp from "./BaseServices";

// URL base de la API local
const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, false); // Suponiendo que necesitas autenticación

// Servicio para obtener información del usuario actual
export const createUser = (user) => {
  console.log("Creating user:", user);
  return http.post('/users', user);
};

export const loginService = (user) => {
  return http.post("/login", user);
};


// Otros servicios para la API local
// ...
