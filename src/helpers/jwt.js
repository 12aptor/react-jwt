export const getJwtFromLocalStorage = () => {
  return localStorage.getItem("access_token");
};
