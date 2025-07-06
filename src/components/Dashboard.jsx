import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from './Sidebar';

// const demoData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [
//     {
//       label: 'Sample Cases',
//       data: [12, 19, 8, 15, 10, 14],
//       backgroundColor: 'rgba(79, 70, 229, 0.7)',
//       borderColor: '#4f46e5', 
//       borderWidth: 1,
//     },
//   ],
// };

// const demoOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: { legend: { display: false } },
//   scales: {
//     y: {
//       beginAtZero: true,
//       title: { display: true, text: 'Number of Cases' },
//     },
//     x: {},
//   },
// };

// const demoPrediction = {
//   disease: 'Dengue Fever',
//   risk: 'High Risk',
//   probability: '87%',
//   recommendation: 'Immediate blood test and monitoring',
// };

const Dashboard = ({ onNavigate }) => {
  const [form, setForm] = useState({
    symptoms: '',
    age: '',
    lifestyle: '',
    diagnosis: '',
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock prediction logic
    setPrediction({
      disease: 'Dengue Fever',
      risk: 'High Risk',
      probability: '87%',
      recommendation: 'Immediate blood test and monitoring',
    });
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-grow-1 w-100 p-4" style={{ background: "#f8f9fa" }}>
        <h1 className="h2 fw-bold mb-4">Dashboard Overview</h1>
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="h5 fw-semibold mb-2">Welcome to PredictiCare!</h2>
          <p className="text-secondary">This is your main dashboard. Use the sidebar to navigate through the system features.</p>
        </div>

        {/* Demo Record Section */}
        <div className="row g-4">
          {/* Demo Graph */}
          {/* <div className="col-12 col-md-6"> 
            <div className="bg-white shadow rounded-3 p-4 h-100 d-flex flex-column"> 
              <h3 className="fs-5 fw-semibold text-dark mb-4">Demo Health Trends</h3> 
              <div className="flex-grow-1"> 
                <Bar data={demoData} options={demoOptions} />
              </div>
            </div>
          </div> */}

          {/* Demo Prediction Card */}
          {/* Prediction Result */}
        {prediction && (
          <div className="bg-white shadow rounded-3 p-4 mx-auto mb-5" style={{ maxWidth: '40rem' }}> 
            <h3 className="fs-5 fw-semibold text-dark mb-4">Prediction Result</h3> 
            <div className="space-y-2">
              <div><span className="fw-medium">Disease:</span> {prediction.disease}</div>
              <div><span className="fw-medium">Risk Level:</span> {prediction.risk}</div>
              <div><span className="fw-medium">Probability:</span> {prediction.probability}</div>
              <div><span className="fw-medium">Recommendation:</span> {prediction.recommendation}</div>
            </div>
          </div>
        )}

        </div>

        {/* Prediction Form */}
        <div className="bg-white shadow rounded-3 p-4 mb-5 mt-5 mx-auto" style={{ maxWidth: '40rem' }}> 
          <h3 className="fs-5 fw-semibold text-dark mb-4">Predict Disease</h3>
          <form onSubmit={handleSubmit} className="space-y-4"> 
            <div className="mb-3">
              <label className="form-label text-secondary mb-1">Symptoms</label> 
              <input
                type="text"
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. fever, headache, rash"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-secondary mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 25"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-secondary mb-1">Lifestyle</label>
              <input
                type="text"
                name="lifestyle"
                value={form.lifestyle}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. smoker, active, sedentary"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-secondary mb-1">Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. suspected dengue"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100" 
            >
              Predict
            </button>
          </form>
        </div>
                <div className="row g-4">

                  
                </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
