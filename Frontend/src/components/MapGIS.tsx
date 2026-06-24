import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Crosshair, X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/MapGIS.module.css';
import MapSearch from './MapSearch';

interface StationInfo {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  waterLevel: number;
  rainfall: number;
}

const MOCK_STATIONS: StationInfo[] = [
  { id: 'S001', name: 'สถานี 1', location: 'อ.เมือง ลำพูน', lat: 18.795, lng: 99.01, status: 'normal', waterLevel: 1.50, rainfall: 25.0 },
  { id: 'S002', name: 'สถานี 2', location: 'อ.ท่าวุง ลำพูน', lat: 18.785, lng: 99.02, status: 'normal', waterLevel: 0.80, rainfall: 10.0 },
  { id: 'S003', name: 'สถานี 3', location: 'อ.บ้านธิ ลำพูน', lat: 18.80, lng: 99.005, status: 'warning', waterLevel: 2.50, rainfall: 50.5 },
  { id: 'S004', name: 'สถานี 4', location: 'อ.เมือง ลำพูน', lat: 18.79, lng: 99.03, status: 'critical', waterLevel: 3.80, rainfall: 80.0 },
  { id: 'S005', name: 'สถานี 5', location: 'อ.ท่าวุง ลำพูน', lat: 18.775, lng: 99.025, status: 'normal', waterLevel: 1.20, rainfall: 5.0 },
  { id: 'S006', name: 'สถานี 6', location: 'อ.เมือง ลำพูน', lat: 18.805, lng: 99.015, status: 'warning', waterLevel: 2.10, rainfall: 35.0 },
];

const createStationIcon = (status: string): L.DivIcon => {
  const colorMap: Record<string, string> = {
    normal: '#10B981',
    warning: '#FFAE00',
    critical: '#EF4444',
    offline: '#6B7280',
  };
  const color = colorMap[status] || '#10B981';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="40" viewBox="0 0 27 40">
      <path d="M13.5 0C6.04 0 0 6.04 0 13.5c0 10.13 13.5 26.5 13.5 26.5S27 23.63 27 13.5C27 6.04 20.96 0 13.5 0zm0 18.75a5.25 5.25 0 110-10.5 5.25 5.25 0 010 10.5z" fill="${color}"/>
      <circle cx="13.5" cy="13.5" r="5.25" fill="white" opacity="0.3"/>
    </svg>`;

  return L.divIcon({
    className: styles.customMarker,
    html: svg,
    iconSize: [27, 40],
    iconAnchor: [13.5, 40],
    popupAnchor: [0, -42],
  });
};

function FlyToStation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 16, { duration: 1 });
  return null;
}

const MapGIS = () => {
  const [selectedStation, setSelectedStation] = useState<StationInfo | null>(null);
  const [showStationList, setShowStationList] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);

  const handleSelectStationFromSearch = useCallback((station: { lat: number; lng: number; id: string; name: string; location: string }) => {
    setFlyTarget({ lat: station.lat, lng: station.lng });
    const found = MOCK_STATIONS.find((s) => s.id === station.id);
    if (found) setSelectedStation(found);
    setShowStationList(false);
  }, []);

  const handleMarkerClick = useCallback((station: StationInfo) => {
    setSelectedStation(station);
    setFlyTarget({ lat: station.lat, lng: station.lng });
  }, []);

  const statusClass = (status: string, prefix: string) => {
    const map: Record<string, string> = {
      normal: `${prefix}Normal`,
      warning: `${prefix}Warning`,
      critical: `${prefix}Critical`,
    };
    return (styles as Record<string, string>)[map[status]] || '';
  };

  return (
    <div className={styles.mapPage}>
      <div className={styles.mapContainer}>
        <MapContainer
          center={[18.79, 99.01]}
          zoom={13}
          className={styles.mapCanvas}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {flyTarget && <FlyToStation lat={flyTarget.lat} lng={flyTarget.lng} />}

          {MOCK_STATIONS.map((s) => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={createStationIcon(s.status)}
              eventHandlers={{
                click: () => handleMarkerClick(s),
              }}
            />
          ))}
        </MapContainer>

        <button className={styles.locateBtn} title="Locate me">
          <Crosshair size={15} />
        </button>

        {selectedStation && !showStationList && (
          <div
            className={styles.stationPopup}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={styles.popupCard}>
              <div className={`${styles.popupStatusBar} ${statusClass(selectedStation.status, 'popupStatusBar')}`} />
              <div className={styles.popupBody}>
                <p className={styles.popupStationName}>{selectedStation.name}</p>
                <div className={styles.popupDataGroup}>
                  <div className={styles.popupDataRow}>
                    <span className={styles.popupDataLabel}>ระดับน้ำ</span>
                    <div className={styles.popupDataValue}>
                      <span className={`${styles.popupDataNumber} ${statusClass(selectedStation.status, 'popupDataNumber')}`}>
                        {selectedStation.waterLevel.toFixed(3)}
                      </span>
                      <span className={styles.popupDataUnit}>เมตร</span>
                    </div>
                  </div>
                  <div className={styles.popupDataRow}>
                    <span className={styles.popupDataLabel}>ปริมาณน้ำฝนสะสม</span>
                    <div className={styles.popupDataValue}>
                      <span className={`${styles.popupDataNumber} ${statusClass(selectedStation.status, 'popupDataNumber')}`}>
                        {selectedStation.rainfall.toFixed(3)}
                      </span>
                      <span className={styles.popupDataUnit}>มิลลิเมตร/ชั่วโมง</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.popupArrow} />
          </div>
        )}

        {showStationList && (
          <div className={styles.stationListPanel}>
            <button
              className={styles.closePanelBtn}
              onClick={() => setShowStationList(false)}
            >
              <X size={18} />
            </button>

            <MapSearch
              stations={MOCK_STATIONS.map((s) => ({
                id: s.id,
                name: s.name,
                location: s.location,
                lat: s.lat,
                lng: s.lng,
              }))}
              onSelectStation={handleSelectStationFromSearch}
              searchPlaceholder="Search"
            />

            {MOCK_STATIONS.map((s) => (
              <div
                key={s.id}
                className={styles.stationRow}
                onClick={() => {
                  setFlyTarget({ lat: s.lat, lng: s.lng });
                  setSelectedStation(s);
                  setShowStationList(false);
                }}
              >
                <span className={styles.stationRowName}>{s.name}</span>
                <span className={styles.stationRowLocation}>
                  รายระเอียดตำแหน่ง{String.fromCharCode(8230).repeat(20)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapGIS;
