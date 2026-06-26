// src/components/Station/Station.ts

// 1. Export Interface และเพิ่ม Field ที่จำเป็น
export interface StationData {
  id: string;
  name: string;
  location: string;
  status: 'normal' | 'warning' | 'critical';
  date: Date;
  // เพิ่ม 2 บรรทัดนี้ เพื่อให้ใช้งานกับตารางหน้า Settings ได้
  waterLevel?: string; 
  rainfall?: string;
}

// 2. Export Mock Data (ข้อมูลจำลอง)
export const mockDatabaseData: StationData[] = [
  {
    id: "1",
    name: "สถานี A (ตัวอย่าง)",
    location: "ส่วนกลาง",
    status: "normal",
    date: new Date(),
    waterLevel: "150.250",
    rainfall: "50.555"
  },
  {
    id: "2",
    name: "สถานี B (ตัวอย่าง)",
    location: "จุดสูบน้ำ",
    status: "warning",
    date: new Date(),
    waterLevel: "151.000",
    rainfall: "60.000"
  }
];

// 3. Export ฟังก์ชัน transformData
// ฟังก์ชันนี้รับข้อมูลดิบมา แล้วแปลงให้ตรงกับ StationData
export const transformData = (data: any[]): StationData[] => {
  // Logic การ Map ข้อมูลเพื่อป้องกันกรณีมีค่าเป็น null/undefined ส่งมา
  return data.map((item, index) => ({
    id: item.id || String(index),
    name: item.name || "Unknown Station",
    location: item.location || "-",
    status: item.status || "normal",
    date: item.date || new Date(),
    waterLevel: item.waterLevel || "-",
    rainfall: item.rainfall || "-"
  }));
};