import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
        name: username,
      };
      const res = await fetch("http://localhost:5005/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const finalRes = await res.json();
      if (res.status === 400) {
        setError(finalRes.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
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

export default SignUp;
