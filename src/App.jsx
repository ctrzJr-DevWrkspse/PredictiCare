import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/login';
// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  function AppRoutes() {
    const navigate = useNavigate();
    return (
      <Routes>
        <Route path="/settings" element={<Settings onNavigate={navigate} />} />
        <Route path="/reports" element={<Reports onNavigate={navigate} />} />
        <Route path="/patients" element={<Patients onNavigate={navigate} />} />
        <Route path="/analytics" element={<Analytics onNavigate={navigate} />} />
        <Route path="/dashboard" element={<Dashboard onNavigate={navigate} />} />
        <Route path="/" element={<Login onNavigate={navigate} />} />
      </Routes>
    );
  }

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
