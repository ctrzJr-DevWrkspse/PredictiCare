import React, { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const Settings = ({ onThemeToggle, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
  ];

  const handleSave = () => {
    alert('Configuration changes saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      window.location.reload();
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-grow-1 w-100 p-4" style={{ background: "#f8f9fa" }}>
        <Header
          title="System Configuration"
          subtitle="Manage and customize system settings"
          iconSrc="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a246b3db-fba2-45ad-92c1-965ca2b059cd.png"
          iconAlt="Neutral toned abstract systems configuration icon with gear and network symbols"
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={onThemeToggle}
          themeIconSrc="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/17414931-16f6-424a-8b86-3ee4ff332cf0.png"
          themeIconAlt="Dark/light mode toggle icon showing half-moon and half-sun"
        />

        {/* Tabs Navigation */}
        <div className="border-bottom mt-4"> 
          <nav className="nav nav-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow overflow-hidden rounded-3 mt-4">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="p-4"> 
              <h2 className="fs-5 fw-medium text-dark mb-4">General System Settings</h2>
              
              <div className="space-y-4">
                {/* System Name */}
                <div className="mb-3">
                  <label htmlFor="nurse" className="form-label text-secondary">Nurse Name:</label> 
                  <input 
                    type="text" 
                    id="nurseName" 
                    name="nurseName" 
                    className="form-control" 
                    placeholder="Enter nurse name"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {/* School Name */}
                <div className="mb-3">
                  <label htmlFor="schoolName:" className="form-label text-secondary">Campus Name:</label> 
                  <input 
                    type="text" 
                    id="campusName" 
                    name="campuslName" 
                    className="form-control" 
                    placeholder="Enter campus name:"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="p-4">
              <h2 className="fs-5 fw-medium text-dark mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                {/* Password Policy */}
                <div className="mb-3">
                  <label htmlFor="changepassword" className="form-label text-secondary">Change Password</label>
                    <input 
                    type='password' 
                    className='changepassword form-control' 
                    id='changepassword' 
                    placeholder='Enter New Password:'>

                    </input>
                </div>


                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label text-secondary">Confirm Password</label>
                    <input 
                    type='password' 
                    className='confirmpassword form-control' 
                    id='confirmpassword' 
                    placeholder='Re-enter New Password:'>

                    </input>
                </div>
              </div>
            </div>
          )}

          {/* Footer with action buttons */}
          <div className="bg-light px-4 py-3 d-flex justify-content-end rounded-bottom"> 
            <button 
              type="button" 
              onClick={handleSave}
              className="btn btn-primary ms-3" 
            >
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="btn btn-outline-secondary" 
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
