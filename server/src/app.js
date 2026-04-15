const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', reportRoutes);

app.listen(PORT, () => {
  console.log(` Backend running at http://localhost:${PORT}`);
});