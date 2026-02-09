import { useState } from 'react'
import WaterLevelChart from './component/WaterLevelChart'; 
import DataCard from './component/DataCard';
import StatusCard from './component/StatusCard';
import Header from './component/Header';

function App() {
  return (
    <>
      <Header />
      
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-h1" style={{ color: 'var(--color-brand)', marginBottom: '8px' }}>
          Lamphun Smart Water
        </h1>
        <p className="text-default" style={{ color: 'var(--text-secondary)' }}>
          ระบบบริหารจัดการน้ำและแจ้งเตือนภัยพิบัติอัจฉริยะ อบจ.ลำพูน
        </p>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
        
        {/* ใบที่ 1 */}
        <DataCard 
            title="จำนวนสถานี" 
            value={1} 
            unit="สถานี" 
            theme="orange" 
        />
      {/* ใบที่ 2 */}
      <DataCard 
       title="ระดับน้ำ" 
                  value="150.250" 
                  unit="เมตร" 
                  theme="blue" 
              />
        {/* ใบที่ 3 */}
       <DataCard 
       title="ปริมาณน้ำฝนสะสม" 
       value="50.568" 
       unit="มิลลิเมตร/ชม." 
                  theme="blue" 
              />
              
            </div>
      {/* --- พื้นที่วางกราฟ --- */}
      <div style={{ display: 'grid', gap: '24px' }}>
      <WaterLevelChart />
      </div>
    </>
  );
}

export default App