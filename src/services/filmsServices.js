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

export const createComment = (filmId) => {
  console.log(filmId)
  if (!filmId) {
    console.error('externalItemId is undefined at likeFilm');
    return Promise.reject('externalItemId is undefined');
  }

  console.log('externalItemId in likeFilm:', filmId);
  return http.post(`/films/${filmId}/comment`);
};
