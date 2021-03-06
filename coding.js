var express = require('express');
var path = require('path');
var app = express();

var cCheck = require('./controllers/ccheck');
var cUser = require('./controllers/cuser');

var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
app.set('port', (process.env.PORT || 80));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({
  resave: true,
  saveUninitialized: true,
  key: 'sessions',
  secret: 'SXLlGmJfOZhCtzxtqp9T',
  store: require('./models/db').getStore()
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cCheck.error);

//===========================================================================//

app.get('/', [
  cUser.indexGet,
]);

app.get('/play/:id', [
  cUser.playGet,
]);

app.get('/comment/:showid/:commentid', [
  cUser.commentGet,
]);

app.post('/comment/:showid/:commentid', [
  cUser.commentPost,
]);

app.get('/general/:condition/:name', [
  cUser.generalGet,
]);

app.get('/individual/:condition/:name', [
  cUser.individualGet,
]);

//===========================================================================//

app.use(cCheck.notFound);

app.start = function () {
  app.listen(app.get('port'), function() {
    // console.log("Express server listening on port %d", app.get('port'));
	console.log("网站已经开启，请打开浏览器，输入网址 127.0.0.1");
	console.log("如果想关闭网站，请按 Control + c");
  });
};

if (!module.parent) {
  app.start();
}

module.exports = app;

