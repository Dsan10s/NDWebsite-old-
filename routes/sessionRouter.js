var admin = {
  'username': 'admin', 
  'password': 'letmein'
}

module.exports = function(app) {

  app.dynamicHelpers({
    session: function(req, res) {
      return req.session;
    }
  });

  app.get('/admin', function(req, res) {
    if (!req.session.user) {
      res.redirect('/admin/login'):
    } else {
      res.render('admin/adminHome');
    }
  });

  app.get('/admin/login', function(req, res) {
    res.render('admin/login', {title: "Log in"});
  });



}