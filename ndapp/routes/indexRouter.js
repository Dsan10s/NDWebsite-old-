// var fs = require('fs');
// fs.readFile('/data/brotherEvents.json', function(err, data) {
//   if (err) {
//     console.log('Error reading file brotherEvents.json: ', err);
//   } else {
//     console.log(data);
//   }
// });

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home');
  });
}