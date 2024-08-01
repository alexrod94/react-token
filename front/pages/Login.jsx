import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { storeToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const res = await fetch("http://localhost:5005/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const finalRes = await res.json();
    if (res.status === 400 || res.status === 401) {
      setError(finalRes.message);
    } else {
      storeToken(finalRes.authToken, email);
      navigate("/test");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleEmail}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePassword}
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
