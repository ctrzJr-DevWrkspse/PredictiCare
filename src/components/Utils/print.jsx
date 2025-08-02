import React from 'react';

const Print = ({ reportData, isPreview = false, onPrint, onClose }) => {
  // Process actual database data into consultation format
  const processConsultationData = (dbData) => {
    // Define the complete consultation categories with codes
    const consultationCategories = [
      { code: 'A', complaint: 'Fever' },
      { code: 'B', complaint: 'Chill' },
      { code: 'C', complaint: 'Cough and colds' },
      { code: 'D', complaint: 'Sore throat' },
      { code: 'E', complaint: 'Difficulty of Breathing' },
      { code: 'F', complaint: 'Dysphagia' },
      { code: 'G', complaint: 'Headache' },
      { code: 'H', complaint: 'Dizziness' },
      { code: 'I', complaint: 'Eye Irritation/redness' },
      { code: 'J', complaint: 'Swelling eye lid' },
      { code: 'K', complaint: 'Ear pain' },
      { code: 'L', complaint: 'Otitis' },
      { code: 'M', complaint: 'Otitis/earache' },
      { code: 'N', complaint: 'Toothache' },
      { code: 'O', complaint: 'Stomachache' },
      { code: 'P', complaint: 'Nausea and vomiting' },
      { code: 'Q', complaint: 'Epigastric pain' },
      { code: 'R', complaint: 'Abdominal pain/Gastralgia' },
      { code: 'S', complaint: 'Indigestion/pain' },
      { code: 'T', complaint: 'Vomiting' },
      { code: 'U', complaint: 'Stomach ache' },
      { code: 'V', complaint: 'Appetite' },
      { code: 'W', complaint: 'Migraine' },
      { code: 'X', complaint: 'Shoulder Pain' },
      { code: 'Y', complaint: 'LBM/diarrhea' },
      { code: 'Z', complaint: 'Constipation' },
      { code: 'AA', complaint: 'Gastroenteritis' },
      { code: 'BB', complaint: 'Body Weakness' },
      { code: 'CC', complaint: 'Nape Pain' },
      { code: 'DD', complaint: 'Back Pain' },
      { code: 'EE', complaint: 'Rashes' },
      { code: 'FF', complaint: 'Skin Illness' },
      { code: 'GG', complaint: 'Laceration' },
      { code: 'HH', complaint: 'Foot pain' },
      { code: 'II', complaint: 'Leg pain' },
      { code: 'JJ', complaint: 'Infected wound' },
      { code: 'KK', complaint: 'Burn' },
      { code: 'LL', complaint: 'For BP' },
      { code: 'MM', complaint: 'Referral' },
      { code: 'NN', complaint: 'For FBS/RBS' },
      { code: 'OO', complaint: 'For Medicine' },
      { code: 'PP', complaint: 'PE for Seminar' },
      { code: 'QQ', complaint: 'PE for Employee' },
      { code: 'RR', complaint: 'PE for Students/ROTC/NSTP' },
      { code: 'SS', complaint: 'PE for ROTC' },
      { code: 'TT', complaint: 'PE for Extension/Practicum' },
      { code: 'UU', complaint: 'PE for NSTP' }
    ];

    // Map database diseases/symptoms to consultation codes
    const diseaseToCodeMap = {
      'fever': 'A',
      'chill': 'B', 
      'chills': 'B',
      'cough': 'C',
      'cold': 'C',
      'colds': 'C',
      'runny nose': 'C',
      'sore throat': 'D',
      'difficulty breathing': 'E',
      'breathing difficulty': 'E',
      'dysphagia': 'F',
      'headache': 'G',
      'dizziness': 'H',
      'eye irritation': 'I',
      'eye redness': 'I',
      'swelling eye': 'J',
      'ear pain': 'K',
      'otitis': 'L',
      'earache': 'M',
      'toothache': 'N',
      'stomachache': 'O',
      'stomach ache': 'U',
      'nausea': 'P',
      'vomiting': 'T',
      'epigastric pain': 'Q',
      'abdominal pain': 'R',
      'gastralgia': 'R',
      'stomach pain': 'R',
      'indigestion': 'S',
      'appetite': 'V',
      'migraine': 'W',
      'shoulder pain': 'X',
      'diarrhea': 'Y',
      'lbm': 'Y',
      'constipation': 'Z',
      'gastroenteritis': 'AA',
      'body weakness': 'BB',
      'weakness': 'BB',
      'nape pain': 'CC',
      'back pain': 'DD',
      'rashes': 'EE',
      'rash': 'EE',
      'skin illness': 'FF',
      'skin problems': 'FF',
      'skin rash': 'EE',
      'itching': 'FF',
      'laceration': 'GG',
      'foot pain': 'HH',
      'leg pain': 'II',
      'infected wound': 'JJ',
      'burn': 'KK',
      'blood pressure': 'LL',
      'bp': 'LL',
      'high blood pressure': 'LL',
      'referral': 'MM',
      'fbs': 'NN',
      'rbs': 'NN',
      'medicine': 'OO',
      'physical examination': 'QQ',
      'pe': 'QQ',
      'medical exam': 'QQ',
      'rotc': 'SS',
      'rotc exam': 'SS',
      'rotc medical': 'SS',
      'nstp': 'UU',
      'seminar': 'PP',
      'extension': 'TT',
      'practicum': 'TT'
    };

    // Initialize counts for each category with course breakdown
    const consultationCounts = {};
    consultationCategories.forEach(cat => {
      consultationCounts[cat.code] = { 
        ...cat, 
        courses: {
          'BSIT': 0,      // GR (Graduate School - using BSIT as placeholder)
          'BS MATH': 0,   // EM (Education Math)
          'BASS': 0,      // ED (Education - using BASS as placeholder)
          'BSIT': 0,      // BS (using BSIT)
          'BAEL': 0,      // BL
          'BAP': 0,       // BD (using BAP as placeholder)
          'BPA': 0,       // BP
          'BSBA': 0,      // BA
          'BS ENTREP': 0, // EN
          'BEED': 0,      // BE
          'BSED': 0,      // SE
          'BPED': 0,      // PE
          'SHS': 0,       // SH
          'JHS': 0,       // JH
          'PERSONNEL': 0  // ST (Staff/Personnel)
        },
        others: 0,
        total: 0 
      };
    });

    // Process database records
    if (dbData && dbData.consultations) {
      dbData.consultations.forEach(record => {
        // Process symptoms
        if (record.symptoms && Array.isArray(record.symptoms)) {
          record.symptoms.forEach(symptom => {
            const normalizedSymptom = symptom.toLowerCase().trim();
            const code = diseaseToCodeMap[normalizedSymptom];
            if (code && consultationCounts[code]) {
              const count = record.count || 1;
              const course = record.course || 'others';
              
              if (consultationCounts[code].courses[course] !== undefined) {
                consultationCounts[code].courses[course] += count;
              } else {
                consultationCounts[code].others += count;
              }
              consultationCounts[code].total += count;
            }
          });
        }

        // Process predictions/diseases
        if (record.prediction && Array.isArray(record.prediction)) {
          record.prediction.forEach(pred => {
            if (pred.disease) {
              const normalizedDisease = pred.disease.toLowerCase().trim();
              const code = diseaseToCodeMap[normalizedDisease];
              if (code && consultationCounts[code]) {
                const count = record.count || 1;
                const course = record.course || 'others';
                
                if (consultationCounts[code].courses[course] !== undefined) {
                  consultationCounts[code].courses[course] += count;
                } else {
                  consultationCounts[code].others += count;
                }
                consultationCounts[code].total += count;
              }
            }
          });
        }
      });
    }

    // Process symptom counts if available
    if (dbData && dbData.symptom_counts) {
      Object.keys(dbData.symptom_counts).forEach(disease => {
        const normalizedDisease = disease.toLowerCase().trim();
        const code = diseaseToCodeMap[normalizedDisease];
        if (code && consultationCounts[code]) {
          const count = dbData.symptom_counts[disease];
          // Distribute proportionally across courses if no specific course data
          consultationCounts[code].others += count;
          consultationCounts[code].total += count;
        }
      });
    }

    // Convert to array format for display
    return consultationCategories.map(cat => ({
      code: cat.code,
      complaint: cat.complaint,
      courses: consultationCounts[cat.code].courses,
      personnel: consultationCounts[cat.code].courses['PERSONNEL'],
      others: consultationCounts[cat.code].others,
      total: consultationCounts[cat.code].total
    }));
  };

  // Calculate department totals from actual data
  const calculateDepartmentTotals = (consultationData) => {
    const totals = {
      bsit: 0,        // GR column
      bsMath: 0,      // EM column  
      bass: 0,        // ED column
      bsit2: 0,       // BS column (duplicate for now)
      bael: 0,        // BL column
      bap: 0,         // BD column
      bpa: 0,         // BP column
      bsba: 0,        // BA column
      bsEntrep: 0,    // EN column
      beed: 0,        // BE column
      bsed: 0,        // SE column
      bped: 0,        // PE column
      shs: 0,         // SH column
      jhs: 0,         // JH column
      personnel: 0,   // ST column
      others: 0,      // OT column
      total: 0
    };

    consultationData.forEach(item => {
      totals.bsit += item.courses['BSIT'] || 0;
      totals.bsMath += item.courses['BS MATH'] || 0;
      totals.bass += item.courses['BASS'] || 0;
      totals.bael += item.courses['BAEL'] || 0;
      totals.bap += item.courses['BAP'] || 0;
      totals.bpa += item.courses['BPA'] || 0;
      totals.bsba += item.courses['BSBA'] || 0;
      totals.bsEntrep += item.courses['BS ENTREP'] || 0;
      totals.beed += item.courses['BEED'] || 0;
      totals.bsed += item.courses['BSED'] || 0;
      totals.bped += item.courses['BPED'] || 0;
      totals.shs += item.courses['SHS'] || 0;
      totals.jhs += item.courses['JHS'] || 0;
      totals.personnel += item.courses['PERSONNEL'] || 0;
      totals.others += item.others || 0;
      totals.total += item.total || 0;
    });

    return totals;
  };

  // Process the data
  const consultationData = reportData ? processConsultationData(reportData) : [];
  const totals = calculateDepartmentTotals(consultationData);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white font-sans">
      {/* Preview Controls - Only show in preview mode */}
      {isPreview && (
        <div className="no-print bg-light p-3 mb-4 rounded border">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Report Preview</h5>
            <div>
              <button 
                className="btn btn-primary me-2"
                onClick={handlePrint}
              >
                <i className="fas fa-print me-1"></i>
                Print Report
              </button>
              <button 
                className="btn btn-secondary"
                onClick={onClose}
              >
                <i className="fas fa-times me-1"></i>
                Close Preview
              </button>
            </div>
          </div>
          <small className="text-muted">
            Review the report below and click "Print Report" when ready.
            {reportData && reportData.date_range && (
              <span> | Date Range: {reportData.date_range.start} to {reportData.date_range.end}</span>
            )}
          </small>
        </div>
      )}

      {/* Header - More Compact */}
      <div className="text-center mb-1">
        <div className="d-flex justify-content-center align-items-center mb-1">
          <div className="me-2" style={{
            width: '16px', 
            height: '16px', 
            border: '1px solid #666', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '6px',
            fontWeight: 'bold'
          }}>
            ISPSC
          </div>
          <div>
            <div style={{fontSize: '8px', fontWeight: 'bold'}}>
              ILOCOS SUR POLYTECHNIC STATE COLLEGE
            </div>
            <div style={{fontSize: '7px'}}>
              Tagudin Campus - Health Services Consultation Report
            </div>
            {reportData && reportData.date_range && (
              <div style={{fontSize: '6px', color: '#666'}}>
                Period: {new Date(reportData.date_range.start).toLocaleDateString()} - {new Date(reportData.date_range.end).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table with Maximum Compactness */}
      <div className="w-100 overflow-hidden">
        <table className="table table-bordered table-sm" style={{
          fontSize: '6px',
          lineHeight: '1',
          tableLayout: 'fixed',
          width: '100%'
        }}>
          <colgroup>
            <col style={{width: '25%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.2%'}} />
            <col style={{width: '4.5%'}} />
          </colgroup>
          <thead>
            <tr className="table-light">
              <th className="text-center fw-bold p-1" style={{fontSize: '6px'}}>COMPLAINTS</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>IT</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>MTH</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>ASS</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>IT2</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>AEL</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>AP</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>PA</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>BA</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>ENT</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>EED</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>SED</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>PED</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>SHS</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>JHS</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>PER</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>OTH</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '4px'}}>TOT</th>
            </tr>
            <tr className="table-warning">
              <td className="text-center fw-bold p-1" style={{fontSize: '5px'}}>REASON FOR CONSULT</td>
              {Array(17).fill(null).map((_, i) => (
                <td key={i} className="p-1"></td>
              ))}
            </tr>
          </thead>
          <tbody>
            {consultationData.map((row, index) => (
              <tr key={index}>
                <td className="text-start p-1" style={{
                  fontSize: '5px', 
                  lineHeight: '1.1', 
                  wordBreak: 'break-word'
                }}>
                  <span className="fw-bold">{row.code}.</span> {row.complaint}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BSIT'] > 0 ? row.courses['BSIT'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BS MATH'] > 0 ? row.courses['BS MATH'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BASS'] > 0 ? row.courses['BASS'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BSIT'] > 0 ? Math.floor(row.courses['BSIT'] / 2) : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BAEL'] > 0 ? row.courses['BAEL'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BAP'] > 0 ? row.courses['BAP'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BPA'] > 0 ? row.courses['BPA'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BSBA'] > 0 ? row.courses['BSBA'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BS ENTREP'] > 0 ? row.courses['BS ENTREP'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BEED'] > 0 ? row.courses['BEED'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BSED'] > 0 ? row.courses['BSED'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['BPED'] > 0 ? row.courses['BPED'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['SHS'] > 0 ? row.courses['SHS'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['JHS'] > 0 ? row.courses['JHS'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.courses['PERSONNEL'] > 0 ? row.courses['PERSONNEL'] : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.others > 0 ? row.others : ''}
                </td>
                <td className="text-center fw-bold p-1" style={{fontSize: '5px'}}>
                  {row.total > 0 ? row.total : ''}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="table-danger fw-bold">
              <td className="text-center fw-bold p-1" style={{fontSize: '5px'}}>TOTAL</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsit}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsMath}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bass}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsit2}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bael}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bap}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bpa}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsba}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsEntrep}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.beed}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsed}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bped}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.shs}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.jhs}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.personnel}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.others}</td>
              <td className="text-center fw-bold p-1" style={{fontSize: '5px'}}>{totals.total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer - Compact */}
      <div className="mt-2 d-flex justify-content-between" style={{fontSize: '6px'}}>
        <div style={{width: '60%'}}>
          <div className="fw-bold">II. PHOTO DOCUMENTATION and other SUPPORTING DOCUMENTS</div>
          <div>NOTE: Photo documentation attach shall be given caption</div>
        </div>
        <div className="text-end" style={{width: '35%'}}>
          <div>Report Date: {new Date().toLocaleDateString()}</div>
          <div className="mt-1">
            <div>Prepared by: _______________</div>
            <div style={{fontSize: '5px'}}>Health Services Officer</div>
          </div>
        </div>
      </div>

      {/* Print Button - Hidden on Print and in Preview Mode */}
      {!isPreview && (
        <div className="mt-3 text-center no-print">
          <button 
            onClick={handlePrint}
            className="btn btn-primary"
          >
            <i className="fas fa-print me-1"></i>
            Print Document
          </button>
        </div>
      )}

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.4in 0.3in;
          }
          
          .no-print {
            display: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            font-family: Arial, sans-serif !important;
            font-size: 4px !important;
            line-height: 1 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          table {
            width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            font-size: 4px !important;
            page-break-inside: avoid;
          }
          
          th, td {
            border: 1px solid black !important;
            padding: 1px !important;
            font-size: 4px !important;
            line-height: 1 !important;
            overflow: hidden !important;
            word-wrap: break-word !important;
          }
          
          tr {
            page-break-inside: avoid !important;
          }
        }
        
        .no-print {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Print;