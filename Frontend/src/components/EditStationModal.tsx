// src/components/Station/EditStationModal.tsx
import React, { useState, useEffect } from 'react';
import { type StationData } from './Station';

interface EditStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: StationData | null; 
  onSave: (stationId: string, newThreshold: string) => void; 
}

const EditStationModal: React.FC<EditStationModalProps> = ({ isOpen, onClose, station, onSave }) => {
  const [threshold, setThreshold] = useState<string>('');

  useEffect(() => {
    if (station) {
      setThreshold(station.alertThreshold || '');
    }
  }, [station]);

  if (!isOpen || !station) return null;

  const handleSave = () => {
    if (threshold.trim() === '' || isNaN(Number(threshold))) {
      alert("กรุณาระบุตัวเลขระดับน้ำแจ้งเตือนให้ถูกต้อง");
      return;
    }
    
    onSave(station.id!, threshold);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', width: '380px', color: '#111827' }}>
        <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>ตั้งค่าสถานี: {station.name}</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>ระดับน้ำแจ้งเตือน (Threshold)</label>
          <input type="number" placeholder="เช่น 150.5" value={threshold} onChange={(e) => setThreshold(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <button onClick={handleSave} style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>บันทึกการตั้งค่า</button>
        <button onClick={onClose} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#6b7280', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '14px' }}>ยกเลิก</button>
      </div>
    </div>
  );
};

export default EditStationModal;