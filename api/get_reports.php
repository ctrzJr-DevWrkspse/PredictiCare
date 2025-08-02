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
        // Get consultation data grouped by symptoms/predictions with course information
        $sql = "SELECT 
                    pr.prediction,
                    pr.symptoms,
                    pr.course,
                    pr.consultation_type,
                    COUNT(*) as count,
                    DATE(pr.date_created) as consultation_date
                FROM patient_records pr
                WHERE pr.date_created BETWEEN ? AND ?
                GROUP BY pr.prediction, pr.symptoms, pr.course, pr.consultation_type, DATE(pr.date_created)
                ORDER BY consultation_date DESC, count DESC";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $consultationData = [];
        $symptomCounts = [];
        $courseCounts = [];
        
        while ($row = $result->fetch_assoc()) {
            $predictions = json_decode($row['prediction'], true);
            $symptoms = json_decode($row['symptoms'], true);
            $course = $row['course'] ?: 'others';
            
            // Initialize course count if not exists
            if (!isset($courseCounts[$course])) {
                $courseCounts[$course] = 0;
            }
            $courseCounts[$course] += $row['count'];
            
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
                'course' => $course,
                'consultation_type' => $row['consultation_type'],
                'count' => $row['count']
            ];
        }
        
        // Get course-wise breakdown
        $sql2 = "SELECT 
                    course,
                    consultation_type,
                    COUNT(*) as total_consultations,
                    COUNT(DISTINCT patient_id) as unique_patients
                FROM patient_records 
                WHERE date_created BETWEEN ? AND ?
                GROUP BY course, consultation_type
                ORDER BY course, consultation_type";
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("ss", $startDate, $endDate);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        
        $courseBreakdown = [];
        while ($row = $result2->fetch_assoc()) {
            $course = $row['course'] ?: 'others';
            if (!isset($courseBreakdown[$course])) {
                $courseBreakdown[$course] = [
                    'total_consultations' => 0,
                    'unique_patients' => 0,
                    'by_type' => []
                ];
            }
            $courseBreakdown[$course]['total_consultations'] += $row['total_consultations'];
            $courseBreakdown[$course]['unique_patients'] += $row['unique_patients'];
            $courseBreakdown[$course]['by_type'][$row['consultation_type']] = $row['total_consultations'];
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'consultations' => $consultationData,
                'symptom_counts' => $symptomCounts,
                'course_counts' => $courseCounts,
                'course_breakdown' => $courseBreakdown,
                'date_range' => ['start' => $startDate, 'end' => $endDate]
            ]
        ]);
        
    } elseif ($reportType === 'patient_stats') {
        // Get patient statistics with course breakdown
        $sql = "SELECT 
                    COUNT(DISTINCT pr.patient_id) as total_patients,
                    COUNT(*) as total_consultations,
                    AVG(pr.temperature) as avg_temperature,
                    AVG(pr.heart_rate) as avg_heart_rate,
                    AVG(pr.o2_saturation) as avg_o2_saturation,
                    pr.course
                FROM patient_records pr
                WHERE pr.date_created BETWEEN ? AND ?
                GROUP BY pr.course
                ORDER BY pr.course";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $courseStats = [];
        $overallStats = [
            'total_patients' => 0,
            'total_consultations' => 0,
            'avg_temperature' => 0,
            'avg_heart_rate' => 0,
            'avg_o2_saturation' => 0
        ];
        
        while ($row = $result->fetch_assoc()) {
            $course = $row['course'] ?: 'others';
            $courseStats[$course] = $row;
            
            $overallStats['total_patients'] += $row['total_patients'];
            $overallStats['total_consultations'] += $row['total_consultations'];
        }
        
        // Calculate overall averages
        if (count($courseStats) > 0) {
            $overallStats['avg_temperature'] = array_sum(array_column($courseStats, 'avg_temperature')) / count($courseStats);
            $overallStats['avg_heart_rate'] = array_sum(array_column($courseStats, 'avg_heart_rate')) / count($courseStats);
            $overallStats['avg_o2_saturation'] = array_sum(array_column($courseStats, 'avg_o2_saturation')) / count($courseStats);
        }
        
        // Get most common symptoms by course
        $sql2 = "SELECT pr.symptoms, pr.course, COUNT(*) as frequency 
                FROM patient_records pr
                WHERE pr.date_created BETWEEN ? AND ?
                GROUP BY pr.symptoms, pr.course 
                ORDER BY frequency DESC 
                LIMIT 20";
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("ss", $startDate, $endDate);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        
        $commonSymptomsByCourse = [];
        while ($row = $result2->fetch_assoc()) {
            $symptoms = json_decode($row['symptoms'], true);
            $course = $row['course'] ?: 'others';
            
            if (!isset($commonSymptomsByCourse[$course])) {
                $commonSymptomsByCourse[$course] = [];
            }
            
            if (is_array($symptoms)) {
                $commonSymptomsByCourse[$course][] = [
                    'symptoms' => $symptoms,
                    'frequency' => $row['frequency']
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'statistics' => $overallStats,
                'course_statistics' => $courseStats,
                'common_symptoms_by_course' => $commonSymptomsByCourse,
                'date_range' => ['start' => $startDate, 'end' => $endDate]
            ]
        ]);
        
    } elseif ($reportType === 'health_trends') {
        // Get health trends over time with course breakdown
        $sql = "SELECT 
                    DATE(pr.date_created) as date,
                    pr.course,
                    COUNT(*) as consultations,
                    AVG(pr.temperature) as avg_temp,
                    AVG(pr.heart_rate) as avg_hr,
                    AVG(pr.blood_pressure) as avg_bp
                FROM patient_records pr
                WHERE pr.date_created BETWEEN ? AND ?
                GROUP BY DATE(pr.date_created), pr.course
                ORDER BY date ASC, pr.course";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $trends = [];
        $trendsByCourse = [];
        
        while ($row = $result->fetch_assoc()) {
            $course = $row['course'] ?: 'others';
            
            if (!isset($trendsByCourse[$course])) {
                $trendsByCourse[$course] = [];
            }
            
            $trendsByCourse[$course][] = $row;
            $trends[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'trends' => $trends,
                'trends_by_course' => $trendsByCourse,
                'date_range' => ['start' => $startDate, 'end' => $endDate]
            ]
        ]);
        
    } else {
        // Default summary report with course information
        $sql = "SELECT 
                    COUNT(DISTINCT p.id) as unique_patients,
                    COUNT(pr.id) as total_records,
                    DATE(MIN(pr.date_created)) as first_record,
                    DATE(MAX(pr.date_created)) as last_record
                FROM patients p
                LEFT JOIN patient_records pr ON p.id = pr.patient_id";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $summary = $result->fetch_assoc();
        
        // Get course distribution
        $sql2 = "SELECT 
                    p.course,
                    COUNT(DISTINCT p.id) as student_count,
                    COUNT(pr.id) as consultation_count
                FROM patients p
                LEFT JOIN patient_records pr ON p.id = pr.patient_id
                GROUP BY p.course
                ORDER BY consultation_count DESC";
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        
        $courseDistribution = [];
        while ($row = $result2->fetch_assoc()) {
            $course = $row['course'] ?: 'others';
            $courseDistribution[$course] = $row;
        }
        
        // Get recent activity with course info
        $sql3 = "SELECT 
                    pr.patient_id,
                    pr.symptoms,
                    pr.prediction,
                    pr.course,
                    pr.date_created,
                    p.name as patient_name
                FROM patient_records pr
                LEFT JOIN patients p ON pr.patient_id = p.id
                ORDER BY pr.date_created DESC 
                LIMIT 10";
        
        $stmt3 = $conn->prepare($sql3);
        $stmt3->execute();
        $result3 = $stmt3->get_result();
        
        $recentActivity = [];
        while ($row = $result3->fetch_assoc()) {
            $row['symptoms'] = json_decode($row['symptoms'], true);
            $row['prediction'] = json_decode($row['prediction'], true);
            $recentActivity[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'summary' => $summary,
                'course_distribution' => $courseDistribution,
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
if (isset($stmt3)) $stmt3->close();
$conn->close();
?>