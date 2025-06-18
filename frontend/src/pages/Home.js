import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to the Feedback Tool</h2>
      <button className="btn-primary" onClick={() => navigate("/feedback")}>Submit Feedback</button>
      <button className="btn-primary" style={{ marginTop: 10 }} onClick={() => navigate("/login")}>Admin Login</button>
    </div>
  );
};
export default Home;