import createHttp from "./BaseService";

const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, true);

export const likeFilm= (id) => {
  return http.post(`/films/${id}`);
};

/*
export const listFilms= () => {
  return http.get("/films");
};

export const getFilms = (id) => {
  return http.get(`/films/${id}`);
};*/

/*export const addApartment = (apt) => {
  return http.post("/apartments", apt);
};*/

/*export const editApartment = (id, apt) => {
  return http.put(`/apartments/${id}`, apt);
};*/

/*export const deleteApartment = (id) => {
  return http.delete(`/apartments/${id}`);
};*/
