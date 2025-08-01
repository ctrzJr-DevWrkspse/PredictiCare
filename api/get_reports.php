<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

try {
    // Get report type from query parameter
    $reportType = isset($_GET['type']) ? $_GET['type'] : 'summary';
    $dateRange = isset($_GET['range']) ? $_GET['range'] : '30';

    // Calculate date range
    $endDate = date('Y-m-d');
    $startDate = date('Y-m-d', strtotime("-{$dateRange} days"));

    if ($reportType === 'consultation_summary') {
        // Get consultation data grouped by symptoms/predictions
        $sql = "SELECT 
                    prediction,
                    symptoms,
                    COUNT(*) as count,
                    DATE(date_created) as consultation_date
                FROM patient_records 
                WHERE date_created BETWEEN ? AND ?
                GROUP BY prediction, symptoms, DATE(date_created)
                ORDER BY consultation_date DESC, count DESC";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $consultationData = [];
        $symptomCounts = [];
        
        while ($row = $result->fetch_assoc()) {
            $predictions = json_decode($row['prediction'], true);
            $symptoms = json_decode($row['symptoms'], true);
            
            if (is_array($predictions)) {
                foreach ($predictions as $prediction) {
                    if (isset($prediction['disease'])) {
                        $disease = $prediction['disease'];
                        if (!isset($symptomCounts[$disease])) {
                            $symptomCounts[$disease] = 0;
                        }
                        $symptomCounts[$disease] += $row['count'];
                    }
                }
            }
            
            $consultationData[] = [
                'date' => $row['consultation_date'],
                'prediction' => $predictions,
                'symptoms' => $symptoms,
                'count' => $row['count']
            ];
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'consultations' => $consultationData,
                'symptom_counts' => $symptomCounts,
                'date_range' => ['start' => $startDate, 'end' => $endDate]
            ]
        ]);
        
    } elseif ($reportType === 'patient_stats') {
        // Get patient statistics
        $sql = "SELECT 
                    COUNT(DISTINCT patient_id) as total_patients,
                    COUNT(*) as total_consultations,
                    AVG(temperature) as avg_temperature,
                    AVG(heart_rate) as avg_heart_rate,
                    AVG(o2_saturation) as avg_o2_saturation
                FROM patient_records 
                WHERE date_created BETWEEN ? AND ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        $stats = $result->fetch_assoc();
        
        // Get most common symptoms
        $sql2 = "SELECT symptoms, COUNT(*) as frequency 
                FROM patient_records 
                WHERE date_created BETWEEN ? AND ?
                GROUP BY symptoms 
                ORDER BY frequency DESC 
                LIMIT 10";
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("ss", $startDate, $endDate);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        
        $commonSymptoms = [];
        while ($row = $result2->fetch_assoc()) {
            $symptoms = json_decode($row['symptoms'], true);
            if (is_array($symptoms)) {
                $commonSymptoms[] = [
                    'symptoms' => $symptoms,
                    'frequency' => $row['frequency']
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'statistics' => $stats,
                'common_symptoms' => $commonSymptoms,
                'date_range' => ['start' => $startDate, 'end' => $endDate]
            ]
        ]);
        
    } elseif ($reportType === 'health_trends') {
        // Get health trends over time
        $sql = "SELECT 
                    DATE(date_created) as date,
                    COUNT(*) as consultations,
                    AVG(temperature) as avg_temp,
                    AVG(heart_rate) as avg_hr,
                    AVG(blood_pressure) as avg_bp
                FROM patient_records 
                WHERE date_created BETWEEN ? AND ?
                GROUP BY DATE(date_created)
                ORDER BY date ASC";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $trends = [];
        while ($row = $result->fetch_assoc()) {
            $trends[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'trends' => $trends,
                'date_range' => ['start' => $startDate, 'end' => $endDate]
            ]
        ]);
        
    } else {
        // Default summary report
        $sql = "SELECT 
                    COUNT(DISTINCT patient_id) as unique_patients,
                    COUNT(*) as total_records,
                    DATE(MIN(date_created)) as first_record,
                    DATE(MAX(date_created)) as last_record
                FROM patient_records";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $summary = $result->fetch_assoc();
        
        // Get recent activity
        $sql2 = "SELECT 
                    patient_id,
                    symptoms,
                    prediction,
                    date_created
                FROM patient_records 
                ORDER BY date_created DESC 
                LIMIT 10";
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        
        $recentActivity = [];
        while ($row = $result2->fetch_assoc()) {
            $row['symptoms'] = json_decode($row['symptoms'], true);
            $row['prediction'] = json_decode($row['prediction'], true);
            $recentActivity[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'summary' => $summary,
                'recent_activity' => $recentActivity
            ]
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

if (isset($stmt)) $stmt->close();
if (isset($stmt2)) $stmt2->close();
$conn->close();
?>