-- Create database
CREATE DATABASE IF NOT EXISTS health_system;
USE health_system;

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    contact VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create patient_records table (as referenced in the PHP files)
CREATE TABLE IF NOT EXISTS patient_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    symptoms JSON,
    prediction JSON,
    temperature DECIMAL(4,1),
    blood_pressure VARCHAR(20),
    respiratory_rate INT,
    o2_saturation DECIMAL(5,2),
    heart_rate INT,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Insert sample patients
INSERT INTO patients (name, age, gender, contact, address) VALUES
('John Doe', 25, 'Male', '09123456789', '123 Main St, City'),
('Jane Smith', 30, 'Female', '09987654321', '456 Oak Ave, Town'),
('Bob Johnson', 45, 'Male', '09111222333', '789 Pine Rd, Village'),
('Alice Brown', 28, 'Female', '09444555666', '321 Elm St, City'),
('Charlie Wilson', 35, 'Male', '09777888999', '654 Maple Dr, Town');

-- Insert sample patient records
INSERT INTO patient_records (patient_id, symptoms, prediction, temperature, blood_pressure, respiratory_rate, o2_saturation, heart_rate, height, weight) VALUES
(1, '["fever", "headache", "body aches"]', '[{"disease": "Fever", "probability": 0.85}]', 38.5, '120/80', 18, 98.5, 85, 175.0, 70.0),
(2, '["cough", "runny nose", "sore throat"]', '[{"disease": "Cough", "probability": 0.92}]', 37.2, '110/70', 16, 99.0, 72, 160.0, 55.0),
(3, '["stomach pain", "nausea"]', '[{"disease": "Abdominal Pain", "probability": 0.78}]', 36.8, '130/85', 20, 97.8, 88, 180.0, 85.0),
(4, '["diarrhea", "stomach cramps"]', '[{"disease": "Diarrhea", "probability": 0.89}]', 37.0, '115/75', 19, 98.2, 78, 165.0, 60.0),
(5, '["skin rash", "itching"]', '[{"disease": "Skin Problems", "probability": 0.76}]', 36.5, '125/80', 17, 99.2, 75, 170.0, 68.0),
(1, '["foot pain", "swelling"]', '[{"disease": "Foot Pain", "probability": 0.82}]', 36.7, '118/78', 18, 98.8, 80, 175.0, 70.0),
(2, '["high blood pressure check"]', '[{"disease": "High Blood Pressure", "probability": 0.95}]', 36.9, '140/90', 16, 99.1, 85, 160.0, 55.0),
(3, '["physical examination"]', '[{"disease": "Physical Examination", "probability": 1.0}]', 36.6, '120/80', 18, 99.0, 72, 180.0, 85.0),
(4, '["ROTC medical exam"]', '[{"disease": "ROTC Examination", "probability": 1.0}]', 36.8, '115/75', 17, 99.3, 70, 165.0, 60.0),
(5, '["headache", "dizziness"]', '[{"disease": "Headache", "probability": 0.87}]', 37.1, '122/82', 19, 98.7, 82, 170.0, 68.0);

-- Create indexes for better performance
CREATE INDEX idx_patient_records_patient_id ON patient_records(patient_id);
CREATE INDEX idx_patient_records_date ON patient_records(date_created);
CREATE INDEX idx_patients_name ON patients(name);