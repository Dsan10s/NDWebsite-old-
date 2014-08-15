/*
 * Session Routes
 */

 var users = require('../data/users');

module.exports = function(app) {

  app.dynamicHelpers({
    session: function(req, res) {
      return req.session;
    }
  });

  app.get('/admin', function(req, res) {
    res.render('admin/home', {title: "Log in"});
  });

  app.post('/admin/session', function(req, res) {
    if (users[req.body.username] && 
        users[req.body.username].password === req.body.password) {
      req.session.user = users[req.body.username];
      res.render('admin/home');
    } else {
      res.render('admin/login');
    }
  });

  app.del('/admin/session', function(req, res, next) {
    req.session.destroy();
    res.redirect('/admin')
  });

}