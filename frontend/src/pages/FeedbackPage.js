import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

const FeedbackPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>📝 Submit Feedback</h2>
      <button className="btn-primary" style={{ marginBottom: 10 }} onClick={() => navigate("/")}>⬅ Back to Home</button>
      <FeedbackForm />
    </div>
  );
};
export default FeedbackPage;