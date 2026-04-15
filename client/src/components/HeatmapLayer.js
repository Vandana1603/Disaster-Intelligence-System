import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

export default function HeatmapLayer({ map, reports }) {
  useEffect(() => {
    if (!map) return;

    const heatData = reports.map(r => [r.lat, r.lng, r.risk / 100]);

    const heat = L.heatLayer(heatData, {
      radius: 25,
      gradient: {
        0.4: "yellow",
        0.7: "orange",
        1.0: "red"
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, reports]);

  return null;
}
