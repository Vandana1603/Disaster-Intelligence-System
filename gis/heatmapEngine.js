function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))); 
}

function generateHeatmapData(reports) {
  return reports.map(r => {
    let baseIntensity = (r.risk || 50) / 100;
    
    // Increase intensity based on proximity to other alerts (high demand)
    const nearbyAlerts = reports.filter(other => 
      other.id !== r.id && 
      calculateDistance(r.lat, r.lng, other.lat, other.lng) <= 5 // 5km search radius
    );
    
    // Boost intensity significantly for clusters
    const demandBoost = nearbyAlerts.length * 0.15;
    
    // Urgency boost if report is unassigned and high risk
    const urgencyBoost = (!r.assigned && r.risk > 75) ? 0.2 : 0;

    // Upvote boost to darken high need risk areas
    const upvoteBoost = (r.upvotes || 0) * 0.15;

    let finalIntensity = baseIntensity + demandBoost + urgencyBoost + upvoteBoost;
    if (finalIntensity > 1.0) finalIntensity = 1.0;

    return [
      r.lat,
      r.lng,
      finalIntensity
    ];
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateHeatmapData, calculateDistance };
}
if (typeof window !== 'undefined') {
  window.generateHeatmapData = generateHeatmapData;
}