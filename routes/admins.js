/* 
 * Admin Routes
 */

var Admin               = require('../data/models/admin'), 
    notLoggedIn         = require('./middleware/not_logged_in'),
    loadAdmin           = require('./middleware/load_admin'), 
    restrictAdminToSelf = require('./middleware/restrict_admin_to_self');

module.exports = function(app) {

  app.get('/admins', function(req, res, next) {
    var maxAdminsPerPage = 10;
    var page = req.query.page && parseInt(req.query.page, 10) || 0;
    Admin.count(function(err, count) {
      if (err) {
        return next(err);
      }

      var lastPage = (page + 1) * maxAdminsPerPage >= count;

      Admin.find({})
      .sort('username', 1)
      .skip(page * maxAdminsPerPage)
      .limit(maxAdminsPerPage)
      .exec(function(err, users) {
        if (err) {
          return next(err);
        }
        res.render('admins/index', {title: 'Admins', users: users, page: page, lastPage: lastPage});
      });
    });
  });

  app.get('/admins/new', notLoggedIn, function(req, res) {
    res.render('admins/new', {title: 'New Admin'});
  });

  app.post('/admins', notLoggedIn, function(req, res) {
    Admin.findOne({username: req.body.username}, function(err, admin) {
      if (err) {
        return next(err);
      }
      if (admin) {
        return res.send('Conflict', 409);
      }
      Admin.create(req.body, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/admins');
      })
    });
  });

  app.del('/admins/:name', loadUser, restrictUserToSelf, function(req, res, next) {
    req.user.remove(function(err) {
      if (err) {return next(err); }
      res.redirect('/admins');
    });
  });

}