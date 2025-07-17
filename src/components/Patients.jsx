
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { v4 as uuidv4 } from 'uuid';
import { PatientViewModal, PatientFormModal } from './modals';

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
    idNo: '',
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
  const [showForm, setShowForm] = useState(false);
  const [ setExpandedSections] = useState({
    academic: true,
    emergency: true,
    medical: true,
  });
  const [viewPatient, setViewPatient] = useState(null); // NEW: for viewing patient info
  const [editPatientId, setEditPatientId] = useState(null); // for editing
  const [otherSymptoms, setOtherSymptoms] = useState(''); // for free-text symptoms

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
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: [...selected, otherSymptoms].filter(s => s), // Filter out empty strings
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
      if (!personal.idNo) missingFields.push('ID no.');
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
    if (selected.length === 0 && !otherSymptoms) {
      showAlertMessage('Please select at least one symptom or enter other symptoms to save the record.');
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
          symptoms: [...selected, otherSymptoms].filter(s => s), // Filter out empty strings
          personal,
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      setResult(data);
      
      // Save personal info, symptoms, and prediction
      if (editPatientId) {
        // Edit mode: update existing record
        setSavedRecords((prev) => prev.map(rec =>
          rec.id === editPatientId
            ? {
                ...rec,
                personal: { ...personal },
                symptoms: [...selected, otherSymptoms].filter(s => s), // Include otherSymptoms and filter out empty strings
                prediction: data?.predictions?.length ? [data.predictions[0]] : [], // Only save the first disease
                date: new Date().toLocaleString(),
              }
            : rec
        ));
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Patient record updated successfully!',
          confirmButtonColor: '#16a34a'
        }).then(() => {
          setShowForm(false);
          setEditPatientId(null);
          setPersonal({
            idNo: '',
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
        });
      } else {
        // Add mode: add new record with unique id
      const newRecord = {
        id: uuidv4(),
        personal: { ...personal },
        symptoms: [...selected, otherSymptoms].filter(s => s), // Include otherSymptoms and filter out empty strings
        prediction: data?.predictions?.length ? [data.predictions[0]] : [], // Only save the first disease
        date: new Date().toLocaleString(),
      };
      console.log('Saving record:', newRecord); // Debug log
      setSavedRecords((prev) => [...prev, newRecord]);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Patient record added successfully!',
          confirmButtonColor: '#16a34a'
        }).then(() => {
          setShowForm(false);
          setEditPatientId(null);
          setPersonal({
            idNo: '',
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
        });
      }
      
      // Reset form after successful save
      setPersonal({
        idNo: '',
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
      setOtherSymptoms('');
      setResult(null);
      setError(null);
      
      setShowForm(false); // Hide form after successful save
      setEditPatientId(null); // Reset edit mode
    } catch {
      setError('Failed to get prediction. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  // Automatically predict when symptoms change
  useEffect(() => {
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
            symptoms: [...selected, otherSymptoms].filter(s => s), // Filter out empty strings
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
  }, [selected, otherSymptoms]);

  // Delete patient record
  const handleDeletePatient = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the patient record.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setSavedRecords((prev) => prev.filter(rec => rec.id !== id));
        setViewPatient(null);
        Swal.fire('Deleted!', 'The patient record has been deleted.', 'success');
      }
    });
  };

  // Edit patient record
  const handleEditPatient = (rec) => {
    setPersonal({ ...rec.personal });
    setSelected([...rec.symptoms]);
    setOtherSymptoms(rec.symptoms.find(s => !ALL_SYMPTOMS.includes(s)) || '');
    setResult({ predictions: rec.prediction });
    setEditPatientId(rec.id);
    setShowForm(true);
    setViewPatient(null);
  };

  // Helper: check if any input is present
  const hasAnyInput = () => {
    if (selected.length > 0 || otherSymptoms) return true;
    return Object.values(personal).some(val => val && val.toString().trim() !== '');
  };

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
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">ID no.</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Course</th>
                          <th scope="col">Year</th>
                          <th scope="col">Section</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                    {savedRecords.map((rec, i) => (
                          <tr key={rec.id || i}>
                            <td>{rec.personal.idNo}</td>
                            <td>{rec.personal.firstName} {rec.personal.lastName}{rec.personal.extension && `, ${rec.personal.extension}`}</td>
                            <td>{rec.personal.course}</td>
                            <td>{rec.personal.year}</td>
                            <td>{rec.personal.section}</td>
                            <td>
                              <button className="btn btn-sm btn-info me-1" title="View" onClick={e => { e.stopPropagation(); setViewPatient(rec); }}>
                                <i className="bx bx-show"></i>
                              </button>
                              <button className="btn btn-sm btn-warning me-1" title="Edit" onClick={e => { e.stopPropagation(); handleEditPatient(rec); }}>
                                <i className="bx bx-edit"></i>
                              </button>
                              <button className="btn btn-sm btn-danger" title="Delete" onClick={e => { e.stopPropagation(); handleDeletePatient(rec.id); }}>
                                <i className="bx bx-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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


        {/* Full Screen Modal for Patient Assessment */}
        <PatientFormModal
          showForm={showForm}
          setShowForm={setShowForm}
          personal={personal}
          handlePersonalChange={handlePersonalChange}
          selected={selected}
          handleSymptomChange={handleSymptomChange}
          handleSubmit={handleSubmit}
          handleSaveRecord={handleSaveRecord}
          result={result}
          loading={loading}
          error={error}
          editPatientId={editPatientId}
          ALL_SYMPTOMS={ALL_SYMPTOMS}
          symptomLabels={symptomLabels}
          hasAnyInput={hasAnyInput}
          otherSymptoms={otherSymptoms}
          setOtherSymptoms={setOtherSymptoms}
        />

        {/* Full Screen Modal for Viewing Patient Info */}
        <PatientViewModal
          viewPatient={viewPatient}
          setViewPatient={setViewPatient}
          symptomLabels={symptomLabels}
          handleEditPatient={handleEditPatient}
          handleDeletePatient={handleDeletePatient}
        />

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
      </div>
    </div>
  );
};

export default Patients;