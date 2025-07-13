import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import Login from './components/login';
import Patients from './components/Patients';
import Reports from './components/Reports';
import Settings from './components/Settings';

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
