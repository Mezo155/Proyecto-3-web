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

export const createComment = (commentData) => {
  const { filmId, ...rest } = commentData;
  console.log('Received filmId:', filmId); // Verificar si filmId está definido aquí
  if (!filmId) {
    console.error('filmId is undefined in createComment');
    return Promise.reject('filmId is undefined');
  }

  console.log('filmId in createComment:', filmId);
  return http.post(`/films/${filmId}/comment`, rest); // Pasa el resto de los datos del comentario en el cuerpo de la solicitud
};