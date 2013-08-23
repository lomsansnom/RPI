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
	app.get ( '/transmission', function ( req, res, next ) {
        console.log("headers " + JSON.stringify(req.headers))
        handler.transmission ( req, res, conf);
	} );
	
	
	app.post ( '/getEtatGpios', function ( req, res, next ) {
        console.log("************** Appel de la fonction getEtatGpios ****************")
        handler.getEtatGpios(req, res, conf, function(ret){
        	res.send(ret)
        });
	});
	app.post ( '/changerEtatGpio', function ( req, res, next ) {
        console.log("************** Appel de la fonction changerEtatGpio ****************")
        handler.changerEtatGpio(req, res, conf, function(ret){
        	res.send(ret)
        });
	});
	app.post('/getListeDD', function(req, res, next){
		console.log("************** Appel de la fonction getListeDD ****************")
		handler.getListeDD(req, res, conf, function(ret){
			res.send(ret)
		})
	})

};