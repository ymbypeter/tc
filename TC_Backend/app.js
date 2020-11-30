var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@tc.mljre.mongodb.net/TC?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true});
var indexRouter = require('./routes/index');

//新增的router
var usersRouter = require('./routes/userApi');
var shopRouter = require('./routes/shopApi');
var uploadRouter = require('./routes/uploadApi');
var pvpRouter = require('./routes/pvpApi');
var courseRouter = require('./routes/courseApi');
var testRouter = require('./routes/testApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: 'session-secret',
//   cookie: {maxAge: 600*6000}
// }));

app.use('/', indexRouter);


//新增的router
app.use('/user',usersRouter);
app.use('/shop',shopRouter);
app.use('/upload',uploadRouter);
app.use('/pvp',pvpRouter);
app.use('/course',courseRouter);
app.use('/test',testRouter);

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
