# Health System Reports Setup Guide

## Overview
This guide will help you set up the Reports system that connects to a MySQL database and provides accurate reporting functionality for the health management system.

## Prerequisites
- MySQL/MariaDB server running
- PHP server (Apache/Nginx with PHP support)
- React development environment
- Web server with CORS enabled

## Database Setup

### 1. Create the Database
Run the SQL script to create the database and tables:

```bash
mysql -u root -p < database_setup.sql
```

Or manually execute the SQL commands in your MySQL client:
- Creates `health_system` database
- Creates `patients` and `patient_records` tables
- Inserts sample data for testing

### 2. Configure Database Connection
Update `api/db.php` with your database credentials:

```php
$servername = "localhost";  // Your MySQL server
$username = "root";         // Your MySQL username
$password = "your_password"; // Your MySQL password
$dbname = "health_system";  // Database name
```

## API Endpoints Setup

### 1. Place PHP Files
Copy the PHP files to your web server directory:
- `api/db.php` - Database connection
- `api/get_reports.php` - Reports API endpoint
- `api/add_patient_record.php` - Add patient records (existing)
- `api/get_patient_records.php` - Get patient records (existing)

### 2. Enable CORS
Ensure your web server allows CORS requests from your React app. The PHP files already include CORS headers.

### 3. Test API Endpoints
Test the endpoints:
- `GET /api/get_reports.php?type=summary` - Get summary report
- `GET /api/get_reports.php?type=patient_stats&range=30` - Get patient statistics
- `GET /api/get_reports.php?type=health_trends&range=7` - Get health trends
- `GET /api/get_reports.php?type=consultation_summary&range=30` - Get consultation summary

## React Component Setup

### 1. Install Dependencies
Make sure you have the required React dependencies:

```bash
npm install react react-dom
```

### 2. Component Structure
The Reports system includes:
- `src/components/Reports.jsx` - Main reports dashboard
- `src/components/Utils/print.jsx` - Print component for generating reports

### 3. Update API Base URL
In `Reports.jsx`, update the API base URL if needed:

```javascript
// Change this line if your API is hosted elsewhere
const response = await fetch('http://localhost/api/get_reports.php?type=summary');
```

## Features

### Dashboard Features
1. **Patient Reports Card**
   - Shows total patients and records
   - Fetches data from database
   - Clickable to generate patient statistics

2. **Health Statistics Card**
   - Shows average temperature and consultation counts
   - Real-time data from patient records
   - Generates health trends reports

3. **System Reports Card**
   - Shows first and latest record dates
   - Export functionality for printable reports

4. **Recent Activity Table**
   - Shows last 5 patient consultations
   - Displays symptoms and predictions
   - Real-time data updates

5. **Custom Report Generation**
   - Multiple report types: Summary, Health Trends, Patient Stats, Consultation Summary
   - Date range selection: 7 days, 30 days, 90 days, 1 year
   - Interactive report generation

### Print Functionality
- Auto-generates printable consultation reports
- Formats data for ISPSC Health Services
- Includes proper styling for A4 landscape printing
- Maps database diseases to complaint codes

## Database Schema

### patients table
- `id` - Primary key
- `name` - Patient name
- `age` - Patient age
- `gender` - Male/Female/Other
- `contact` - Phone number
- `address` - Patient address
- `created_at` - Record creation timestamp

### patient_records table
- `id` - Primary key
- `patient_id` - Foreign key to patients table
- `symptoms` - JSON array of symptoms
- `prediction` - JSON array of disease predictions
- `temperature` - Body temperature
- `blood_pressure` - Blood pressure reading
- `respiratory_rate` - Breathing rate
- `o2_saturation` - Oxygen saturation
- `heart_rate` - Heart rate
- `height` - Patient height
- `weight` - Patient weight
- `date_created` - Consultation timestamp

## Usage

### Adding Patient Records
Use the existing API endpoints to add patient records:

```javascript
const response = await fetch('http://localhost/api/add_patient_record.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    patient_id: 1,
    symptoms: ["fever", "headache"],
    prediction: [{"disease": "Fever", "probability": 0.85}],
    temperature: 38.5,
    blood_pressure: "120/80",
    heart_rate: 85
  })
});
```

### Generating Reports
The Reports component automatically fetches and displays data. Users can:
1. View dashboard with real-time statistics
2. Generate custom reports with date filters
3. Export printable consultation summaries
4. View recent patient activity

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure your web server allows cross-origin requests
2. **Database Connection**: Check database credentials in `db.php`
3. **API Not Found**: Verify PHP files are in the correct web server directory
4. **No Data**: Run the database setup script to create sample data

### Error Handling
The system includes comprehensive error handling:
- API errors are displayed to users
- Database connection failures are logged
- Loading states prevent multiple requests
- Graceful fallbacks for missing data

## Security Notes
- Update database credentials for production
- Implement proper authentication for API endpoints
- Sanitize user inputs in production environment
- Use HTTPS in production

## Support
For issues or questions about the Reports system, check:
1. Browser console for JavaScript errors
2. PHP error logs for server-side issues
3. Database connection and query logs
4. Network tab for API request/response details