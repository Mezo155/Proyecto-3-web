import createHttp from "./BaseService";

const http = createHttp(true);

export const getCurrentUserService = () => {
  return http.get("/users/me");
};