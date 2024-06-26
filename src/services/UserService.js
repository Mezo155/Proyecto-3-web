import createHttp from "./BaseServices";

const http = createHttp();

export const createUser = (user) => { //es el register
  return http.post("/users", user);
};

export const loginService = (user) => {
  return http.post("/login", user);
};
