var express = require('express');
var mustacheExpress = require('mustache-express');
var app = express();

var port = process.env.PORT || 8080;

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Timestamp Microservice' });
});

app.get('/:date', function (req, res) {
  var date;
  
  if (!isNaN(req.params.date)) {
    date = new Date(Number(req.params.date) * 1000);
    
    res.json({
      unix: Number(req.params.date),
      natural: date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
    });
  } else {
    date = new Date(req.params.date);
    
    if (!isNaN(date.getTime())) {
      res.json({
        unix: date.getTime() / 1000,
        natural: date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    } else {
      res.json({ unix: null, natural: null });
    }
  }

});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
