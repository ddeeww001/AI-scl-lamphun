// src/components/Station/AddSensorModal.tsx
import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface AddSensorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; 
}

const AddSensorModal: React.FC<AddSensorModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', kpiKey: '' });
  const [errors, setErrors] = useState({ name: false, kpiKey: false });
  const [submitStatus, setSubmitStatus] = useState<'form' | 'success' | 'error'>('form');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const newErrors = {
      name: formData.name.trim() === '',
      kpiKey: formData.kpiKey.trim() === ''
    };
    
    setErrors(newErrors);

    if (newErrors.name || newErrors.kpiKey) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('form'); 
        setFormData({ name: '', kpiKey: '' });
        onSuccess();
      }, 2000);
    } catch (err) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('form'), 2000);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', width: '380px', color: '#111827', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {submitStatus === 'form' && (
          <div style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Add Sensor</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Sensor Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`, outline: 'none', boxSizing: 'border-box' }} />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0 }}>ต้องระบุช่องนี้!</p>}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>KPI key</label>
              <input type="text" value={formData.kpiKey} onChange={(e) => setFormData({ ...formData, kpiKey: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${errors.kpiKey ? '#ef4444' : '#d1d5db'}`, outline: 'none', boxSizing: 'border-box' }} />
              {errors.kpiKey && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0 }}>ต้องระบุช่องนี้!</p>}
            </div>

            <button onClick={handleSubmit} style={{ width: '100%', padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Create</button>
            <button onClick={onClose} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#6b7280', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '14px' }}>Cancel</button>
          </div>
        )}

        {submitStatus === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}><CheckCircle color="#10b981" size={64} style={{ marginBottom: '16px' }} /><h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Add Sensor สำเร็จ</h2></div>
        )}

        {submitStatus === 'error' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}><XCircle color="#ef4444" size={64} style={{ marginBottom: '16px' }} /><h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Add Sensor ผิดพลาด</h2></div>
        )}

      </div>
    </div>
  );
};

export default AddSensorModal;