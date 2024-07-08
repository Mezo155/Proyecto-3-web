import createHttp from "./BaseServices";

const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, true);

export const getCurrentUserService = () => {
  return http.get("/users/me");
};

export const updateUser = (id, user) => {
  const formData = new FormData();
  for (const key in user) {
    formData.append(key, user[key]);
  }

  return http.put(`/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'  // Asegúrate de enviar el tipo de contenido adecuado para FormData
    }
  });
};