import createHttp from "./BaseServices";

const localApiUrl = 'http://localhost:3000';
const http = createHttp(localApiUrl, true);

export const getCurrentUserService = () => {
  return http.get("/users/me");
};