import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import AdminCharts from "../components/AdminCharts";
import { useNavigate } from "react-router-dom";

const socket = io(process.env.REACT_APP_API_URL);

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem("admin-token");

  const fetchData = async () => {
    const fbRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const stRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFeedbacks(fbRes.data);
    setStats(stRes.data);
  };

  useEffect(() => {
    fetchData();
    socket.on("feedback_update", fetchData);
    return () => socket.off("feedback_update");
  }, []);

  const filtered = feedbacks
    .filter((fb) => fb.product.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "product") return a.product.localeCompare(b.product);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container">
      <h2>📊 Admin Dashboard</h2>
      <button className="btn-primary" style={{ marginBottom: 10 }} onClick={() => {
        localStorage.removeItem("admin-token");
        navigate("/login");
      }}>Logout</button>
      <input className="input" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by product name" />
      <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="rating">Sort by Rating</option>
        <option value="product">Sort by Product</option>
      </select>
      <ul>
        {paginated.map((fb) => (
          <li key={fb._id}><strong>{fb.product}</strong>: {fb.feedback} ⭐{fb.rating}</li>
        ))}
      </ul>
      <div className="pagination">
        <button className="btn-primary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button className="btn-primary" disabled={page * pageSize >= filtered.length} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
      <AdminCharts stats={stats} />
    </div>
  );
};
export default AdminDashboard;