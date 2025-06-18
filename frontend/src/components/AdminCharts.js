import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminCharts = ({ stats }) => {
  const products = stats?.popularity?.map(p => p.product) || [];
  const avgRatings = stats?.popularity?.map(p => p.avgRating) || [];
  const totalCounts = stats?.popularity?.map(p => p.total) || [];

  return (
    <div>
      <h3>Average Ratings</h3>
      <Bar
        data={{
          labels: products,
          datasets: [{ label: "Avg Rating", data: avgRatings, backgroundColor: "#36A2EB" }],
        }}
      />
      <h3>Feedback Count</h3>
      <Pie
        data={{
          labels: products,
          datasets: [{
            label: "Total Feedback",
            data: totalCounts,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          }],
        }}
      />
    </div>
  );
};
export default AdminCharts;