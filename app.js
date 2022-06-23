var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var planRouter = require('./routes/plan');
var activityRouter = require('./routes/activities');
var precintRouter = require('./routes/precinct');
var roadRouter = require('./routes/road');
var plotRouter = require('./routes/plot');
var boundaryRouter = require('./routes/boundary');
var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyparser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api', planRouter);
app.use('/api', activityRouter);
app.use('/api', precintRouter);
app.use('/api', plotRouter);
app.use('/api', roadRouter);
app.use('/api', boundaryRouter);



require("dotenv").config();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
