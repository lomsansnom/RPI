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
	app.get ( '/raspcontrol', function ( req, res, next ) {
        console.log("headers " + JSON.stringify(req.headers))
        res.redirect('http://' + conf.server.address + ':8181/raspcontrol')
	} );
	app.post ( '/changerEtatGpio', function ( req, res, next ) {
        console.log("************** Appel de la fonction changerEtatGpio ****************")
        handler.changerEtatGpio(req, res, conf, function(res){
        	res.send(ret)
        });
	});

};