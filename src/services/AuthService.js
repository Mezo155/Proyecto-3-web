import createHttp from "./BaseServices";

const http = createHttp(true);

export const getCurrentUserService = () => {
  return http.get("/users/me");
};