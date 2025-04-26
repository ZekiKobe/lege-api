const express = require('express');
const mongoose = require('mongoose');
const registerRoute = require('./routes/registerRoute');
const adminRoute = require('./routes/adminRoute');
const messageRoute = require('./routes/messageRoute');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());


app.use('/api/applications', registerRoute);
app.use('/api/administrators', adminRoute);
app.use('/api/messages',messageRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log("Connected to MongoDB...");

    // Start the server only after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})


.catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process if the connection fails
});