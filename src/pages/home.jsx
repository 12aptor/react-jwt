import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { value, name } = event.currentTarget;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://sannavet-api.onrender.com/auth/signin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      const json = await response.json();
      const status = response.status;

      if (status === 200) {
        localStorage.setItem("access_token", json.access_token);
        localStorage.setItem("refresh_token", json.refresh_token);
        navigate("/protected");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username" onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};
