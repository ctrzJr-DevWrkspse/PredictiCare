import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import Print from './Utils/print.jsx';
import Sidebar from './Sidebar';

const Reports = ({ onNavigate }) => {
  const [showPrintView, setShowPrintView] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('summary');
  const [selectedDateRange, setSelectedDateRange] = useState('30');
  const [dashboardData, setDashboardData] = useState({
    summary: null,
    patientStats: null,
    healthTrends: null
  });
  const printRef = useRef(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch summary data
      const summaryResponse = await fetch('http://localhost/api/get_reports.php?type=summary');
      const summaryData = await summaryResponse.json();

      // Fetch patient stats
      const statsResponse = await fetch('http://localhost/api/get_reports.php?type=patient_stats&range=30');
      const statsData = await statsResponse.json();

      // Fetch health trends
      const trendsResponse = await fetch('http://localhost/api/get_reports.php?type=health_trends&range=7');
      const trendsData = await trendsResponse.json();

      setDashboardData({
        summary: summaryData.success ? summaryData.data : null,
        patientStats: statsData.success ? statsData.data : null,
        healthTrends: trendsData.success ? trendsData.data : null
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      // Fetch consultation summary for print
      const response = await fetch(`http://localhost/api/get_reports.php?type=consultation_summary&range=${selectedDateRange}`);
      const data = await response.json();
      
      if (data.success) {
        // Transform data for print component
        const transformedData = transformDataForPrint(data.data);
        setReportData(transformedData);
        setShowPrintView(true);

        // Delay to allow render before printing
        setTimeout(() => {
          window.print();
          setShowPrintView(false);
        }, 500);
      } else {
        alert('Error fetching report data: ' + data.error);
      }
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Error exporting report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateCustomReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost/api/get_reports.php?type=${selectedReportType}&range=${selectedDateRange}`);
      const data = await response.json();
      
      if (data.success) {
        setReportData(data.data);
        // You can display this data in a modal or separate view
        console.log('Report data:', data.data);
        alert('Report generated successfully! Check console for data.');
      } else {
        alert('Error generating report: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const transformDataForPrint = (data) => {
    // Transform the database data into the format expected by the Print component
    const consultationData = [];
    const symptomCounts = data.symptom_counts || {};
    
    // Map common diseases to complaint codes
    const diseaseMapping = {
      'Fever': { code: 'A', complaint: 'Fever' },
      'Cough': { code: 'C', complaint: 'Cough and colds' },
      'Headache': { code: 'G', complaint: 'Headache' },
      'Abdominal Pain': { code: 'R', complaint: 'Abdominal pain/Gastralgia' },
      'Diarrhea': { code: 'Y', complaint: 'LBM/diarrhea' },
      'Skin Problems': { code: 'FF', complaint: 'Skin Illness' },
      'Foot Pain': { code: 'HH', complaint: 'Foot pain' },
      'High Blood Pressure': { code: 'LL', complaint: 'For BP' },
      'Physical Examination': { code: 'QQ', complaint: 'PE for Employee' },
      'ROTC Examination': { code: 'SS', complaint: 'PE for ROTC' }
    };

    // Create consultation data array
    Object.keys(diseaseMapping).forEach(disease => {
      const mapping = diseaseMapping[disease];
      const count = symptomCounts[disease] || 0;
      
      consultationData.push({
        code: mapping.code,
        complaint: mapping.complaint,
        personnel: count,
        total: count
      });
    });

    // Calculate totals (you might want to fetch actual department data)
    const totalConsultations = Object.values(symptomCounts).reduce((sum, count) => sum + count, 0);
    
    return {
      consultationData,
      totals: {
        gradSchool: Math.floor(totalConsultations * 0.02),
        edMath: Math.floor(totalConsultations * 0.15),
        edip: Math.floor(totalConsultations * 0.20),
        base: Math.floor(totalConsultations * 0.03),
        bael: Math.floor(totalConsultations * 0.07),
        bad: Math.floor(totalConsultations * 0.05),
        bpa: Math.floor(totalConsultations * 0.21),
        bsba: Math.floor(totalConsultations * 0.05),
        beEntep: Math.floor(totalConsultations * 0.03),
        beed: Math.floor(totalConsultations * 0.10),
        bsed: Math.floor(totalConsultations * 0.04),
        bped: 0,
        shs: 0,
        jhs: 0,
        personnel: Math.floor(totalConsultations * 0.05),
        others: 0,
        total: totalConsultations
      }
    };
  };

  const formatNumber = (num) => {
    return num ? Number(num).toLocaleString() : '0';
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-grow-1 w-100 p-4" style={{ background: "#f8f9fa" }}>
        <div className="mx-auto" style={{ maxWidth: '70rem' }}>
          <Header
            title="Reports Dashboard"
            subtitle="View and export system reports"
            showExportButton={true}
            onExport={handleExport}
            onSidebarToggle={() => {}}
          />

          {/* Dashboard Interface */}
          {!showPrintView && (
            <div className="bg-white shadow rounded-3 p-4 mt-4">
              {/* Summary Cards */}
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {/* Patient Reports */}
                <div className="col">
                  <div className="bg-info-subtle rounded-3 p-4 border border-info-subtle">
                    <h3 className="fs-5 fw-medium text-info-emphasis">Patient Reports</h3>
                    <p className="mt-2 text-info">
                      Total Patients: {dashboardData.summary ? formatNumber(dashboardData.summary.summary.unique_patients) : 'Loading...'}
                    </p>
                    <p className="text-info">
                      Total Records: {dashboardData.summary ? formatNumber(dashboardData.summary.summary.total_records) : 'Loading...'}
                    </p>
                    <button 
                      className="mt-3 w-100 btn btn-info text-white"
                      onClick={() => {
                        setSelectedReportType('patient_stats');
                        generateCustomReport();
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'View Reports'}
                    </button>
                  </div>
                </div>

                {/* Health Statistics */}
                <div className="col">
                  <div className="bg-success-subtle rounded-3 p-4 border border-success-subtle">
                    <h3 className="fs-5 fw-medium text-success-emphasis">Health Statistics</h3>
                    <p className="mt-2 text-success">
                      Avg Temperature: {dashboardData.patientStats?.statistics?.avg_temperature ? 
                        Number(dashboardData.patientStats.statistics.avg_temperature).toFixed(1) + '°C' : 'N/A'}
                    </p>
                    <p className="text-success">
                      Total Consultations: {dashboardData.patientStats?.statistics?.total_consultations ? 
                        formatNumber(dashboardData.patientStats.statistics.total_consultations) : 'N/A'}
                    </p>
                    <button 
                      className="mt-3 w-100 btn btn-success text-white"
                      onClick={() => {
                        setSelectedReportType('health_trends');
                        generateCustomReport();
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'View Stats'}
                    </button>
                  </div>
                </div>

                {/* System Reports */}
                <div className="col">
                  <div className="bg-purple-subtle rounded-3 p-4 border border-purple-subtle">
                    <h3 className="fs-5 fw-medium text-purple-emphasis">System Reports</h3>
                    <p className="mt-2 text-purple">
                      Latest Record: {dashboardData.summary?.summary?.last_record || 'N/A'}
                    </p>
                    <p className="text-purple">
                      First Record: {dashboardData.summary?.summary?.first_record || 'N/A'}
                    </p>
                    <button 
                      className="mt-3 w-100 btn btn-purple text-white" 
                      onClick={handleExport}
                      disabled={loading}
                    >
                      {loading ? 'Exporting...' : 'Export Data'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              {dashboardData.summary?.recent_activity && (
                <div className="border-top pt-4 mb-4">
                  <h3 className="fs-5 fw-medium text-dark mb-3">Recent Activity</h3>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Patient ID</th>
                          <th>Symptoms</th>
                          <th>Prediction</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.summary.recent_activity.slice(0, 5).map((record, index) => (
                          <tr key={index}>
                            <td>{record.patient_id}</td>
                            <td>
                              {Array.isArray(record.symptoms) ? 
                                record.symptoms.slice(0, 2).join(', ') + (record.symptoms.length > 2 ? '...' : '') 
                                : 'N/A'}
                            </td>
                            <td>
                              {Array.isArray(record.prediction) && record.prediction.length > 0 ? 
                                record.prediction[0].disease || 'N/A' : 'N/A'}
                            </td>
                            <td>{new Date(record.date_created).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Report Generation Form */}
              <div className="border-top pt-4">
                <h3 className="fs-5 fw-medium text-dark mb-4">Generate Custom Report</h3>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary mb-1">Report Type</label>
                    <select 
                      className="form-select"
                      value={selectedReportType}
                      onChange={(e) => setSelectedReportType(e.target.value)}
                    >
                      <option value="summary">Patient Summary</option>
                      <option value="health_trends">Health Trends</option>
                      <option value="patient_stats">Patient Statistics</option>
                      <option value="consultation_summary">Consultation Summary</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary mb-1">Date Range</label>
                    <select 
                      className="form-select"
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                    >
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last Quarter</option>
                      <option value="365">Last Year</option>
                    </select>
                  </div>
                </div>
                <button 
                  className="mt-4 btn btn-primary"
                  onClick={generateCustomReport}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </div>
          )}

          {/* Printable Report */}
          {showPrintView && (
            <div ref={printRef} className="printable-content bg-white p-4 mt-4">
              <Print reportData={reportData} />
            </div>
          )}
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-content, .printable-content * {
            visibility: visible;
          }
          .printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
        
        .btn-purple {
          background-color: #6f42c1;
          border-color: #6f42c1;
        }
        
        .btn-purple:hover {
          background-color: #5a359a;
          border-color: #5a359a;
        }
        
        .bg-purple-subtle {
          background-color: #e2d9f3;
        }
        
        .border-purple-subtle {
          border-color: #d1c7e3;
        }
        
        .text-purple-emphasis {
          color: #6f42c1;
        }
        
        .text-purple {
          color: #8e6ab8;
        }
      `}</style>
    </div>
  );
};

export default Reports;
