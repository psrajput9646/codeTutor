var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
require('dotenv').config();

// Routes
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const studentRouter = require('./routes/student');
const tutorRouter = require('./routes/tutor');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/student', studentRouter);
app.use('/api/tutor', tutorRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

module.exports = app;
