let reports = [];

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
};

const getAll = () => {
  const now = new Date();
  
  reports.forEach(r => {
    let baseRisk = r.type === 'Fire' ? 50 : (r.type === 'Flood' ? 40 : 30);

    // 1. Density & Geographic Clustering
    const nearby = reports.filter(other => other.id !== r.id && haversineDistance(r.lat, r.lng, other.lat, other.lng) <= 5);
    const densityBoost = nearby.length * 15;

    // 2. Recency (2-hour half-life exponential decay)
    const reportTime = r.timestamp ? new Date(r.timestamp) : new Date(r.id); // fallback to ID parsing for backwards-compat
    const ageHours = (now - reportTime) / (1000 * 60 * 60);
    const recencyMultiplier = Math.pow(0.5, ageHours / 2);

    // Final calculation
    let calculatedRisk = (baseRisk + densityBoost) * recencyMultiplier;
    calculatedRisk += (r.upvotes || 0) * 10; // Community validation
    
    if (calculatedRisk > 100) calculatedRisk = 100;
    if (calculatedRisk < 0) calculatedRisk = 0;

    r.risk = Math.round(calculatedRisk);
  });
  
  return reports;
};

const add = ({ lat, lng, type, description, risk, imageUrl }) => {
  let isClustered = false;
  
  // Scan existing reports for 5km confirmation thresholds
  reports.forEach(r => {
    if (r.type === type) {
      if (haversineDistance(r.lat, r.lng, parseFloat(lat), parseFloat(lng)) <= 5) {
        isClustered = true;
        r.trust = 'High (Confirmed)'; // Instantly update historical reports in cluster
      }
    }
  });

  const trust = isClustered ? 'High (Confirmed)' : 'Low';
  const timestamp = new Date().toISOString();
  // Ensure risk dynamically overrides the mock data from riskEngine
  const report = { id: Date.now(), lat: parseFloat(lat), lng: parseFloat(lng), type, description, risk, imageUrl, trust, assigned: false, rescuerName: null, teamName: null, upvotes: 0, timestamp };
  reports.push(report);
  return report;
};

const upvote = (id) => {
  const report = reports.find(r => r.id === parseInt(id));
  if (report) {
    report.upvotes = (report.upvotes || 0) + 1;
    if (report.upvotes >= 3 && report.trust === 'Low') {
      report.trust = 'High (Verified)';
    }
    return report;
  }
  return null;
};

const assignReport = (id, rescuerName, teamName) => {
  const report = reports.find(r => r.id === parseInt(id));
  if (report) {
    report.assigned = true;
    report.rescuerName = rescuerName;
    report.teamName = teamName;
    return report;
  }
  return null;
};

module.exports = { getAll, add, assignReport, upvote };