
/**
 * Module dependencies.
 */

var express = require('express'), 
    ejs     = require('ejs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(function(req, res, next) {
    res.render('errors/pageNotFound', {status: 404, url: req.url});
  });

  app.use(function(err, req, res, next) {
    console.log(err)
    res.render('errors/pageNotFound', {
      status: err.status || 500, 
      error: err, 
      title: "Page not found"
    });
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

require('./routes/indexRouter')(app);
require('./routes/dataRouter')(app);

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
