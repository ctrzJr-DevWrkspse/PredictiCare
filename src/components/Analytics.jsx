import React from 'react';
import Sidebar from './Sidebar';

const Analytics = ({ onNavigate }) => {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-grow w-100 p-4" style={{ background: "#f8f9fa" }}>
        <h1 className="fs-2 fw-bold text-dark mb-5">Analytics Dashboard</h1> 
        
        <div className="bg-white shadow rounded-3 p-4">
          <h2 className="fs-5 fw-medium text-dark">Analytics Component</h2> 
          <p className="text-secondary">This is the Analytics page component with charts and data visualization.</p> 
          
          {/* Placeholder for charts */}
          <div className="mt-4 row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center"> 
            <div className="bg-info-subtle rounded-3 p-3 m-2"> 
              <h3 className="fs-5 fw-medium text-info-emphasis">Total Patients</h3> 
              <p className="fs-2 fw-bold text-info">1,277</p>
            </div>
            <div className="bg-success-subtle rounded-3 p-3 m-2"> 
              <h3 className="fs-5 fw-medium text-success-emphasis">SHS</h3>
              <p className="fs-2 fw-bold text-success">89</p>
            </div>
            <div className="bg-warning-subtle rounded-3 p-3 m-2">
              <h3 className="fs-5 fw-medium text-warning-emphasis">4th Year</h3> 
              <p className="fs-2 fw-bold text-warning">1,158</p> 
            </div>
            <div className="bg-danger-subtle rounded-3 p-3 m-2">
              <h3 className="fs-5 fw-medium text-danger-emphasis">3rd Year</h3> 
              <p className="fs-2 fw-bold text-danger">12</p> 
            </div>
            <div className="bg-warning-subtle rounded-3 p-3 m-2">
              <h3 className="fs-5 fw-medium text-danger-emphasis">2nd Year</h3> 
              <p className="fs-2 fw-bold text-danger">10</p> 
            </div>
            <div className="bg-info-subtle rounded-3 p-3 m-2">
              <h3 className="fs-5 fw-medium text-danger-emphasis">1st Year</h3> 
              <p className="fs-2 fw-bold text-danger">20</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
