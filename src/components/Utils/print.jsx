import React from 'react';

const Print = ({ reportData, isPreview = false, onPrint, onClose }) => {
  // Default data if no reportData is provided
  const consultationData = reportData?.consultationData || [
    { code: 'A', complaint: 'Fever', personnel: 1, total: 1 },
    { code: 'B', complaint: 'Chill', personnel: 0, total: 0 },
    { code: 'C', complaint: 'Cough and colds', personnel: 6, total: 6 },
    { code: 'D', complaint: 'Sore throat', personnel: 0, total: 0 },
    { code: 'E', complaint: 'Difficulty of Breathing', personnel: 0, total: 0 },
    { code: 'F', complaint: 'Dysphagia', personnel: 0, total: 0 },
    { code: 'G', complaint: 'Headache', personnel: 1, total: 1 },
    { code: 'H', complaint: 'Dizziness', personnel: 0, total: 0 },
    { code: 'I', complaint: 'Eye Irritation/redness', personnel: 0, total: 0 },
    { code: 'J', complaint: 'Swelling eye lid', personnel: 0, total: 0 },
    { code: 'K', complaint: 'Ear pain', personnel: 0, total: 0 },
    { code: 'L', complaint: 'Otitis', personnel: 0, total: 0 },
    { code: 'M', complaint: 'Otitis/earache', personnel: 0, total: 0 },
    { code: 'N', complaint: 'Toothache', personnel: 0, total: 0 },
    { code: 'O', complaint: 'Stomachache', personnel: 0, total: 0 },
    { code: 'P', complaint: 'Nausea and vomiting', personnel: 0, total: 0 },
    { code: 'Q', complaint: 'Epigastric pain', personnel: 0, total: 0 },
    { code: 'R', complaint: 'Abdominal pain/Gastralgia', personnel: 1, total: 1 },
    { code: 'S', complaint: 'Indigestion/pain', personnel: 0, total: 0 },
    { code: 'T', complaint: 'Vomiting', personnel: 0, total: 0 },
    { code: 'U', complaint: 'Stomach ache', personnel: 0, total: 0 },
    { code: 'V', complaint: 'Appetite', personnel: 0, total: 0 },
    { code: 'W', complaint: 'Migraine', personnel: 0, total: 0 },
    { code: 'X', complaint: 'Shoulder Pain', personnel: 0, total: 0 },
    { code: 'Y', complaint: 'LBM/diarrhea', personnel: 2, total: 2 },
    { code: 'Z', complaint: 'Constipation', personnel: 0, total: 0 },
    { code: 'AA', complaint: 'Gastroenteritis', personnel: 0, total: 0 },
    { code: 'BB', complaint: 'Body Weakness', personnel: 0, total: 0 },
    { code: 'CC', complaint: 'Nape Pain', personnel: 0, total: 0 },
    { code: 'DD', complaint: 'Back Pain', personnel: 0, total: 0 },
    { code: 'EE', complaint: 'Rashes', personnel: 0, total: 0 },
    { code: 'FF', complaint: 'Skin Illness', personnel: 1, total: 1 },
    { code: 'GG', complaint: 'Laceration', personnel: 0, total: 0 },
    { code: 'HH', complaint: 'Foot pain', personnel: 2, total: 2 },
    { code: 'II', complaint: 'Leg pain', personnel: 0, total: 0 },
    { code: 'JJ', complaint: 'Infected wound', personnel: 0, total: 0 },
    { code: 'KK', complaint: 'Burn', personnel: 0, total: 0 },
    { code: 'LL', complaint: 'For BP', personnel: 13, total: 13 },
    { code: 'MM', complaint: 'Referral', personnel: 0, total: 0 },
    { code: 'NN', complaint: 'For FBS/RBS', personnel: 0, total: 0 },
    { code: 'OO', complaint: 'For Medicine', personnel: 0, total: 0 },
    { code: 'PP', complaint: 'PE for Seminar', personnel: 0, total: 0 },
    { code: 'QQ', complaint: 'PE for Employee', personnel: 238, total: 238 },
    { code: 'RR', complaint: 'PE for Students/ROTC/NSTP', personnel: 0, total: 0 },
    { code: 'SS', complaint: 'PE for ROTC', personnel: 4, total: 4 },
    { code: 'TT', complaint: 'PE for Extension/Practicum', personnel: 0, total: 0 },
    { code: 'UU', complaint: 'PE for NSTP', personnel: 0, total: 0 }
  ];

  const totals = reportData?.totals || {
    gradSchool: 6,
    edMath: 116,
    edip: 161,
    base: 21,
    bael: 53,
    bad: 38,
    bpa: 159,
    bsba: 36,
    beEntep: 21,
    beed: 76,
    bsed: 30,
    bped: 0,
    shs: 0,
    jhs: 0,
    personnel: 31,
    others: 0,
    total: 748
  };

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
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>GR</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>EM</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>ED</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>BS</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>BL</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>BD</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>BP</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>BA</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>EN</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>BE</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>SE</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>PE</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>SH</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>JH</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>ST</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>OT</th>
              <th className="text-center fw-bold table-danger p-1" style={{fontSize: '5px'}}>TOT</th>
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
                  {row.code === 'QQ' ? '6' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '116' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '161' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '21' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '53' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '38' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '159' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '36' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '21' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '76' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.code === 'QQ' ? '30' : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}></td>
                <td className="text-center p-1" style={{fontSize: '5px'}}></td>
                <td className="text-center p-1" style={{fontSize: '5px'}}></td>
                <td className="text-center p-1" style={{fontSize: '5px'}}>
                  {row.personnel > 0 ? row.personnel : ''}
                </td>
                <td className="text-center p-1" style={{fontSize: '5px'}}></td>
                <td className="text-center fw-bold p-1" style={{fontSize: '5px'}}>
                  {row.total > 0 ? row.total : ''}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="table-danger fw-bold">
              <td className="text-center fw-bold p-1" style={{fontSize: '5px'}}>TOTAL</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.gradSchool}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.edMath}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.edip}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.base}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bael}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bad}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bpa}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.bsba}</td>
              <td className="text-center p-1" style={{fontSize: '5px'}}>{totals.beEntep}</td>
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