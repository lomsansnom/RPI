/*
 * Module dependencies.
 */
var express = require ( 'express' ), 
	log = require ( './lib/log' ), 
	config = require ( './lib/config' ), 
	server = require ( './lib/server' ), 
	router = require ( './lib/router' ), 
	handler = require ( './lib/handler' ), 
	app = express ( );

var path = require('path')

/*
 * Configuration
 */
var conf = config.getConfigurationFile ( );

app.configure ( function ( ) {
	app.set ( 'views', __dirname + '/views' );
	app.set ( 'view engine', 'ejs' );
	app.use ( express.favicon (__dirname + '/public/images/favicon.ico' ) );
	app.use ( express.logger ( 'dev' ) );
	app.use ( express.static ( __dirname + '/public') );
	app.use ( express.bodyParser ({uploadDir: conf.server.directoryUploads}));
	app.use ( express.cookieParser ( "keyboard cat" ) );
	app.use ( express.session ( {secret : "WebClassifier" } ) );
	app.use ( express.methodOverride ( ) );
	app.use ( express.compress() );
	app.use ( app.router );
} );

app.configure ( 'development', function ( ) {
	app.use ( express.errorHandler ( {
	    dumpExceptions : true,
	    showStack : true
	} ) );
} );

var ioptions = {};


/*
 * Start server
 */
server.start ( app, conf.server.port, ioptions );

/*
 * Dispatching routes
 */
try {
	router ( app, handler, conf, log );
    log.consolelog ( "***************************");
    log.consolelog ( "Start application "+ conf.title);
	log.consolelog ( "Server listening on port " + conf.server.port );
} catch ( err ) {
	log.consolelog ( "//!\ Crash happended : " + err );
}
