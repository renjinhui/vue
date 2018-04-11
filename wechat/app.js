'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
// const captcha = require('./@syd/captcha');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cookieSession({
  secret: 'souyidai'
}));
app.use(express.static(path.join(__dirname, 'public')));

// //图形验证码配置
// app.use(captcha({
//   url: '/captcha.jpg',
//   color: '#333',
//   background: '#c2c2c2',
//   codeLength: 4,
//   lineWidth: 2,
//   canvasWidth: 160,
//   canvasHeight: 120,
//   fontSize: 50,
// }));

//自动根据routes配置路由
const routes = require('./routes');
for (let i in routes) {
  app.use('/' + i, routes[i]);
};

//root url
app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'soeasy-wechat'
  });
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
