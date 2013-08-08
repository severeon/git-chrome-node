var _ = require('underscore');

module.exports = function( app ) {
  var path = 'api';
  var routes = { get: {}, post: {} };

  var GIT_REPOS = [];

  routes.get['list-repos'] = function(req, res, next) {
    res.json(GIT_REPOS);
  };

  routes.post['add-repo'] = function(req, res, next) {
    if (!req.body || !Object.keys( req.body ).length ) {
      res.json({ error : 'No repo details received!'});
    }

    GIT_REPOS.push( req.body );
    res.json({ success : 'Repo added' });
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