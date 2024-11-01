require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectionDB = require('./database/connection.js');
const router = require('./routes/router.js');

const PORT = process.env.PORT || 3000;
const app = express();

connectionDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_secret',
    saveUninitialized: false,
    resave: false
}));

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
})