var passwordHash = require('password-hash'), 
    notLoggedIn  = require('./middleware/not_logged_in');

var admins = {
  "admin": {
    username: "admin", 
    password: passwordHash.generate("letmein")
  }
}

module.exports = function(app) {

  app.dynamicHelpers({
    session: function(req, res) {
      return req.session;
    }
  });

  app.get('/admin', function(req, res) {
    if (!req.session.user) {
      res.redirect('/admin/login');
    } else {
      res.render('admin/adminHome', {title: "Admin Home"});
    }
  });

  app.post('/admin', notLoggedIn, function(req, res) {
    if (admins[req.body.username] && 
        passwordHash.verify(req.body.password, admins[req.body.username].password)) {
      req.session.user = admins[req.body.username];
      res.redirect('/admin');
    } else {
      res.redirect('/admin/login');
    }
  });

  app.del('/admin', function(req, res, next) {
    req.session.destroy();
    res.redirect('/admin/login');
  });

  app.get('/admin/login', notLoggedIn, function(req, res) {
    res.render('admin/login', {title: "Admin log in"});
  });

  app.get('/admin/editEvents', function(req, res) {
    if (!req.session.user) {
      res.redirect('/admin/login');
    } else {
      res.render('admin/editEvents', {title: "Edit Events"});
    }
  }); 

}