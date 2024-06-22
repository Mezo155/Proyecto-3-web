import createHttp from "./BaseService";

const http = createHttp();

export const createUser = (user) => {
  return http.post("/users", user);
};

export const loginService = (user) => {
  return http.post("/login", user);
};
