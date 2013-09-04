module.exports = function ( app, handler, conf, log) {
    
    // ---- STATIC ---- //
	app.get ( '/', function ( req, res, next ) {
		console.log("headers " + JSON.stringify(req.headers))
		console.log(req.cookies['connect.sid'])
		console.log(req.session.id)
		if(req.session.logged)
		{
			req.cookies.user
			console.log("Utilisateur loggué : OK")
	        handler.deconnexion ( req, res, conf);	
		}
		else
		{
	        handler.index ( req, res, conf);
		}
	} );
	app.get ( '/acces', function ( req, res, next ) {
		console.log("headers " + JSON.stringify(req.headers))
		if(req.session.logged)
		{
			console.log("Utilisateur loggué : OK")
	        handler.index ( req, res, conf);	
		}
		else
		{
	        handler.acces ( req, res, conf);
		}
	} );
	app.get ( '/gpiomanager', function ( req, res, next ) {
		console.log("headers " + JSON.stringify(req.headers))
		if(req.session.logged)
		{
			console.log("Utilisateur loggué : OK")
	        handler.gpioManager ( req, res, conf);
		}
		else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	} );
	app.get ( '/raspcontrol', function ( req, res, next ) {
        console.log("headers " + JSON.stringify(req.headers))
        
        if(req.session.logged)
		{
        	console.log("Utilisateur loggué : OK")
        	res.redirect('http://' + conf.server.address + ':8181/raspcontrol')
		}
        else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	} );
	app.get ( '/transmission', function ( req, res, next ) {
        console.log("headers " + JSON.stringify(req.headers))
        
        if(req.session.logged)
		{
        	console.log("Utilisateur loggué : OK")
        	handler.transmission ( req, res, conf);
		}
        else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	} );
	
	app.post('/ajouterMembre', function(req, res, next){
		console.log("************** Appel de la fonction ajouterMembre ****************")
		handler.ajouterMembre(req, res, conf, function(ret){
			res.send(ret)
		});
	});
	app.post('/login', function(req, res, next){
		console.log("************** Appel de la fonction login ****************")
		handler.login(req, res, conf, function(ret){
			res.send(ret)
		});
	});
	app.post('/logout', function(req, res, next){
		console.log("************** Appel de la fonction logout ****************")
		handler.logout(req, res, conf);
	});
	app.post ( '/getEtatGpios', function ( req, res, next ) {
        console.log("************** Appel de la fonction getEtatGpios ****************")
        
        if(req.session.logged)
		{
        	console.log("Utilisateur loggué : OK")
        	handler.getEtatGpios(req, res, conf, function(ret){
        		res.send(ret)
        	});
		}
        else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	});
	app.post ( '/changerEtatGpio', function ( req, res, next ) {
        console.log("************** Appel de la fonction changerEtatGpio ****************")
        
        if(req.session.logged)
		{
        	console.log("Utilisateur loggué : OK")
		    handler.changerEtatGpio(req, res, conf, function(ret){
		    	res.send(ret)
		    });
		}
        else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	});
	app.post('/getListeDD', function(req, res, next){
		console.log("************** Appel de la fonction getListeDD ****************")
		
		if(req.session.logged)
		{
			console.log("Utilisateur loggué : OK")
			handler.getListeDD(req, res, conf, function(ret){
				res.send(ret)
			});
		}
		else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	});
	app.post('/isMounted', function(req, res, next){
		console.log("************** Appel de la fonction isMounted ****************")
		
		if(req.session.logged)
		{
			console.log("Utilisateur loggué : OK")
			handler.isMounted(req, res, conf, function(ret){
				res.send(ret)
			});
		}
		else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	});
	app.post('/downloadTorrent', function(req, res, next){
		console.log("************** Appel de la fonction downloadTorrent ****************")
		
		if(req.session.logged)
		{
			console.log("Utilisateur loggué : OK")
			handler.downloadTorrent(req, res, conf, function(ret){
				res.send(ret)
			});
		}
		else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	});
	app.post('/mountDD', function(req, res, next){
		console.log("************** Appel de la fonction mountDD ****************")
		
		if(req.session.logged)
		{
			console.log("Utilisateur loggué : OK")
			handler.mountDD(req, res, conf, function(ret){
				res.send(ret)
			});
		}
		else
		{
			console.log("Utilisateur non loggué")
			handler.notLogin(req, res, conf);
		}
	});
};