


import React, { useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

// List of all possible symptoms (from the API's MEDICAL_DB)
const ALL_SYMPTOMS = [
  'fever',
  'cough',
  'fatigue',
  'headache',
  'sore_throat',
  'shortness_of_breath',
  'loss_of_taste',
  'runny_nose',
  'sneezing',
  'congestion',
];

const symptomLabels = {
  fever: 'Fever',
  cough: 'Cough',
  fatigue: 'Fatigue',
  headache: 'Headache',
  sore_throat: 'Sore Throat',
  shortness_of_breath: 'Shortness of Breath',
  loss_of_taste: 'Loss of Taste',
  runny_nose: 'Runny Nose',
  sneezing: 'Sneezing',
  congestion: 'Congestion',
};

const Patients = ({ onNavigate }) => {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personal, setPersonal] = useState({
    firstName: '',
    lastName: '',
    extension: '',
    age: '',
    gender: '',
    contact: '',
    course: '',
    year: '',
    section: '',
    civilStatus: '',
    religion: '',
    emergencyName: '',
    emergencyContact: '',
    address: '',
    bloodType: '',
    allergy: '',
  });
  const [ setPersonalError] = useState(null);
  const [savedRecords, setSavedRecords] = useState([]);
  const [saveMsg, setSaveMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [ setExpandedSections] = useState({
    academic: true,
    emergency: true,
    medical: true,
  });

  const showAlertMessage = (message) => {
    console.log('showAlertMessage called with:', message);
    Swal.fire({
      title: 'Required Fields Missing!',
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK, I Understand',
      confirmButtonColor: '#dc2626'
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPersonalError(null);
    // Only validate symptoms for prediction
    if (selected.length === 0) {
      setError('Please select at least one symptom to predict.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selected,
          personal,
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setResult(data);
    } catch {
      setError('Failed to get prediction. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecord = async () => {
    // Validate all personal info for saving records
    if (!personal.firstName || !personal.lastName || !personal.age || !personal.gender || !personal.contact || !personal.course || !personal.year || !personal.section || !personal.civilStatus || !personal.religion || !personal.emergencyName || !personal.emergencyContact || !personal.address || !personal.bloodType) {
      const missingFields = [];
      if (!personal.firstName) missingFields.push('First Name');
      if (!personal.lastName) missingFields.push('Last Name');
      if (!personal.age) missingFields.push('Age');
      if (!personal.gender) missingFields.push('Gender');
      if (!personal.contact) missingFields.push('Contact Number');
      if (!personal.course) missingFields.push('Course');
      if (!personal.year) missingFields.push('Year Level');
      if (!personal.section) missingFields.push('Section');
      if (!personal.civilStatus) missingFields.push('Civil Status');
      if (!personal.religion) missingFields.push('Religion');
      if (!personal.emergencyName) missingFields.push('Emergency Contact Name');
      if (!personal.emergencyContact) missingFields.push('Emergency Contact Number');
      if (!personal.address) missingFields.push('Address');
      if (!personal.bloodType) missingFields.push('Blood Type');
      
      showAlertMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    if (selected.length === 0) {
      showAlertMessage('Please select at least one symptom to save the record.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Get prediction first
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selected,
          personal,
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setResult(data);
      
      // Save personal info, symptoms, and prediction
      setSavedRecords((prev) => [
        ...prev,
        {
          personal: { ...personal },
          symptoms: [...selected],
          prediction: data?.predictions || [],
          date: new Date().toLocaleString(),
        },
      ]);
      setSaveMsg('Patient record added with prediction!');
      setTimeout(() => setSaveMsg(''), 2000);
      setPersonalError(null);
      
      // Reset form after successful save
      setPersonal({
        firstName: '',
        lastName: '',
        extension: '',
        age: '',
        gender: '',
        contact: '',
        course: '',
        year: '',
        section: '',
        civilStatus: '',
        religion: '',
        emergencyName: '',
        emergencyContact: '',
        address: '',
        bloodType: '',
        allergy: '',
      });
      setSelected([]);
      setResult(null);
      setError(null);
      
      setShowForm(false); // Hide form after successful save
    } catch {
      setError('Failed to get prediction. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  // Automatically predict when symptoms change
  useEffect(() => {
    // Only trigger if at least one symptom is selected
    if (selected.length === 0) {
      setResult(null);
      setError(null);
      return;
    }
    let ignore = false;
    const autoPredict = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            symptoms: selected,
            personal,
          }),
        });
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        if (!ignore) setResult(data);
      } catch {
        if (!ignore) setError('Failed to get prediction. Is the API running?');
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    autoPredict();
    return () => { ignore = true; };
  }, [selected]);

  return (
    <div className="bg-light min-vh-100 d-flex">
      <Sidebar currentPage="patients" onNavigate={onNavigate} />
      
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="display-5 fw-bold text-primary mb-0">
                <i className="bi bi-person-vcard me-2"></i>
                Patient Records
              </h1>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                <i className={`bi ${showForm ? 'bi-eye-slash' : 'bi-plus-circle'} me-2`}></i>
                {showForm ? 'Hide Form' : 'Add New Patient'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Patient Records */}
        <div className="row">
          <div className="col-12">
            {savedRecords.length > 0 ? (
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-archive me-2"></i>
                    Saved Patient Records ({savedRecords.length})
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    {savedRecords.map((rec, i) => (
                      <div key={i} className="col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-header bg-light d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                              <small className="text-muted">{rec.date}</small>
                            </div>
                            <span className="badge bg-primary">#{i + 1}</span>
                          </div>
                          <div className="card-body">
                            <h6 className="fw-bold mb-3">
                              {rec.personal.firstName} {rec.personal.lastName}
                              {rec.personal.extension && <span className="text-muted">, {rec.personal.extension}</span>}
                            </h6>
                            
                            <div className="row g-2 mb-3">
                              <div className="col-6">
                                <small className="text-muted">Age:</small>
                                <div>{rec.personal.age}</div>
                              </div>
                              <div className="col-6">
                                <small className="text-muted">Gender:</small>
                                <div>{rec.personal.gender}</div>
                              </div>
                              <div className="col-6">
                                <small className="text-muted">Course:</small>
                                <div>{rec.personal.course}</div>
                              </div>
                              <div className="col-6">
                                <small className="text-muted">Year:</small>
                                <div>{rec.personal.year}</div>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <small className="text-muted">Symptoms:</small>
                              <div className="d-flex flex-wrap gap-1 mt-1">
                                {rec.symptoms.map(s => (
                                  <span key={s} className="badge bg-primary bg-opacity-75">
                                    {symptomLabels[s]}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <small className="text-muted">Top Prediction:</small>
                              <div className="fw-semibold text-primary">
                                {rec.prediction[0] ? rec.prediction[0].disease.replace(/-/g, ' ').toUpperCase() : 'No prediction'}
                              </div>
                              {rec.prediction[0] && (
                                <small className="text-muted">
                                  {(rec.prediction[0].probability * 100).toFixed(1)}% confidence
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                  <i className="bi bi-folder2-open text-muted" style={{fontSize: '3rem'}}></i>
                  <h5 className="mt-3">No Patient Records</h5>
                  <p className="text-muted">Start by adding your first patient record</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add First Patient
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Health Assessment Guide */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary rounded-pill" style={{width: '4px', height: '32px'}}></div>
                  <h3 className="fw-bold text-dark mb-0">Health Assessment Guide</h3>
                </div>
                
                <div className="row g-4">
                  {/* Assessment Process */}
                  <div className="col-lg-6">
                    <h4 className="h5 fw-semibold text-dark mb-3">Assessment Process</h4>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-start gap-3">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle small fw-bold mt-1" style={{width: '24px', height: '24px'}}>
                          1
                        </div>
                        <div>
                          <h5 className="fw-medium text-dark small mb-1">Complete Student Information</h5>
                          <p className="small text-muted mb-0">Fill in all required personal, academic, and medical information fields marked with asterisks (*).</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start gap-3">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle small fw-bold mt-1" style={{width: '24px', height: '24px'}}>
                          2
                        </div>
                        <div>
                          <h5 className="fw-medium text-dark small mb-1">Select Symptoms</h5>
                          <p className="small text-muted mb-0">Check all symptoms that the student is currently experiencing. Multiple selections are allowed.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start gap-3">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle small fw-bold mt-1" style={{width: '24px', height: '24px'}}>
                          3
                        </div>
                        <div>
                          <h5 className="fw-medium text-dark small mb-1">Review Assessment Results</h5>
                          <p className="small text-muted mb-0">Examine the predicted conditions, confidence levels, risk assessments, and medical recommendations.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start gap-3">
                        <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle small fw-bold mt-1" style={{width: '24px', height: '24px'}}>
                          4
                        </div>
                        <div>
                          <h5 className="fw-medium text-dark small mb-1">Save Patient Record</h5>
                          <p className="small text-muted mb-0">Save the assessment for future reference and to maintain student health records.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Understanding Results */}
                  <div className="col-lg-6">
                    <h4 className="h5 fw-semibold text-dark mb-3">Understanding Results</h4>
                    <div className="d-flex flex-column gap-3">
                      <div className="bg-light rounded p-3">
                        <h5 className="fw-medium text-dark small mb-2">Confidence Level</h5>
                        <p className="small text-muted mb-0">The percentage indicates how confident the system is in the diagnosis. Higher percentages suggest more reliable predictions.</p>
                      </div>
                      
                      <div className="bg-light rounded p-3">
                        <h5 className="fw-medium text-dark small mb-2">Risk Assessment</h5>
                        <div className="d-flex flex-column gap-2 small text-muted">
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-danger rounded-circle" style={{width: '12px', height: '12px'}}></div>
                            <span><strong>High Risk:</strong> Requires immediate medical attention</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-warning rounded-circle" style={{width: '12px', height: '12px'}}></div>
                            <span><strong>Moderate Risk:</strong> Monitor closely and consider medical consultation</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-success rounded-circle" style={{width: '12px', height: '12px'}}></div>
                            <span><strong>Low Risk:</strong> Generally manageable with basic care</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-light rounded p-3">
                        <h5 className="fw-medium text-dark small mb-2">Severity Levels</h5>
                        <div className="d-flex flex-column gap-2 small text-muted">
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-danger rounded-circle" style={{width: '12px', height: '12px'}}></div>
                            <span><strong>Severe:</strong> Critical condition requiring urgent care</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-warning rounded-circle" style={{width: '12px', height: '12px'}}></div>
                            <span><strong>Moderate:</strong> Significant symptoms needing attention</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-success rounded-circle" style={{width: '12px', height: '12px'}}></div>
                            <span><strong>Mild:</strong> Minor symptoms with minimal impact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Important Notes */}
                <div className="mt-4 p-4 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded">
                  <h4 className="fw-semibold text-primary mb-3">Important Notes</h4>
                  <ul className="list-unstyled mb-0 small text-primary">
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <span className="bg-primary rounded-circle mt-2 flex-shrink-0" style={{width: '8px', height: '8px'}}></span>
                      <span>This assessment tool is designed to assist school nurses and should not replace professional medical diagnosis.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <span className="bg-primary rounded-circle mt-2 flex-shrink-0" style={{width: '8px', height: '8px'}}></span>
                      <span>Always consult with healthcare professionals for serious or persistent symptoms.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <span className="bg-primary rounded-circle mt-2 flex-shrink-0" style={{width: '8px', height: '8px'}}></span>
                      <span>Emergency situations require immediate medical attention - do not rely solely on this assessment.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="bg-primary rounded-circle mt-2 flex-shrink-0" style={{width: '8px', height: '8px'}}></span>
                      <span>Maintain student privacy and confidentiality in accordance with healthcare regulations.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Screen Modal for Patient Assessment */}
        {showForm && (
          <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog"  style={{ marginBottom: '5%', height: '100vh', maxWidth: '90vw'}}>
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-clipboard2-pulse me-2"></i>
                    Patient Assessment
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowForm(false)}></button>
                </div>
                <div className="modal-body p-0">
                  <div className="row g-0 h-100">
                    {/* Form Section */}
                    {/* <div className="col-lg-6 p-4 overflow-auto" style={{maxHeight: '100vh'}}> */}
                    <div className="col-lg-6 p-4 border-end border-3 border-secondary" style={{maxHeight: '100%'}}>

                      <form onSubmit={handleSubmit}>
                          {/* Personal Information */}
                          <div className="mb-4">
                            <h6 className="fw-semibold text-primary mb-3">
                              <i className="bi bi-person me-2"></i>
                              Personal Information
                            </h6>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">First Name *</label>
                              <input
                                type="text"
                                name="firstName"
                                value={personal.firstName}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. Juan"
                                required
                                maxLength="30"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Last Name *</label>
                              <input
                                type="text"
                                name="lastName"
                                value={personal.lastName}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. Dela Cruz"
                                required
                                maxLength="30"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Extension Name</label>
                              <input
                                type="text"
                                name="extension"
                                value={personal.extension}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. Jr., Sr., III"
                                maxLength="10"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Age *</label>
                              <input
                                type="number"
                                name="age"
                                value={personal.age}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. 20"
                                min="0"
                                required
                                maxLength="3"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Gender *</label>
                              <select
                                name="gender"
                                value={personal.gender}
                                onChange={handlePersonalChange}
                                className="form-select"
                                required
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Contact Number *</label>
                              <input
                                type="text"
                                name="contact"
                                value={personal.contact}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. 09123456789"
                                required
                                maxLength="11"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Civil Status *</label>
                              <select
                                name="civilStatus"
                                value={personal.civilStatus}
                                onChange={handlePersonalChange}
                                className="form-select"
                                required
                              >
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Separated">Separated</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Religion *</label>
                              <input
                                type="text"
                                name="religion"
                                value={personal.religion}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. Catholic"
                                required
                                maxLength="30"
                              />
                            </div>
                            <div className="col-12">
                              <label className="form-label">Address *</label>
                              <textarea
                                name="address"
                                value={personal.address}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. 123 Main Street, City, Province"
                                required
                                rows="3"
                                maxLength="200"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Academic Information */}
                        <div className="mb-4">
                          <h6 className="fw-semibold text-primary mb-3">
                            <i className="bi bi-mortarboard me-2"></i>
                            Academic Information
                          </h6>
                          <div className="row g-3">
                            <div className="col-md-4">
                              <label className="form-label">Course *</label>
                              <input
                                type="text"
                                name="course"
                                value={personal.course}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. BS Computer Science"
                                required
                                maxLength="50"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Year Level *</label>
                              <select
                                name="year"
                                value={personal.year}
                                onChange={handlePersonalChange}
                                className="form-select"
                                required
                              >
                                <option value="">Select Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                                <option value="5th Year">5th Year</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Section *</label>
                              <select
                                name="section"
                                value={personal.section}
                                onChange={handlePersonalChange}
                                className="form-select"
                                required
                              >
                                <option value="">Select Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="G">G</option>
                                <option value="H">H</option>
                                <option value="I">I</option>
                                <option value="J">J</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="mb-4">
                          <h6 className="fw-semibold text-primary mb-3">
                            <i className="bi bi-telephone me-2"></i>
                            Emergency Contact
                          </h6>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">Emergency Contact Name *</label>
                              <input
                                type="text"
                                name="emergencyName"
                                value={personal.emergencyName}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. Maria Dela Cruz"
                                required
                                maxLength="50"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Emergency Contact Number *</label>
                              <input
                                type="text"
                                name="emergencyContact"
                                value={personal.emergencyContact}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. 09123456789"
                                required
                                maxLength="11"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Medical Information */}
                        <div className="mb-4">
                          <h6 className="fw-semibold text-primary mb-3">
                            <i className="bi bi-heart-pulse me-2"></i>
                            Medical Information
                          </h6>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">Blood Type *</label>
                              <select
                                name="bloodType"
                                value={personal.bloodType}
                                onChange={handlePersonalChange}
                                className="form-select"
                                required
                              >
                                <option value="">Select Blood Type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Allergies</label>
                              <input
                                type="text"
                                name="allergy"
                                value={personal.allergy}
                                onChange={handlePersonalChange}
                                className="form-control"
                                placeholder="e.g. Peanuts, Penicillin"
                                maxLength="100"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Symptoms Selection */}
                        <div className="mb-4">
                          <label className="form-label fw-semibold">
                            <i className="bi bi-list-check me-2"></i>
                            Select Symptoms:
                          </label>
                          <div className="row g-2">
                            {ALL_SYMPTOMS.map((symptom) => (
                              <div key={symptom} className="col-6">
                                <div className="form-check bg-light rounded p-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`symptom-${symptom}`}
                                    value={symptom}
                                    checked={selected.includes(symptom)}
                                    onChange={handleSymptomChange}
                                  />
                                  <label className="form-check-label" htmlFor={`symptom-${symptom}`}>
                                    {symptomLabels[symptom]}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-grid gap-2 d-md-flex">
                          <button
                            type="submit"
                            className="btn btn-primary flex-fill"
                            disabled={loading || selected.length === 0}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Predicting...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-search me-2"></i>
                                Predict Disease
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveRecord}
                            className="btn btn-success flex-fill"
                          >
                            <i className="bi bi-plus-circle me-2"></i>
                            Add Patient Record
                          </button>
                        </div>
                      </form>
                      
                      {error && (
                        <div className="alert alert-danger mt-3">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {error}
                        </div>
                      )}
                    </div>
                    {/* Results Section */}
                    <div className="col-lg-6 p-4 overflow-auto" style={{maxHeight: '100%', background: "#f8f9fa"}}>
                      {result && (
                        <div className="card mb-4">
                          <div className="card-header bg-info text-white">
                            <h6 className="card-title mb-0">
                              <i className="bi bi-clipboard-data me-2"></i>
                              Assessment Results
                            </h6>
                          </div>
                          <div className="card-body">
                            {/* Comprehensive Student Information Display */}
                            <div className="mb-4">
                              <h6 className="fw-semibold text-primary mb-3">
                                <i className="bi bi-person-badge me-2"></i>
                                Complete Student Information
                              </h6>
                              
                              {/* Personal Information */}
                              <div className="card mb-3 border-0 shadow-sm">
                                <div className="card-header bg-primary bg-opacity-10">
                                  <h6 className="fw-semibold text-primary mb-0">
                                    <i className="bi bi-person me-2"></i>
                                    Personal Information
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <div className="row g-3">
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Full Name:</span>
                                        <span className="fw-medium">
                                          {personal.firstName} {personal.lastName}
                                          {personal.extension && <span className="text-muted">, {personal.extension}</span>}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Age:</span>
                                        <span className="fw-medium">{personal.age} years</span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Gender:</span>
                                        <span className="fw-medium">{personal.gender}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Contact Number:</span>
                                        <span className="fw-medium">{personal.contact}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Civil Status:</span>
                                        <span className="fw-medium">{personal.civilStatus}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Religion:</span>
                                        <span className="fw-medium">{personal.religion}</span>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Address:</span>
                                        <span className="fw-medium text-end">{personal.address}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Academic Information */}
                              <div className="card mb-3 border-0 shadow-sm">
                                <div className="card-header bg-success bg-opacity-10">
                                  <h6 className="fw-semibold text-success mb-0">
                                    <i className="bi bi-mortarboard me-2"></i>
                                    Academic Information
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <div className="row g-3">
                                    <div className="col-md-4">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Course:</span>
                                        <span className="fw-medium">{personal.course}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Year Level:</span>
                                        <span className="fw-medium">{personal.year}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Section:</span>
                                        <span className="fw-medium">{personal.section}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Emergency Contact */}
                              <div className="card mb-3 border-0 shadow-sm">
                                <div className="card-header bg-warning bg-opacity-10">
                                  <h6 className="fw-semibold text-warning mb-0">
                                    <i className="bi bi-telephone me-2"></i>
                                    Emergency Contact
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <div className="row g-3">
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Contact Name:</span>
                                        <span className="fw-medium">{personal.emergencyName}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Contact Number:</span>
                                        <span className="fw-medium">{personal.emergencyContact}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Medical Information */}
                              <div className="card mb-3 border-0 shadow-sm">
                                <div className="card-header bg-danger bg-opacity-10">
                                  <h6 className="fw-semibold text-danger mb-0">
                                    <i className="bi bi-heart-pulse me-2"></i>
                                    Medical Information
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <div className="row g-3">
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Blood Type:</span>
                                        <span className="fw-medium">{personal.bloodType}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex justify-content-between">
                                        <span className="text-muted">Allergies:</span>
                                        <span className="fw-medium">
                                          {personal.allergy ? personal.allergy : 'None reported'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Selected Symptoms */}
                              <div className="card border-0 shadow-sm">
                                <div className="card-header bg-info bg-opacity-10">
                                  <h6 className="fw-semibold text-info mb-0">
                                    <i className="bi bi-list-check me-2"></i>
                                    Current Symptoms
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <div className="d-flex flex-wrap gap-1">
                                    {selected.length > 0 ? (
                                      selected.map(symptom => (
                                        <span key={symptom} className="badge bg-info">
                                          {symptomLabels[symptom]}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-muted fst-italic">No symptoms selected</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Assessment Results */}
                            {result.predictions && result.predictions.length > 0 && (
                              <div>
                                <h6 className="fw-semibold text-primary mb-3">
                                  <i className="bi bi-clipboard2-check me-2"></i>
                                  Medical Assessment
                                </h6>
                                
                                {result.predictions.map((pred, idx) => (
                                  <div key={pred.disease} className="card mb-3 border-0 shadow-sm">
                                    <div className="card-header bg-light">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <span className="badge bg-primary rounded-circle me-3" style={{width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            {idx + 1}
                                          </span>
                                          <div>
                                            <h6 className="fw-bold mb-0">
                                              {pred.disease.replace(/-/g, ' ').toUpperCase()}
                                            </h6>
                                            <small className="text-muted">Primary Diagnosis</small>
                                          </div>
                                        </div>
                                        <div className="text-end">
                                          <div className="fw-bold text-primary">
                                            {(pred.probability * 100).toFixed(1)}%
                                          </div>
                                          <small className="text-muted">Confidence</small>
                                        </div>
                                      </div>
                                      
                                      {/* Confidence Bar */}
                                      <div className="mt-2">
                                        <div className="progress" style={{height: '8px'}}>
                                          <div 
                                            className="progress-bar bg-primary"
                                            style={{ width: `${(pred.probability * 100)}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Risk & Severity */}
                                    <div className="card-body bg-light">
                                      <div className="row g-2">
                                        <div className="col-md-6">
                                          <div className="d-flex align-items-center">
                                            <div className={`rounded-circle me-2 ${
                                              pred.info.risk === 'High' ? 'bg-danger' :
                                              pred.info.risk === 'Moderate' ? 'bg-warning' :
                                              'bg-success'
                                            }`} style={{width: '12px', height: '12px'}}></div>
                                            <span className={`badge ${
                                              pred.info.risk === 'High' ? 'bg-danger bg-opacity-10 text-danger' :
                                              pred.info.risk === 'Moderate' ? 'bg-warning bg-opacity-10 text-warning' :
                                              'bg-success bg-opacity-10 text-success'
                                            }`}>
                                              {pred.info.risk} Risk
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="d-flex align-items-center">
                                            <div className={`rounded-circle me-2 ${
                                              pred.info.severity === 'Severe' ? 'bg-danger' :
                                              pred.info.severity === 'Moderate-Severe' || pred.info.severity === 'Moderate' ? 'bg-warning' :
                                              'bg-success'
                                            }`} style={{width: '12px', height: '12px'}}></div>
                                            <span className={`badge ${
                                              pred.info.severity === 'Severe' ? 'bg-danger bg-opacity-10 text-danger' :
                                              pred.info.severity === 'Moderate-Severe' || pred.info.severity === 'Moderate' ? 'bg-warning bg-opacity-10 text-warning' :
                                              'bg-success bg-opacity-10 text-success'
                                            }`}>
                                              {pred.info.severity}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Recommendations & Medications */}
                                    <div className="card-body">
                                      <div className="row g-3">
                                        <div className="col-md-6">
                                          <h6 className="fw-semibold text-primary mb-2">
                                            <i className="bi bi-lightbulb me-2"></i>
                                            Recommendations
                                          </h6>
                                          <div className="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded p-3">
                                            <p className="small mb-0">
                                              {pred.info.advice}
                                            </p>
                                          </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                          <h6 className="fw-semibold text-success mb-2">
                                            <i className="bi bi-capsule me-2"></i>
                                            Medications
                                          </h6>
                                          <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded p-3">
                                            {pred.info.medications && pred.info.medications.length > 0 ? (
                                              <ul className="list-unstyled mb-0 small">
                                                {pred.info.medications.map((med, medIdx) => (
                                                  <li key={medIdx} className="d-flex align-items-center mb-1">
                                                    <span className="bg-success rounded-circle me-2" style={{width: '4px', height: '4px'}}></span>
                                                    {med}
                                                  </li>
                                                ))}
                                              </ul>
                                            ) : (
                                              <p className="text-muted fst-italic mb-0 small">No specific medications recommended</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                {saveMsg && (
                                  <div className="alert alert-success">
                                    <i className="bi bi-check-circle me-2"></i>
                                    {saveMsg}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Empty States */}
                            {result.predictions && result.predictions.length === 0 && (
                              <div className="text-center py-4">
                                <i className="bi bi-question-circle text-muted" style={{fontSize: '3rem'}}></i>
                                <h6 className="mt-3">No Specific Diagnosis</h6>
                                <p className="text-muted">No likely disease found for the selected symptoms.</p>
                              </div>
                            )}
                            
                            {!result.predictions && !loading && (
                              <div className="text-center py-4">
                                <i className="bi bi-clipboard-check text-primary" style={{fontSize: '3rem'}}></i>
                                <h6 className="mt-3">Ready for Assessment</h6>
                                <p className="text-muted">Select symptoms to begin the health assessment</p>
                              </div>
                            )}
                            
                            {loading && (
                              <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                <h6 className="mt-3">Analyzing Symptoms</h6>
                                <p className="text-muted">Please wait while we process the assessment...</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;