import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
        setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("admin-token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials");
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
       {loading && <Loader />}
      <h2>🔐 Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Username(snehagoyal)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password(12345)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
      <button
        className="btn-primary"
        style={{ backgroundColor: "#6c757d", marginTop: "10px" }}
        onClick={() => navigate("/")}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default LoginPage;
