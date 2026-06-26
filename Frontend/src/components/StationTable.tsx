// src/components/Station/StationTable.tsx
import React from 'react';
import { Settings } from 'lucide-react'; // เปลี่ยนจาก MoreHorizontal เป็นฟันเฟือง
import { type StationData } from './Station.ts'; 

interface StationTableProps {
  stations: StationData[]; 
}

const StationTable: React.FC<StationTableProps> = ({ stations }) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'center', color: 'var(--color-text-primary)' }}>
        
        {/* Header - ตามสไตล์ Dark UI ในภาพ */}
        <thead>
          <tr style={{ color: 'var(--color-text-secondary)', fontSize: '14px', borderBottom: '1px solid var(--color-border-line)' }}>
            <th style={{ padding: '12px', textAlign: 'left', width: '30%' }}>ชื่อสถานี</th>
            <th style={{ padding: '12px' }}>เวลา</th>
            {/* คอลัมน์ไอคอนสถานะ */}
            <th style={{ padding: '12px' }}>📶</th>
            <th style={{ padding: '12px' }}>☁️</th>
            <th style={{ padding: '12px' }}>ระดับน้ำ(เมตร)</th>
            <th style={{ padding: '12px' }}>ปริมาณน้ำฝน(มิลลิเมตร/ชั่วโมง)</th>
          </tr>
        </thead>

        {/* Body - ทำแถวแบบ Capsule โค้งๆ */}
        <tbody style={{ fontSize: '14px', fontWeight: 500 }}>
          {stations.length > 0 ? (
            stations.map((item, index) => (
              <tr 
                key={item.id || index} 
                style={{ backgroundColor: 'var(--color-bg-surface)' }} // พื้นหลังแถวสีเข้ม
              >
                {/* ชื่อสถานี + ไอคอนฟันเฟือง */}
                <td style={{ padding: '16px 20px', textAlign: 'left', borderRadius: '24px 0 0 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Settings size={18} style={{ color: 'var(--color-text-secondary)', cursor: 'pointer' }} />
                  {item.name}
                </td>
                
                {/* เวลา */}
                <td style={{ padding: '16px 0' }}>11:00</td>
                
                {/* ไอคอนสัญญาณ (ตัวอย่างโชว์สีตามสถานะ) */}
                <td style={{ padding: '16px 0' }}>
                   <span style={{ 
                     display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                     backgroundColor: item.status === 'normal' ? 'var(--color-status-normal)' : (item.status === 'warning' ? 'var(--color-status-warning)' : 'var(--color-status-critical)') 
                   }}></span>
                </td>
                <td style={{ padding: '16px 0' }}>
                   <span style={{ 
                     display: 'inline-block', width: '12px', height: '8px', borderRadius: '4px',
                     backgroundColor: item.status === 'normal' ? 'var(--color-status-normal)' : (item.status === 'warning' ? 'var(--color-status-warning)' : 'var(--color-status-critical)') 
                   }}></span>
                </td>

                {/* ค่าระดับน้ำ (font ตัวเลข) */}
                <td style={{ padding: '16px 0', fontFamily: 'var(--font-data)' }}>
                  <span style={{ color: item.status === 'critical' ? 'var(--color-status-critical)' : (item.status === 'warning' ? 'var(--color-status-warning)' : 'var(--color-status-normal)') }}>
                     {item.waterLevel || '150.250'}
                  </span>
                </td>
                
                {/* ค่าฝน (font ตัวเลข) */}
                <td style={{ padding: '16px 0', fontFamily: 'var(--font-data)', borderRadius: '0 24px 24px 0', color: 'var(--color-text-secondary)' }}>
                  {item.rainfall || '50.555'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                ไม่มีข้อมูลสถานี
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StationTable;