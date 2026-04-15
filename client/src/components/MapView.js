import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MapView() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await axios.get("http://localhost:5000/api/reports");
    setReports(res.data);
  };

  function AddMarker() {
    useMapEvents({
      click:(e)=>{
        const desc = prompt("Enter disaster type:");
        axios.post("http://localhost:5000/api/report",{
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          description: desc
        })
        .then(fetchReports);
      }
    });
    return null;
  }

  return (
    <MapContainer center={[20.5, 78.9]} zoom={5} style={{ height: "100vh", width: "70%", backgroundColor: "#111" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
      />
      <AddMarker />
      {reports.map(r => (
        <Marker key={r.id} position={[r.lat, r.lng]} />
      ))}
    </MapContainer>
  );
}
