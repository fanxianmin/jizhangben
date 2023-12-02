var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入express-session
const session = require('express-session')
const MongoStore = require('connect-mongo')

// 导入定义的路由文件
var indexRouter = require('./routes/web/index');
var authorRouter = require('./routes/web/author');
var accountRouter = require('./routes/api/account');
var authorRouter = require('./routes/api/author');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置session中间件，初始化session的代码必须在路由之前声明，否则不起作用
app.use(session({
  name: 'sid',/* 设置cookie的name,默认值是connect.sid */
  secret: 'aoliao',/* 设置参与加密的字符串，也叫签名 */
  saveUninitialized: true,/* 设置是否为每次请求都设置一个cookie来存储session的sid */
  resave: true,/* 设置是否在每次请求时重新保存session */
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/bilibili',/* 数据库的连接配置 */

  }),
  cookie: {
    // httpOnly: true,/* 开启前后端无法通过JS操作这个cookie */
    maxAge: 1000 * 60 * 24,/* 控制sessionID的过期时间 */
  }
}))


app.use('/', indexRouter);
app.use('/', authorRouter);
app.use('/api', accountRouter);
app.use('/api', authorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
