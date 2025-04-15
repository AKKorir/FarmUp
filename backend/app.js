const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contractRoutes = require('./routes/contractRoutes');
const authRoutes = require ('./routes/userRoutes')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS properly
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Required when using withCredentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};

app.use(cors(corsOptions)); // Use the configured CORS options
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/api/contract', contractRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});