 var http = require('http')
 , fs = require('fs')
 , path = require('path')
 , exec = require('child_process').exec
 , ffi = require('node-ffi')
 , bcrypt = require('bcrypt');
 
 var lib = ffi.Library(null, {
	    // FILE* popen(char* cmd, char* mode);
    popen: ['pointer', ['string', 'string']],

    // void pclose(FILE* fp);
    pclose: ['void', [ 'pointer']],

    // char* fgets(char* buff, int buff, in)
    fgets: ['string', ['pointer', 'int','pointer']]
});

function execSync(cmd) {
  var
    buffer = new Buffer(1024),
    result = "",
    fp = lib.popen(cmd, 'r');

  if (!fp) throw new Error('execSync error: '+cmd);

  while(lib.fgets(buffer, 1024, fp)) {
    result += buffer.readCString();
  };
  lib.pclose(fp);

  return result;
}

function hashPassword(password, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        console.log(hash)
	    	callback(hash)
	    });
	});
};

exports.notLogin=function(req, res, conf){
	res.render('notLogin', {address : conf.server.address, port : conf.server.port})
};

exports.deconnexion=function(req, res, conf){
	res.render('deconnexion', {address : conf.server.address, port : conf.server.port})
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

exports.isMounted=function(req, res, conf, callback)
{
	console.log('repertoire : ' + req.body['repertoire'])
	exec('mount | grep ' + req.body['repertoire'], function(error, stdout, stderr){
		if(error !== null)
		{
			console.log("erreur lors de l'ex�cution de mount | grep " + req.body['repertoire'] + " : " + error)
			callback(JSON.parse('{"monte" : false}'))
		}
		else
		{
			console.log("stderr de mount | grep " + req.body['repertoire'] + " : " + stderr)
			console.log("stdout de mount | grep " + req.body['repertoire'] + " : " + stdout)
			if(stdout != '')
			{
				console.log('envoie des donn�es monte : true � la fonction de callback')
				callback(JSON.parse('{"monte" : true, "monteSur" : "' + stdout.split(' ')[2] + '"}'))
			}
		}
	})
};

exports.downloadTorrent=function(req, res, conf, callback)
{
	console.log("r�pertoire : " + req.body['repertoire'])
	console.log("lien torrent : " + req.body['torrent'])
	exec("transmission-cli --download-dir '" + req.body['repertoire'] + "' '" + req.body['torrent'] + "'", {maxBuffer : 1000*1024}, function(error, stdout, stderr){
		if(error !== null)
		{
			console.log("erreur lors de l'ex�cution de transmission-cli --download-dir '" + req.body['repertoire'] + "' '" + req.body['torrent'] + "' : " + error)
			callback('pasok')
		}
		else
		{
			console.log("stderr de transmission-cli --download-dir '" + req.body['repertoire'] + "' '" + req.body['torrent'] + "' : " + stderr)
			console.log("stdout de transmission-cli --download-dir '" + req.body['repertoire'] + "' '" + req.body['torrent'] + "' : " + stdout)
			callback('ok')
		}
	})
};

exports.mountDD=function(req, res, conf, callback)
{
	var monteSur = '/media/usb'
	console.log("chemin : " + req.body['chemin'])
	exec('sudo mount ' + req.body['chemin'] + ' ' + monteSur, function(error, stdout, stderr){
		if(error !== null)
		{
			console.log("erreur lors de l'appel � mountDD : " + error)
			callback(JSON.parse('{"ok" : false, "monteSur" : "erreur"}'))
		}
		else
		{
			console.log("stdout de mountDD : " + stdout)
			console.log("stderr de mountDD : " + stderr)
			callback(JSON.parse('{"ok" : true, "monteSur" : "' + monteSur + '"}'))
		}
	})
}

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