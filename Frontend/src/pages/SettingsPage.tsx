// src/pages/SettingsPage.tsx
import { useState, useEffect } from 'react';
import StationTable from '../components/StationTable';
import AddSensorModal from '../components/AddSensorModal';
import EditStationModal from '../components/EditStationModal';
import { type StationData, mockDatabaseData, calculateStationStatus } from '../components/Station'; 
import styles from '../styles/SettingsPage.module.css';

const SettingsPage = () => {
  const [stations, setStations] = useState<StationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State ควบคุม Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingStation, setEditingStation] = useState<StationData | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setStations(mockDatabaseData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading stations:", error);
        setIsLoading(false);
      }
    };
    fetchStations();
  }, []);

  // ฟังก์ชันเตรียมข้อมูลก่อนส่งให้ Modal Edit
  const handleEditClick = (station: StationData) => {
    setEditingStation(station);
    setIsEditModalOpen(true);
  };

  // ฟังก์ชันรับข้อมูลกลับมาจาก Modal Edit เพื่อคำนวณ Status และอัปเดตตาราง
  const handleSaveEdit = (stationId: string, newThreshold: string) => {
    const updatedStations = stations.map(station => {
      if (station.id === stationId) {
        const newStatus = calculateStationStatus(station.waterLevel, newThreshold);
        return { ...station, alertThreshold: newThreshold, status: newStatus };
      }
      return station; 
    });
    setStations(updatedStations);
  };

  return (
    <div className={styles.pageWrapper || ''} style={{ width: '100%' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
         <h1 style={{ color: 'var(--color-text-primary)', fontSize: '24px', fontWeight: 700 }}>หน้าการตั้งค่า (Demo)</h1>
         <button 
            onClick={() => setIsAddModalOpen(true)}
            style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-bg-page)', border: 'none', padding: '8px 24px', borderRadius: '20px', fontWeight: 600, cursor: 'pointer' }}
         >
           Add
         </button>
      </div>

      {isLoading ? (
        <div style={{ color: 'var(--color-text-primary)' }}>Loading Stations...</div>
      ) : (
        <StationTable stations={stations} onEdit={handleEditClick} />
      )}

      {/* Modal Add Sensor */}
      <AddSensorModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={() => console.log("โหลดข้อมูลตารางใหม่หลังจากเพิ่มเสร็จ")}
      />

      {/* Modal Edit Sensor */}
      <EditStationModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        station={editingStation}
        onSave={handleSaveEdit}
      />

    </div>
  );
};

export default SettingsPage;