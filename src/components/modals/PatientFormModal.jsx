import React from 'react';

const PatientFormModal = ({ 
  showForm, 
  setShowForm, 
  personal, 
  handlePersonalChange, 
  selected, 
  handleSymptomChange, 
  handleSubmit, 
  handleSaveRecord, 
  result, 
  loading, 
  error, 
  editPatientId, 
  ALL_SYMPTOMS, 
  symptomLabels, 
  hasAnyInput,
  otherSymptoms,
  setOtherSymptoms
}) => {
  if (!showForm) return null;

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
          <div className="modal-header bg-success text-white" style={{position: 'sticky', top: 0, zIndex: 2}}>
            <h5 className="modal-title">
              Patient Assessment
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShowForm(false)}></button>
          </div>
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Form Section */}
              <div className="col-lg-6 p-4 border-end border-3 border-secondary">
                <form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="mb-4">
                    <h6 className="fw-semibold text-primary mb-3">
                      Personal Information
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label"><strong>ID no. <span style= {{color: 'red'}}> *</span> </strong></label>
                        
                        <input
                          type="text"
                          name="idNo"
                          value={personal.idNo}
                          onChange={handlePersonalChange}
                          className="form-control"
                          placeholder="e.g. E21-00000"
                          required
                          maxLength="10"
                        />
                      </div>
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

                  {/* Other Symptoms */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Other Symptoms (Optional):
                    </label>
                    <textarea
                      value={otherSymptoms}
                      onChange={(e) => setOtherSymptoms(e.target.value)}
                      className="form-control"
                      placeholder="Enter any other symptoms not listed above..."
                      rows="3"
                      maxLength="200"
                    />
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
                          Predict Disease
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveRecord}
                      className="btn btn-success flex-fill"
                    >
                      {editPatientId ? (
                        <>
                          Save Changes
                        </>
                      ) : (
                        <>
                          Add Patient Record
                        </>
                      )}
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
              <div className="col-lg-6 p-4" style={{background: "#f8f9fa"}}>
                {hasAnyInput() && result && (
                  <div className="card mb-4">
                    <div className="card-header bg-info text-white">
                      <h6 className="card-title mb-0">
                        Assessment Results
                      </h6>
                    </div>
                    <div className="card-body">
                      {/* Comprehensive Student Information Display */}
                      <div className="mb-4">
                        <h6 className="fw-semibold text-primary mb-3">
                          Complete Student Information
                        </h6>
                        {/* Personal Information */}
                        <div className="card mb-3 border-0 shadow-sm">
                          <div className="card-header bg-primary bg-opacity-10">
                            <h6 className="fw-semibold text-primary mb-0">
                              Personal Information
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row g-3">
                              {personal.idNo && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">ID no.:</span>
                                    <span className="fw-medium">{personal.idNo}</span>
                                  </div>
                                </div>
                              )}
                              {personal.firstName && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Full Name:</span>
                                    <span className="fw-medium">
                                      {personal.firstName} {personal.lastName}
                                      {personal.extension && <span className="text-muted">, {personal.extension}</span>}
                                    </span>
                                  </div>
                                </div>
                              )}
                              {personal.age && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Age:</span>
                                    <span className="fw-medium">{personal.age} years</span>
                                  </div>
                                </div>
                              )}
                              {personal.gender && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Gender:</span>
                                    <span className="fw-medium">{personal.gender}</span>
                                  </div>
                                </div>
                              )}
                              {personal.contact && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Contact Number:</span>
                                    <span className="fw-medium">{personal.contact}</span>
                                  </div>
                                </div>
                              )}
                              {personal.civilStatus && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Civil Status:</span>
                                    <span className="fw-medium">{personal.civilStatus}</span>
                                  </div>
                                </div>
                              )}
                              {personal.religion && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Religion:</span>
                                    <span className="fw-medium">{personal.religion}</span>
                                  </div>
                                </div>
                              )}
                              {personal.address && (
                                <div className="col-12">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Address:</span>
                                    <span className="fw-medium text-end">{personal.address}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Academic Information */}
                        <div className="card mb-3 border-0 shadow-sm">
                          <div className="card-header bg-success bg-opacity-10">
                            <h6 className="fw-semibold text-success mb-0">
                              Academic Information
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row g-3">
                              {personal.course && (
                                <div className="col-md-4">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Course:</span>
                                    <span className="fw-medium">{personal.course}</span>
                                  </div>
                                </div>
                              )}
                              {personal.year && (
                                <div className="col-md-4">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Year Level:</span>
                                    <span className="fw-medium">{personal.year}</span>
                                  </div>
                                </div>
                              )}
                              {personal.section && (
                                <div className="col-md-4">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Section:</span>
                                    <span className="fw-medium">{personal.section}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Emergency Contact */}
                        <div className="card mb-3 border-0 shadow-sm">
                          <div className="card-header bg-warning bg-opacity-10">
                            <h6 className="fw-semibold text-warning mb-0">
                              Emergency Contact
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row g-3">
                              {personal.emergencyName && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Contact Name:</span>
                                    <span className="fw-medium">{personal.emergencyName}</span>
                                  </div>
                                </div>
                              )}
                              {personal.emergencyContact && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Contact Number:</span>
                                    <span className="fw-medium">{personal.emergencyContact}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Medical Information */}
                        <div className="card mb-3 border-0 shadow-sm">
                          <div className="card-header bg-danger bg-opacity-10">
                            <h6 className="fw-semibold text-danger mb-0">
                              Medical Information
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row g-3">
                              {personal.bloodType && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Blood Type:</span>
                                    <span className="fw-medium">{personal.bloodType}</span>
                                  </div>
                                </div>
                              )}
                              {personal.allergy && (
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-between">
                                    <span className="text-muted">Allergies:</span>
                                    <span className="fw-medium">
                                      {personal.allergy ? personal.allergy : 'None reported'}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Selected Symptoms */}
                        <div className="card border-0 shadow-sm">
                          <div className="card-header bg-info bg-opacity-10">
                            <h6 className="fw-semibold text-info mb-0">
                              Current Symptoms
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="d-flex flex-wrap gap-1 justify-content-start">
                              {selected.length > 0 || otherSymptoms ? (
                                <>
                                  {selected.map(symptom => (
                                    <span key={symptom} className="badge bg-info">
                                      {symptomLabels[symptom]}
                                    </span>
                                  ))}
                                  {otherSymptoms && (
                                    <span className="badge bg-warning">
                                      {otherSymptoms}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="text-muted fst-italic">No symptoms selected</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Assessment Results */}
                      {selected.length > 0 && result.predictions && result.predictions.length > 0 && (
                        <div>
                          <h6 className="fw-semibold text-primary mb-3">
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
                          ))}
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
  );
};

export default PatientFormModal; 