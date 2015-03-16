var express = require('express');
var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, '/')));
app.get('/', function(req, res){
	res.render('index', {date:new Date().toDateString()});
});

var server = app.listen(process.env.PORT || 80);