// src/components/Station/Station.ts

// 1. กำหนดโครงสร้างข้อมูล (Data Contract)
export interface StationData {
  id: string;
  name: string;
  location: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  date: Date;
  waterLevel?: string;
  rainfall?: string;
  alertThreshold?: string; // ระดับน้ำแจ้งเตือนที่ตั้งค่าไว้
}

// 2. Logic การคำนวณสถานะแบบ Real-time
export const calculateStationStatus = (waterLevel?: string, threshold?: string): 'normal' | 'warning' | 'critical' => {
  if (!waterLevel || !threshold) return 'normal';

  const currentWater = parseFloat(waterLevel);
  const maxLimit = parseFloat(threshold);

  if (isNaN(currentWater) || isNaN(maxLimit)) return 'normal';

  if (currentWater >= maxLimit) {
    return 'critical'; 
  } else if (currentWater >= maxLimit * 0.8) {
    return 'warning';  
  }
  
  return 'normal'; 
};

// 3. ข้อมูลจำลองตั้งต้น (Mock Data)
export const mockDatabaseData: StationData[] = [
  {
    id: "1",
    name: "สถานีลำพูน (ตัวอย่าง)",
    location: "อ.เมือง",
    status: "normal",
    date: new Date(),
    waterLevel: "150.250",
    rainfall: "50.555",
    alertThreshold: "180.000" // ตั้งเกณฑ์ไว้ที่ 180
  },
  {
    id: "2",
    name: "สถานีแม่กุ (ตัวอย่าง)",
    location: "อ.แม่สอด",
    status: "warning",
    date: new Date(),
    waterLevel: "151.000",
    rainfall: "60.000",
    alertThreshold: "160.000"
  }
];

// เพิ่มฟังก์ชันนี้ลงไปท้ายไฟล์ Station.ts ครับ
export const transformData = (data: any[]): StationData[] => {
  return data.map((item) => ({
    ...item,
    id: item.id || "0",
    name: item.name || "Unknown",
    location: item.location || "-",
    status: item.status || "normal",
    date: item.date || new Date(),
    waterLevel: item.waterLevel || "-",
    rainfall: item.rainfall || "-",
    alertThreshold: item.alertThreshold || "0"
  }));
};