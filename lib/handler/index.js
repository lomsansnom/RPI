 var http = require('http');
 var fs = require('fs');

exports.notLogin=function(req, res, conf){
	res.render('notLogin', {address : conf.server.address, port : conf.server.port})
};

exports.deconnexion=function(req, res, conf){
	res.render('deconnexion', {address : conf.server.address, port : conf.server.port})
};

exports.logout=function(req, res, conf){
	req.session.logged = false
};

exports.index=function(req, res, conf){
   res.render('index', {address : conf.server.address, port : conf.server.port})
};

exports.acces=function(req, res, conf){
   res.render('acces', {address : conf.server.address, port : conf.server.port})
};
	
exports.gpioManager=function(req, res, conf){
   res.render('gpiomanager', {address : conf.server.address, port : conf.server.port})
};

exports.transmission=function(req, res, conf){
	res.render('transmission', {address : conf.server.address, port : conf.server.port})
};

exports.lecteur=function(req, res, conf){
	res.render('lecteur', {address : conf.server.address, port : conf.server.port})
};

exports.login=function(req, res, conf, callback){
	requeteWS(req.method, req.url, JSON.stringify(req.body), conf, function(ret){
		if(ret.OK)
		{
			console.log('Le mot de passe est correct')
			req.session.logged = true
		}
		else
		{
			console.log(ret.Erreur)
			req.session.logged = false
		}
		callback(ret)
	});
};

function requeteWS(method, url, data, conf, successHandler) {
	var clientData = "",
	options = {
		host : conf.webservice.address,
		port : conf.webservice.port,
		method : method,
		path : url,
	};
	console.log('host='+conf.webservice.address)
	console.log('port='+conf.webservice.port)
	console.log('method='+method)
	console.log('path='+url)
	console.log('data='+data)
	
	// Make a request on the webservice. Response is sent in the callback function.
	var webserviceReq = http.request ( options, function ( webserviceRes ) {
		webserviceRes.setEncoding('utf8');
		webserviceRes
		.on ( 'error', function ( e ) {
			console.log ( '/!\\ ' + e.message );
			successHandler ( e );
		} )
		.on ( 'data', function ( chunk ) {
			clientData += chunk;
		} )
		.on ( 'end', function ( ) {
			console.log (clientData);
			
			console.log("webservice return.." + clientData.length);
			successHandler(JSON.parse(clientData));
		} );
	} ).on ( 'error', function ( e ) {
		console.log("/!\\ " + e);
		successHandler(e);
	} );
	
	webserviceReq.write ( data );
	webserviceReq.end ( );
}
exports.requeteWS = requeteWS;

function requeteMusiqueWS(method, url, data, conf, successHandler) {
	var clientData = "",
	options = {
			host : conf.webservicePlayer.address,
			port : conf.webservicePlayer.port,
			method : method,
			path : url,
		};
		console.log('host='+conf.webservicePlayer.address)
		console.log('port='+conf.webservicePlayer.port)
		console.log('method='+method)
		console.log('path='+url)
		console.log('data='+data)
		
	// Make a request on the webservice. Response is sent in the callback function.
	var webserviceReq = http.request ( options, function ( webserviceRes ) {
		webserviceRes.setEncoding('utf8');
		webserviceRes
		.on ( 'error', function ( e ) {
			console.log ( '/!\\ ' + e.message );
			successHandler ( e );
		} )
		.on ( 'data', function ( chunk ) {
			clientData += chunk;
		} )
		.on ( 'end', function ( ) {
			console.log (clientData);
			
			console.log("webservice return.." + clientData.length);
			successHandler(JSON.parse(clientData));
		} );
	} ).on ( 'error', function ( e ) {
		console.log("/!\\ " + e);
		successHandler(e);
	} );
	webserviceReq.setTimeout(30000)
	webserviceReq.write ( data );
	webserviceReq.end ( );
}
exports.requeteMusiqueWS = requeteMusiqueWS;


function requeteFichierWS(url, cheminMusique, conf) {
	var nomMusique = cheminMusique.split('/')
	var file = fs.createWriteStream(conf.server.directory + '/' + nomMusique[nomMusique.length-1]);
	var urlWS = "http://" + conf.webservicePlayer.address + ":" + conf.webservicePlayer.port + url
	console.log(url)
	var req = http.get(urlWS, function(res) {
	    res.pipe(file);
	});
}
exports.requeteFichierWS = requeteFichierWS;
