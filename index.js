const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const messageDataRoute = require('./routes/messageDataRoute');
const memberRequestDataRoute = require('./routes/memberRequestDataRoute');
const donationDataRoute = require('./routes/donationDataRoute');


const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
    origin: '*', // Allow requests from all origins
    credentials: true, // Allow sending cookies
}));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Mount routes
app.use('/api/auth', authRoute); // Example route prefix
app.use('/api/messages', messageDataRoute);
app.use('/api/member-requests', memberRequestDataRoute);
app.use('/api/donations', donationDataRoute);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
