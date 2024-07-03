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

export const createComment = (data) => {
  console.log(data)
  const {filmId, title, comment} = data
  
  return http.post(`/films/${filmId}/comment`, {title, comment});
};

export const getFilmComments = (filmId) => {
  return http.get(`/films/${filmId}/comments`);
};