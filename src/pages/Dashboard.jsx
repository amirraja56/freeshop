import '../styles/Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const salesData = {
  labels: Array.from({ length: 20 }, (_, i) => `${(i + 1) * 3}k`),
  datasets: [
    {
      label: 'Sales',
      data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 20),
      fill: true,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.3,
    },
  ],
};

const revenueData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue',
      data: [30, 50, 60, 45, 70, 90],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      tension: 0.4,
    },
  ],
};

function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>

      <div className="cards">
        {[
          { label: 'Active Users', value: '40,689', icon: '👤', trend: '+8.5%', note: 'Up from yesterday', color: 'green' },
          { label: 'Total Buyers', value: '10,293', icon: '📦', trend: '+1.3%', note: 'Up from past week', color: 'blue' },
          { label: 'Total Sellers', value: '2,040', icon: '⏱', trend: '+1.8%', note: 'Up from yesterday', color: 'green' },
          { label: 'Total Sales', value: '$89,000', icon: '💰', trend: '-4.3%', note: 'Down from yesterday', color: 'red' },
        ].map((card, i) => (
          <div className="card" key={i}>
            <div className="card-top">
              <div>
                <div className="card-value">{card.value}</div>
                <div className="card-label">{card.label}</div>
              </div>
              <div className="card-icon">{card.icon}</div>
            </div>
            <div className={`trend ${card.color}`}>
              <strong>{card.trend}</strong> {card.note}
            </div>
          </div>
        ))}
      </div>

      <div className="charts">
        <div className="chart-card">
          <div className="chart-header">Sales Details</div>
          <Line data={salesData} height={120} />
        </div>
        <div className="chart-card">
          <div className="chart-header">Revenue</div>
          <Line data={revenueData} height={120} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
