// web.js
var express = require("express");
var app = express();
var Poet = require('poet');

// all environments
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('arjuna'));

// parses json, x-www-form-urlencoded, and multipart/form-data
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app routes

var poet = Poet(app, {
  postsPerPage: 3,
  posts: './_posts',
  metaFormat: 'json',
  routes: {
    '/myposts/:post': 'post',
    '/pagination/:page': 'page',
    '/mytags/:tag': 'tag',
    '/mycategories/:category': 'category'
  }
});

poet.init().then(function () {
  // initialized
});

app.get('/', function (req, res) { res.render('index');});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});