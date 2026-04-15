// server/src/controllers/reportController.js
const Report = require('../models/reportModel');
const { calculateRisk } = require('../services/riskEngine');

let alerts = []; // simple in-memory alerts

// GET /api/reports
const getReports = async (req, res) => {
  try {
    const reports = Report.getAll(); // returns array of reports
    res.json({ reports, alerts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/report
const addReport = async (req, res) => {
  try {
    const { lat, lng, type, description } = req.body;
    if (!lat || !lng || !type) return res.status(400).json({ error: "Missing fields" });

    const risk = calculateRisk(type); // e.g., 30-90%
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const report = Report.add({ lat, lng, type, description, risk, imageUrl });
    
    // Add alert if risk high
    if(risk > 70){
      alerts.push({ id: Date.now(), message: `${type} detected with high risk ${risk}%` });
    }

    res.status(201).json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/report/:id/assign
const assignReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { rescuerName, teamName } = req.body;
    if (!rescuerName || !teamName) return res.status(400).json({ error: "Missing rescue team details" });
    const report = Report.assignReport(id, rescuerName, teamName);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/report/:id/upvote
const upvoteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = Report.upvote(id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getReports, addReport, assignReport, upvoteReport };