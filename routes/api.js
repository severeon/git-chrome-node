var _ = require('underscore');

module.exports = function( app ) {
  var path = 'api';
  var routes = { get: {}, post: {} };

  routes.get[''] = function(req, res, next) {
    res.json({great: 'success'});
  };


  for (var routeIndex in route) {
    var method = route[routeIndex];
    for (var route in method) {

    }
  }


  _.each(routes, function( method, methodName) {
    _.each(method, function(handler, route) {
      if (!route) app[methodName]( "/" +( path )+ "(/)?", handler );
      else app[methodName]( "/" + path + "/" + route, handler );
    });
  });

};