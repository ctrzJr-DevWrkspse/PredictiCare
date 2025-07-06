import React from 'react';
import Sidebar from './Sidebar';

const Patients = ({ onNavigate }) => {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-grow-1 w-100 p-4" style={{ background: "#f8f9fa" }}>
        <h1 className="fs-2 fw-bold text-dark mb-5">Patient Records</h1> 
        <div className="bg-white shadow rounded-3 p-4">
          <h2 className="fs-5 fw-medium text-dark">Patients Component</h2> 
          <p className="text-secondary">This is the Patients page component. List and manage patient records here.</p> 
        </div>
        <div className="'addpatient'" id='addpatient'> 
          <button className='bg-primary form-control'>
            Add Patient
          </button>
      </div>
      </div>


    </div>



  );
};

export default Patients;
