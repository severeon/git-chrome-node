var app = require( 'express' )();
var fs = require('fs');
var _ = require('underscore');

app.get('/', function(req, res) {  res.send( "Local server is running.  Might I suggest calling some simple /api routes?" );  });


fs.readdir( './routes', function(err, files) {
  console.log('Getting Routes');

  _.each(files, function(file, fIdx) {
    require('./routes/' + file)(app);
  });
});

app.listen( process.argv[2] || 3000, function() {
  console.log( '`main.js` listening on port ' +( process.argv[2] || 3000 )+ '' );
});