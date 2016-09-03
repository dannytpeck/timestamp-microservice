var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express();

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Timestamp Microservice' });
});

app.get('/:date', function (req, res) {
  res.send(req.params);
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});
