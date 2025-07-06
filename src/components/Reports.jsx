import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Reports = ({ onNavigate }) => {
  const handleExport = () => {
    alert('Report exported successfully!');
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-grow-1 w-100 p-4" style={{ background: "#f8f9fa" }}>
        <div className="mx-auto" style={{ maxWidth: '70rem' }}> 
          <Header
            title="Reports Dashboard"
            subtitle="View and export system reports"
            onSidebarToggle={() => {}}
            showExportButton={true}
            onExport={handleExport}
          />

          <div className="bg-white shadow rounded-3 p-4 mt-4"> 
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4"> 
              {/* Report Cards */}
              <div className="col">
                <div className="bg-info-subtle rounded-3 p-4 border border-info-subtle"> 
                  <h3 className="fs-5 fw-medium text-info-emphasis">Patient Reports</h3> 
                  <p className="mt-2 text-info">Generate detailed patient analysis reports</p> 
                  <button className="mt-3 w-100 btn btn-info text-white"> 
                    View Reports
                  </button>
                </div>
              </div>
              
              <div className="col">
                <div className="bg-success-subtle rounded-3 p-4 border border-success-subtle"> 
                  <h3 className="fs-5 fw-medium text-success-emphasis">Health Statistics</h3>
                  <p className="mt-2 text-success">View community health analytics</p>
                  <button className="mt-3 w-100 btn btn-success text-white"> 
                    View Stats
                  </button>
                </div>
              </div>
              
              <div className="col">
                <div className="bg-purple-subtle rounded-3 p-4 border border-purple-subtle"> 
                  <h3 className="fs-5 fw-medium text-purple-emphasis">System Reports</h3> 
                  <p className="mt-2 text-purple">Export system usage logs</p> 
                  <button className="mt-3 w-100 btn btn-purple text-white"> 
                    Export Data
                  </button>
                </div>
              </div>
            </div>

            {/* Report Generation Form */}
            <div className="border-top pt-4"> 
              <h3 className="fs-5 fw-medium text-dark mb-4">Generate Custom Report</h3> 
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary mb-1">Report Type</label> 
                  <select className="form-select">
                    <option>Patient Summary</option>
                    <option>Health Trends</option>
                    <option>System Performance</option>
                    <option>Custom Report</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary mb-1">Date Range</label>
                  <select className="form-select">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 btn btn-primary"> 
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
