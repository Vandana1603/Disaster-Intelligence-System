// server/src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getReports, addReport, assignReport, upvoteReport } = require('../controllers/reportController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/') },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname) }
});
const upload = multer({ storage });

router.get('/reports', getReports);
router.post('/report', upload.single('image'), addReport);
router.post('/report/:id/assign', assignReport);
router.post('/report/:id/upvote', upvoteReport);

module.exports = router;