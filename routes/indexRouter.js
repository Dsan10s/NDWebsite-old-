module.exports = function(app) {

  app.dynamicHelpers({
    req: function(req, res) {
      return req;
    }
  });

  ///////////////////////////////////////////////////////////////////
  // Home page
  ///////////////////////////////////////////////////////////////////

  app.get('/', function(req, res) {
    res.render('homepage/home', {title: "N&Delta;"});
  });

  app.get('/home', function(req, res) {
    res.render('homepage/home', {title: "N&Delta;"});
  });

  ///////////////////////////////////////////////////////////////////
  // Brothers
  ///////////////////////////////////////////////////////////////////

  app.get('/brothers', function(req, res) {
    res.render('brothers/brotherHome', {title: "N&Delta; Brothers"})
  });

  app.get('/brothers/:classYear', function(req, res, next) {
    var classYear = req.params.classYear;
    var brothers = require('../data/brothers/' + classYear);
    if (brothers) {
      res.render('brothers/brotherClass', {title: "N&Delta; Class of " + classYear, classYear: classYear});
    } else {
      next();
    }
  });

  ///////////////////////////////////////////////////////////////////
  // House
  ///////////////////////////////////////////////////////////////////

  app.get('/house', function(req, res) {
    res.render('house/house', {title: "N&Delta; House"});
  });

  ///////////////////////////////////////////////////////////////////
  // RAK
  ///////////////////////////////////////////////////////////////////

  app.get('/rak', function(req, res) {
    res.render('rak/rak', {title: "N&Delta; RAK"});
  });
}