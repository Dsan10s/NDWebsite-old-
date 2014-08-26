var admins = {
  "admin": {
    username: "admin", 
    password: "letmein"
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

  app.post('/admin', function(req, res) {
    if (admins[req.body.username] && 
        admins[req.body.username].password === req.body.password) {
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

  app.get('/admin/login', function(req, res) {
    res.render('admin/login', {title: "Log in"});
  });

  app.get('/admin/editEvents', function(req, res) {
    res.render('admin/editEvents', {title: "Edit Events"});
  }); 

}