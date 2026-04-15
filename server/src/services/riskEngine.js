// server/src/services/riskEngine.js
const calculateRisk = (type) => {
  switch(type){
    case 'Flood': return Math.floor(Math.random()*41)+40; // 40-80%
    case 'Fire': return Math.floor(Math.random()*41)+50; // 50-90%
    default: return Math.floor(Math.random()*41)+30; // 30-70%
  }
};

module.exports = { calculateRisk };