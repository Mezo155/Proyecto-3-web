import createHttp from "./BaseServices";

const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, true);

export const likeFilm = (externalItemId) => {
  if (!externalItemId) {
    console.error('externalItemId is undefined at likeFilm');
    return Promise.reject('externalItemId is undefined');
  }

  console.log('externalItemId in likeFilm:', externalItemId);
  return http.post(`/films/${externalItemId}/like`);
};

export const getMyLikes = () => {
  return http.get("/likes/me")
}

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
