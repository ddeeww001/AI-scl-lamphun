import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react'; // Import icon จาก Lucide

// กำหนดว่า Modal นี้รับ Props อะไรมาจากหน้า Settings บ้าง
interface AddSensorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // เอาไว้บอกหน้าหลักว่าเพิ่มเสร็จแล้ว ให้โหลดตารางใหม่
}

const AddSensorModal: React.FC<AddSensorModalProps> = ({ isOpen, onClose, onSuccess }) => {
  // 1. Logic จัดการข้อมูลฟอร์ม
  const [formData, setFormData] = useState({ name: '', kpiKey: '' });
  
  // 2. Logic จัดการ Error (ข้อความตัวแดงตอนกรอกไม่ครบ)
  const [errors, setErrors] = useState({ name: false, kpiKey: false });
  
  // 3. Logic จัดการสถานะหน้าจอ ('form' | 'success' | 'error')
  const [submitStatus, setSubmitStatus] = useState<'form' | 'success' | 'error'>('form');

  // ถ้า Modal ปิดอยู่ ไม่ต้อง Render อะไรเลย (คืนค่า null)
  if (!isOpen) return null;

  // ฟังก์ชันเช็คข้อมูลก่อนส่ง (Validation)
  const handleSubmit = async () => {
    // รีเซ็ต Error ก่อนเช็คใหม่
    const newErrors = {
      name: formData.name.trim() === '',
      kpiKey: formData.kpiKey.trim() === ''
    };
    
    setErrors(newErrors);

    // ถ้ามีช่องว่าง (true) ให้หยุดทำงาน ไม่ส่งข้อมูล
    if (newErrors.name || newErrors.kpiKey) {
      return;
    }

    // ถ้าข้อมูลครบ ลองจำลองการยิง API
    try {
      // ตรงนี้อนาคตเต้ค่อยใส่ Logic ยิง API ไป Fastify
      console.log("Submitting Data:", formData);
      
      // จำลองดีเลย์ 1 วินาที
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // สมมติว่าสำเร็จ เปลี่ยนสถานะเป็น success
      setSubmitStatus('success');

      // รอ 2 วินาทีแล้วปิด Modal + รีเฟรชตาราง
      setTimeout(() => {
        onClose();
        setSubmitStatus('form'); // รีเซ็ตฟอร์มกลับค่าเดิม
        setFormData({ name: '', kpiKey: '' });
        onSuccess();
      }, 2000);

    } catch (err) {
      // ถ้า Error ก็โชว์หน้ากากบาท
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('form'); // กลับมาหน้าฟอร์มให้กรอกใหม่
      }, 2000);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '32px', borderRadius: '16px', 
        width: '380px', color: '#111827', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        
        {/* --- หน้าต่างสถานะ: กรอกข้อมูล --- */}
        {submitStatus === 'form' && (
          <div style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Add Sensor</h2>
            
            {/* Input: Sensor Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Sensor Name</label>
              <input 
                type="text" 
                placeholder="Sensor Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '8px',
                  border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`, // ถ้า Error ขอบจะแดง
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0 }}>ต้องระบุช่องนี้!</p>}
            </div>

            {/* Input: KPI Key */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>KPI key</label>
              <input 
                type="text" 
                placeholder="KPI key"
                value={formData.kpiKey}
                onChange={(e) => setFormData({ ...formData, kpiKey: e.target.value })}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '8px',
                  border: `1px solid ${errors.kpiKey ? '#ef4444' : '#d1d5db'}`, 
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
              {errors.kpiKey && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0 }}>ต้องระบุช่องนี้!</p>}
            </div>

            {/* ปุ่ม Create */}
            <button 
              onClick={handleSubmit}
              style={{
                width: '100%', padding: '12px', backgroundColor: '#10b981', color: 'white',
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
              }}
            >
              Create
            </button>
            
            {/* ปุ่มยกเลิก (ซ่อนไว้ให้คลิกข้างนอกปิดแทนได้ หรือจะใส่เป็นปุ่มก็ดีครับ) */}
            <button 
              onClick={onClose}
              style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#6b7280', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '14px' }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* --- หน้าต่างสถานะ: สำเร็จ --- */}
        {submitStatus === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle color="#10b981" size={64} style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Add Sensor สำเร็จ</h2>
          </div>
        )}

        {/* --- หน้าต่างสถานะ: ล้มเหลว --- */}
        {submitStatus === 'error' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <XCircle color="#ef4444" size={64} style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Add Sensor ผิดพลาด</h2>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddSensorModal;