var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const io = require("socket.io");
require('dotenv').config();

// Routes
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');
const fileRouter = require('./routes/file');
const commentRouter = require('./routes/comment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);
app.use('/api/comment', commentRouter);
app.use('/api/project', projectRouter);
app.use('/api/file', fileRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

module.exports = app;