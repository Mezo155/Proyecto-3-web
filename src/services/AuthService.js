import createHttp from "./BaseServices";

const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, true);

export const getCurrentUserService = () => {
  return http.get("/users/me");
};

export const updateCurrentUser = (user) => {
  // Crear FormData para la actualización

  return http.put(`/users/me`, user, {
    headers: {
      'Content-Type': 'multipart/form-data'  // Asegúrate de enviar el tipo de contenido adecuado para FormData
    }
  });
};