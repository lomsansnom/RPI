module.exports = function ( app, handler, conf, log) {
    
    // ---- STATIC ---- //
	app.get ( '/', function ( req, res, next ) {
        console.log("headers " + JSON.stringify(req.headers))
        handler.index ( req, res, conf);
	} );
	app.get ( '/gpiomanager', function ( req, res, next ) {
        console.log("headers " + JSON.stringify(req.headers))
        handler.gpioManager ( req, res, conf);
	} );
};