var express = require( 'express' ),
    app = express();

var fs = require('fs');
var _ = require('underscore');

app.use( express.bodyParser() );

app.get('/', function(req, res) {  res.send( "Local server is running.  Might I suggest calling some simple /api routes?" );  });


fs.readdir( './routes', function(err, files) {
  _.each(files, function(file, fIdx) {

    console.log('Loading route: ' + file);
    require('./routes/' + file)(app);
  
  });
});

app.listen( process.argv[2] || 8000, function() {
  console.log( '`main.js` listening on port ' +( process.argv[2] || 8000 )+ '' );
});