"use strict";

/**
 * Dependencies
 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
/**
 * Server
 */
const app = express();
app.proxy = true; // trust proxy
/**
 * middleware
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'htdocs'))); //静态文件目录
/**
 * logger
 */
app.use(logger('dev'));
// 当有错误发生时，就将错误信息保存到了根目录下的 error.log 文件夹里。
app.use(logger({stream: accessLog}));
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});
app.use(function (err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLog.write(meta + err.stack + '\n');
    next();
});

/**
 * routes
 */
const routes = require('./routes/index');
routes(app);

/**
 * Start app
 */
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});