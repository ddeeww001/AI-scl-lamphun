import { useState, useEffect } from 'react';
// import ให้ถูกตัว! ชี้ไปที่ไฟล์ StationTable ที่เราจะใช้จัดการรายการสถานี
import StationTable from '../components/StationTable';
import { type StationData } from '../components/Station'; 
import styles from '../styles/SettingsPage.module.css';
import AddSensorModal from '../components/AddSensorModal';

const SettingsPage = () => {
  const [stations, setStations] = useState<StationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // สถานะสำหรับเปิด-ปิด Modal Add Sensor
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // จำลองการดึงข้อมูลรายการสถานีล่าสุด (Mock Data)
    const fetchStations = async () => {
      setIsLoading(true);
      try {
        // ในอนาคต เปลี่ยนตรงนี้เป็นการยิง API ไปหา Backend ของเต้ได้เลย
        const mockStations: StationData[] = [
          { id: '1', name: 'ชื่อสถานี 1', location: 'Location A', status: 'normal', date: new Date(), waterLevel: '150.250', rainfall: '50.555' },
          { id: '2', name: 'ชื่อสถานี 2', location: 'Location B', status: 'normal', date: new Date(), waterLevel: '150.250', rainfall: '50.555' },
          { id: '3', name: 'ชื่อสถานี 3', location: 'Location C', status: 'warning', date: new Date(), waterLevel: '150.250', rainfall: '50.555' },
          { id: '4', name: 'ชื่อสถานี 4', location: 'Location D', status: 'critical', date: new Date(), waterLevel: '150.250', rainfall: '50.555' },
        ];
        
        // สมมติว่ามี Delay 1 วิ เพื่อให้เห็น Loading
        setTimeout(() => {
          setStations(mockStations);
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error loading stations:", error);
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      
      {/* ส่วน Header ของหน้า Setting & ปุ่ม Add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
         <h1 className="text-h1" style={{ color: 'var(--color-text-primary)' }}>หน้าการตั้งค่า (Demo)</h1>
         <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: 'var(--color-text-primary)', // ปุ่มสีขาวแบบในภาพ
              color: 'var(--color-bg-page)',
              border: 'none',
              padding: '8px 24px',
              borderRadius: '20px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
         >
           Add
         </button>
      </div>

      {isLoading ? (
        <div style={{ color: 'var(--color-text-primary)' }}>Loading Stations...</div>
      ) : (
        <StationTable stations={stations} />
      )}
      <AddSensorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          // ถ้าเพิ่มสำเร็จ สั่งให้ดึงข้อมูลสถานีใหม่
          console.log("Refresh Table...");
          // fetchStations(); 
        }}
      />
    </div>
  );
};

export default SettingsPage;