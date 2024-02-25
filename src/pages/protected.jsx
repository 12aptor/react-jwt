import { Navigate } from "react-router-dom";
import { getJwtFromLocalStorage } from "../helpers/jwt";

export const Protected = () => {
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
  };

  if (!getJwtFromLocalStorage()) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Ruta protegida</h1>
      <button type="button" onClick={handleSignOut}>
        Cerrar sesión
      </button>
    </div>
  );
};
