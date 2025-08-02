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
    course VARCHAR(50), -- Added course field
    year_level VARCHAR(20), -- Added year level
    student_id VARCHAR(50), -- Added student ID
    employee_id VARCHAR(50), -- For personnel
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
    course VARCHAR(50), -- Added course field for direct tracking
    consultation_type ENUM('medical', 'physical_exam', 'checkup', 'emergency') DEFAULT 'medical',
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Insert sample patients with courses
INSERT INTO patients (name, age, gender, contact, address, course, year_level, student_id) VALUES
('John Doe', 25, 'Male', '09123456789', '123 Main St, City', 'BSIT', '4th Year', '2020-001'),
('Jane Smith', 30, 'Female', '09987654321', '456 Oak Ave, Town', 'BS MATH', '3rd Year', '2021-002'),
('Bob Johnson', 45, 'Male', '09111222333', '789 Pine Rd, Village', 'BASS', '2nd Year', '2022-003'),
('Alice Brown', 28, 'Female', '09444555666', '321 Elm St, City', 'BAEL', '4th Year', '2020-004'),
('Charlie Wilson', 35, 'Male', '09777888999', '654 Maple Dr, Town', 'PERSONNEL', NULL, NULL),
('Maria Garcia', 22, 'Female', '09123123123', '111 First St, City', 'BPA', '3rd Year', '2021-005'),
('David Lee', 24, 'Male', '09456456456', '222 Second Ave, Town', 'BSBA', '4th Year', '2020-006'),
('Sarah Kim', 21, 'Female', '09789789789', '333 Third Rd, Village', 'BS ENTREP', '2nd Year', '2022-007'),
('Michael Chen', 23, 'Male', '09321321321', '444 Fourth St, City', 'BEED', '3rd Year', '2021-008'),
('Lisa Wong', 20, 'Female', '09654654654', '555 Fifth Ave, Town', 'BSED', '1st Year', '2023-009'),
('James Park', 19, 'Male', '09987987987', '666 Sixth Rd, Village', 'SHS', '12th Grade', 'SHS-001'),
('Emma Davis', 17, 'Female', '09147147147', '777 Seventh St, City', 'JHS', '10th Grade', 'JHS-001');

-- Insert sample patient records with course information
INSERT INTO patient_records (patient_id, symptoms, prediction, temperature, blood_pressure, respiratory_rate, o2_saturation, heart_rate, height, weight, course, consultation_type) VALUES
(1, '["fever", "headache", "body aches"]', '[{"disease": "Fever", "probability": 0.85}]', 38.5, '120/80', 18, 98.5, 85, 175.0, 70.0, 'BSIT', 'medical'),
(2, '["cough", "runny nose", "sore throat"]', '[{"disease": "Cough", "probability": 0.92}]', 37.2, '110/70', 16, 99.0, 72, 160.0, 55.0, 'BS MATH', 'medical'),
(3, '["stomach pain", "nausea"]', '[{"disease": "Abdominal Pain", "probability": 0.78}]', 36.8, '130/85', 20, 97.8, 88, 180.0, 85.0, 'BASS', 'medical'),
(4, '["diarrhea", "stomach cramps"]', '[{"disease": "Diarrhea", "probability": 0.89}]', 37.0, '115/75', 19, 98.2, 78, 165.0, 60.0, 'BAEL', 'medical'),
(5, '["skin rash", "itching"]', '[{"disease": "Skin Problems", "probability": 0.76}]', 36.5, '125/80', 17, 99.2, 75, 170.0, 68.0, 'PERSONNEL', 'medical'),
(1, '["foot pain", "swelling"]', '[{"disease": "Foot Pain", "probability": 0.82}]', 36.7, '118/78', 18, 98.8, 80, 175.0, 70.0, 'BSIT', 'medical'),
(2, '["high blood pressure check"]', '[{"disease": "High Blood Pressure", "probability": 0.95}]', 36.9, '140/90', 16, 99.1, 85, 160.0, 55.0, 'BS MATH', 'checkup'),
(6, '["physical examination"]', '[{"disease": "Physical Examination", "probability": 1.0}]', 36.6, '120/80', 18, 99.0, 72, 165.0, 58.0, 'BPA', 'physical_exam'),
(7, '["physical examination"]', '[{"disease": "Physical Examination", "probability": 1.0}]', 36.8, '115/75', 17, 99.3, 70, 175.0, 65.0, 'BSBA', 'physical_exam'),
(8, '["headache", "dizziness"]', '[{"disease": "Headache", "probability": 0.87}]', 37.1, '122/82', 19, 98.7, 82, 160.0, 52.0, 'BS ENTREP', 'medical'),
(9, '["cough", "sore throat"]', '[{"disease": "Cough", "probability": 0.85}]', 37.3, '118/76', 18, 98.9, 78, 158.0, 50.0, 'BEED', 'medical'),
(10, '["fever", "body aches"]', '[{"disease": "Fever", "probability": 0.88}]', 38.2, '112/72', 17, 99.1, 75, 162.0, 48.0, 'BSED', 'medical'),
(11, '["physical examination"]', '[{"disease": "Physical Examination", "probability": 1.0}]', 36.7, '110/70', 16, 99.2, 68, 170.0, 60.0, 'SHS', 'physical_exam'),
(12, '["stomachache", "nausea"]', '[{"disease": "Abdominal Pain", "probability": 0.82}]', 37.0, '108/68', 18, 98.8, 72, 155.0, 45.0, 'JHS', 'medical'),
(5, '["bp check", "routine checkup"]', '[{"disease": "High Blood Pressure", "probability": 0.90}]', 36.8, '135/88', 16, 99.0, 82, 170.0, 68.0, 'PERSONNEL', 'checkup'),
(6, '["back pain", "muscle strain"]', '[{"disease": "Back Pain", "probability": 0.85}]', 36.9, '125/80', 17, 98.9, 76, 165.0, 58.0, 'BPA', 'medical'),
(7, '["migraine", "headache"]', '[{"disease": "Migraine", "probability": 0.92}]', 37.2, '120/78', 18, 99.1, 80, 175.0, 65.0, 'BSBA', 'medical');

-- Create indexes for better performance
CREATE INDEX idx_patient_records_patient_id ON patient_records(patient_id);
CREATE INDEX idx_patient_records_date ON patient_records(date_created);
CREATE INDEX idx_patient_records_course ON patient_records(course);
CREATE INDEX idx_patients_name ON patients(name);
CREATE INDEX idx_patients_course ON patients(course);