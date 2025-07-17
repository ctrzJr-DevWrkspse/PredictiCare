import React from 'react';

const PatientViewModal = ({ viewPatient, setViewPatient, symptomLabels }) => {
  if (!viewPatient) return null;
  
  console.log('Viewing patient:', viewPatient); // Debug log
  console.log('Predictions:', viewPatient.prediction); // Debug log

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="modal-dialog" style={{maxWidth: '90vw', width: '90vw'}}>
        <div className="modal-content" style={{maxHeight: '90vh', width: '100%', overflow: 'auto'}}>
          <div className="modal-header bg-primary text-white" style={{position: 'sticky', top: 0, zIndex: 2}}>
            <h5 className="modal-title">
              Patient Record Details
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => setViewPatient(null)}></button>
          </div>
          <div className="modal-body p-2">
            <div className="row g-0">
              <div className="col-lg-6 p-4 border-end border-3 border-secondary">
                {/* Personal Information */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-primary mb-3">
                    Personal Information
                  </h6>
                  <div className="row g-3">
                    {viewPatient.personal.idNo && (
                      <div className="col-md-6"><strong>ID no.:</strong> {viewPatient.personal.idNo}</div>
                    )}
                    {viewPatient.personal.firstName && (
                      <div className="col-md-6"><strong>First Name:</strong> {viewPatient.personal.firstName}</div>
                    )}
                    {viewPatient.personal.lastName && (
                      <div className="col-md-6"><strong>Last Name:</strong> {viewPatient.personal.lastName}</div>
                    )}
                    {viewPatient.personal.extension && (
                      <div className="col-md-6"><strong>Extension:</strong> {viewPatient.personal.extension}</div>
                    )}
                    {viewPatient.personal.age && (
                      <div className="col-md-6"><strong>Age:</strong> {viewPatient.personal.age}</div>
                    )}
                    {viewPatient.personal.gender && (
                      <div className="col-md-6"><strong>Gender:</strong> {viewPatient.personal.gender}</div>
                    )}
                    {viewPatient.personal.contact && (
                      <div className="col-md-6"><strong>Contact:</strong> {viewPatient.personal.contact}</div>
                    )}
                    {viewPatient.personal.civilStatus && (
                      <div className="col-md-6"><strong>Civil Status:</strong> {viewPatient.personal.civilStatus}</div>
                    )}
                    {viewPatient.personal.religion && (
                      <div className="col-md-6"><strong>Religion:</strong> {viewPatient.personal.religion}</div>
                    )}
                    {viewPatient.personal.address && (
                      <div className="col-12"><strong>Address:</strong> {viewPatient.personal.address}</div>
                    )}
                  </div>
                </div>
                {/* Academic Information */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-success mb-3">
                    Academic Information
                  </h6>
                  <div className="row g-3">
                    {viewPatient.personal.course && (
                      <div className="col-md-4"><strong>Course:</strong> {viewPatient.personal.course}</div>
                    )}
                    {viewPatient.personal.year && (
                      <div className="col-md-4"><strong>Year Level:</strong> {viewPatient.personal.year}</div>
                    )}
                    {viewPatient.personal.section && (
                      <div className="col-md-4"><strong>Section:</strong> {viewPatient.personal.section}</div>
                    )}
                  </div>
                </div>
                {/* Emergency Contact */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-warning mb-3">
                    Emergency Contact
                  </h6>
                  <div className="row g-3">
                    {viewPatient.personal.emergencyName && (
                      <div className="col-md-6"><strong>Name:</strong> {viewPatient.personal.emergencyName}</div>
                    )}
                    {viewPatient.personal.emergencyContact && (
                      <div className="col-md-6"><strong>Contact Number:</strong> {viewPatient.personal.emergencyContact}</div>
                    )}
                  </div>
                </div>
                {/* Medical Information */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-danger mb-3">
                    Medical Information
                  </h6>
                  <div className="row g-3">
                    {viewPatient.personal.bloodType && (
                      <div className="col-md-6"><strong>Blood Type:</strong> {viewPatient.personal.bloodType}</div>
                    )}
                    {viewPatient.personal.allergy && (
                      <div className="col-md-6"><strong>Allergies:</strong> {viewPatient.personal.allergy ? viewPatient.personal.allergy : 'None reported'}</div>
                    )}
                  </div>
                </div>
                {/* Symptoms */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-info mb-3">
                    Symptoms
                  </h6>
                  <div className="d-flex flex-wrap gap-1">
                    {viewPatient.symptoms.length > 0 ? (
                      viewPatient.symptoms.map(symptom => {
                        // Check if this is a predefined symptom or other symptoms
                        const isPredefinedSymptom = symptomLabels[symptom];
                        return (
                          <span key={symptom} className={`badge ${isPredefinedSymptom ? 'bg-info' : 'bg-warning'}`}>
                            {isPredefinedSymptom ? symptomLabels[symptom] : symptom}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-muted fst-italic">No symptoms selected</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Assessment Results */}
              <div className="col-lg-6 p-4" style={{background: "#f8f9fa"}}>
                <div className="mb-4">
                  <h6 className="fw-semibold text-primary mb-3">
                    Medical Assessment
                  </h6>
                  {viewPatient.prediction && viewPatient.prediction.length > 0 ? (
                    viewPatient.prediction.map((pred, idx) => (
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
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-question-circle text-muted" style={{fontSize: '3rem'}}></i>
                      <h6 className="mt-3">No Specific Diagnosis</h6>
                      <p className="text-muted">No likely disease found for the selected symptoms.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientViewModal; 