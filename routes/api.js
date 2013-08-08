var _ = require('underscore');

module.exports = function( app ) {
  var path = 'api';
  var routes = { get: {}, post: {} };

  var GIT_REPOS = [];

  routes.get['list'] = function(req, res, next) {
    res.json(GIT_REPOS);
  };

  routes.post['repo'] = function(req, res, next) {
    GIT_REPOS.push( req.body || {} );
  };

  // Handles incorrect API routes.
  var non_route = function(req, res, next) { res.json({ 'error': 'Unsupported API route.'}); };
  routes.get['*'] = non_route;
  routes.get[''] = non_route;


  _.each(routes, function( method, methodName) {
    _.each(method, function(handler, route) {
      if (!route) app[methodName]( "/" +( path )+ "(/)?", handler );
      else app[methodName]( "/" + path + "/" + route, handler );
    });
  });

};