import React, { useEffect } from 'react';

const Print = ({ reportData }) => {
  // Auto-print when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="bg-white font-sans">
      {/* Header - More Compact */}
      <div className="text-center mb-1">
        <div className="flex items-center justify-center mb-1">
          <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center mr-1 text-[4px] font-bold">
            ISPSC
          </div>
          <div>
            <div className="text-[6px] font-bold">ILOCOS SUR POLYTECHNIC STATE COLLEGE</div>
            <div className="text-[5px]">Tagudin Campus - Health Services Consultation Report</div>
          </div>
        </div>
      </div>

      {/* Table with Maximum Compactness */}
      <div className="w-full overflow-hidden">
        <table className="w-full border-collapse text-[4px]" style={{tableLayout: 'fixed'}}>
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
            <tr className="bg-gray-100">
              <th className="border border-black text-center font-bold text-[4px]" style={{padding: '0.5px', lineHeight: '1'}}>COMPLAINTS</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>GR</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>EM</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>ED</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>BS</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>BL</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>BD</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>BP</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>BA</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>EN</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>BE</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>SE</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>PE</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>SH</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>JH</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>ST</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>OT</th>
              <th className="border border-black text-center font-bold bg-red-100 text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>TOT</th>
            </tr>
            <tr className="bg-yellow-100">
              <td className="border border-black text-center font-bold text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>REASON FOR CONSULT</td>
              {Array(17).fill(null).map((_, i) => (
                <td key={i} className="border border-black" style={{padding: '0.5px'}}></td>
              ))}
            </tr>
          </thead>
          <tbody>
            {consultationData.map((row, index) => (
              <tr key={index}>
                <td className="border border-black text-left text-[3px]" style={{padding: '0.5px', lineHeight: '1.1', wordBreak: 'break-word'}}>
                  <span className="font-bold">{row.code}.</span> {row.complaint}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '6' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '116' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '161' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '21' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '53' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '38' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '159' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '36' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '21' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '76' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.code === 'QQ' ? '30' : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}></td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}></td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}></td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.personnel > 0 ? row.personnel : ''}
                </td>
                <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}></td>
                <td className="border border-black text-center text-[3px] font-bold" style={{padding: '0.5px', lineHeight: '1'}}>
                  {row.total > 0 ? row.total : ''}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-red-100 font-bold">
              <td className="border border-black text-center text-[3px] font-bold" style={{padding: '0.5px', lineHeight: '1'}}>TOTAL</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.gradSchool}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.edMath}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.edip}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.base}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.bael}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.bad}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.bpa}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.bsba}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.beEntep}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.beed}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.bsed}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.bped}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.shs}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.jhs}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.personnel}</td>
              <td className="border border-black text-center text-[3px]" style={{padding: '0.5px', lineHeight: '1'}}>{totals.others}</td>
              <td className="border border-black text-center text-[3px] font-bold" style={{padding: '0.5px', lineHeight: '1'}}>{totals.total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer - Compact */}
      <div className="mt-1 text-[4px] flex justify-between">
        <div style={{width: '60%'}}>
          <div className="font-bold">II. PHOTO DOCUMENTATION and other SUPPORTING DOCUMENTS</div>
          <div>NOTE: Photo documentation attach shall be given caption</div>
        </div>
        <div className="text-right" style={{width: '35%'}}>
          <div>Report Date: {new Date().toLocaleDateString()}</div>
          <div className="mt-1">
            <div>Prepared by: _______________</div>
            <div className="text-[3px]">Health Services Officer</div>
          </div>
        </div>
      </div>

      {/* Print Button - Hidden on Print */}
      <div className="mt-2 text-center print:hidden">
        <button 
          onClick={() => window.print()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Document
        </button>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.4in 0.3in;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            font-family: Arial, sans-serif !important;
            font-size: 3px !important;
            line-height: 1 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          table {
            width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            font-size: 3px !important;
            page-break-inside: avoid;
          }
          
          th, td {
            border: 0.5px solid black !important;
            padding: 0.5px !important;
            font-size: 3px !important;
            line-height: 1 !important;
            overflow: hidden !important;
            word-wrap: break-word !important;
          }
          
          tr {
            page-break-inside: avoid !important;
          }
          
          .text-\\[6px\\] {
            font-size: 5px !important;
          }
          
          .text-\\[5px\\] {
            font-size: 4px !important;
          }
          
          .text-\\[4px\\] {
            font-size: 3px !important;
          }
          
          .text-\\[3px\\] {
            font-size: 3px !important;
          }
          
          .w-4 {
            width: 12px !important;
            height: 12px !important;
            font-size: 3px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Print;