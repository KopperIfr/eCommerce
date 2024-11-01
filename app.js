
// Imports..
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./database/connection.js');
const router = require('./routes/router.js');

connectDB();

// Initializing variables..
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware..
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_secret',
    saveUninitialized: false,
    resave: false
}));

// Using routers..
app.use('/api', router);  // /api/user

// Listening on port..
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})