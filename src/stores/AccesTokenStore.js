const JWT_TOKEN_KEY = "accessToken";

let _accessToken = localStorage.getItem(JWT_TOKEN_KEY) || ""; // cojo el token del localStorage y envio siempre un string, o bien el valor de access_token o bien ""
export const setAccessToken = (token) => {
  console.log("El token de acceso es:", _accessToken);
  if (token) {
    localStorage.setItem(JWT_TOKEN_KEY, token);
    _accessToken = token;
  } else {
    console.error("No token provided");
  }
};

export const getAccessToken = () => {
  return _accessToken; // nos devuelve el token del localStorage con la clave accessToken
};

export const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY);
  /* _accessToken = "";  */ // Asegúrate de limpiar la variable interna
  window.location.assign("/login");  // Redirige a la página de inicio de sesión
};

