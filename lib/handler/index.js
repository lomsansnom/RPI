 var fs = require('fs')
 , path = require('path')
 , exec = require('child_process').exec
 , ffi = require('node-ffi')
 , pg = require('pg');
 
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

function queryPostgres(conf, query){
	var client = new pg.Client({
	    user: conf.database.username,
	    password: conf.database.password,
	    database: conf.database.database,
	    host: conf.database.address,
	    port: conf.database.port
	});
	var requete = "";
	
	switch(query.query)
	{
		case '/login' :
			requete = 'SELECT "password" FROM "Utilisateurs" WHERE "login"=\'' + query.username + '\'';
		break;
	}
	
	client.connect(function(err) {
		if(err) {
			return console.log('could not connect to postgres', err);
		}
		client.query(requete, function(err, result) {
			if(err) {
				return console.log('error running query', err);
			}
			console.log("resultat de la requête : " + result.rows[0]['password']);
			client.end();
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
	req.session.logged = true
	queryPostgres(conf, JSON.parse('{"query" : "/login", "username" : "' + req.body.username + '"}')
	callback('ok')
};

exports.logout=function(req, res, conf, callback){
	req.session.logged = false
	callback('ok')
};

exports.index=function(req, res, conf){
   res.render('index', {address : conf.server.address, port : conf.server.port})
};

exports.gpioManager=function(req, res, conf){
   res.render('gpiomanager', {address : conf.server.address, port : conf.server.port})
};

exports.changerEtatGpio=function(req, res, conf, callback){
	var numeroGpio = req.body['numero']
	var modeGpio = req.body['mode']
	var ret = '{"numero" : "' + numeroGpio + '", "etat" : ' 
	var numeroWiringPi = -1
	
	console.log('Numero du GPIO : ' + numeroGpio)
	
	switch(numeroGpio)
	{
		case "Sept":
			numeroWiringPi = 7
		break;
		case "Onze":
			numeroWiringPi = 0
		break;
		case "Douze":
			numeroWiringPi = 1
		break;
		case "Treize":
			numeroWiringPi = 2
		break;
		case "Quinze":
			numeroWiringPi = 3
		break;
		case "Seize":
			numeroWiringPi = 4
		break;
		case "DixHuit":
			numeroWiringPi = 5
		break;
		case "VingtDeux":
			numeroWiringPi = 6
		break;
	}
	
	console.log('Numero wiringPi du GPIO : ' + numeroWiringPi)
	
	exec("gpio mode " + numeroWiringPi + " " + modeGpio, function(error, stdout, stderr){
		if(error !== null)
		{
			console.log("Erreur lors de la commande gpio mode : " + error)
		}
		else
		{
			console.log("mode du GPIO (stdout) : " + stdout)
			console.log("gpio mode, stderr : " + stderr)
			console.log("Le mode a �t� chang� avec succ�s")
		}
	})
	exec("gpio read " + numeroWiringPi, function(error, stdout, stderr){
		if(error !== null)
		{
			console.log("Erreur lors de la commande gpio read : " + error)
		}
		else
		{
			console.log("Etat du GPIO (stdout) : " + stdout)
			console.log("gpio read, stderr : " + stderr)
			if(stdout == 0)
			{
				exec("gpio write " + numeroWiringPi + " 1", function(error, stdout, stderr){
					if(error !== null)
					{
						console.log("Erreur lors de la commande gpio write " + numeroWiringPi + " 1 : " + error)
					}
					else
					{
						console.log("stdout : " + stdout)
						console.log("stderr : " + stderr)
						console.log("L'�tat du GPIO " + numeroGpio + " a �t� chang� avec succ�s (numero wiring pi : " + numeroWiringPi + ")")
						ret += '1}'
						console.log(ret)
						callback(JSON.parse(ret))
					}
				})
			}
			else if(stdout == 1)
			{
				exec("gpio write " + numeroWiringPi + " 0", function(error, stdout, stderr){
					if(error !== null)
					{
						console.log("Erreur lors de la commande gpio write " + numeroWiringPi + " 0 : " + error)
					}
					else
					{
						console.log("stdout : " + stdout)
						console.log("stderr : " + stderr)
						console.log("L'�tat du GPIO " + numeroGpio + " a �t� chang� avec succ�s")
						ret += '0}'
						console.log(ret)
						callback(JSON.parse(ret))
					}
				})
			}
		}
		
	})
};

exports.getEtatGpios=function(req, res, conf, callback){
	var numeroGpio = ["onze", "douze", "treize", "quinze", "seize", "dixhuit", "vingtdeux", "sept"]
	var ret = '{'
	var cmd
	
	console.log("Debut de la boucle executant la commande 'gpio read'")
	for(var i = 0; i <= 7; i++)
	{
		cmd = 'gpio read ' + i
		console.log('gpio wiring pi : ' + i)
		console.log('appel de la fonction execSync')
		console.log(execSync(cmd))
		
		if(i < 7)
			ret += '"' + numeroGpio[i] + '" : ' + execSync(cmd) + ', '
		else
		{
			ret += '"' + numeroGpio[i] + '" : ' + execSync(cmd) + '}'
		}
	}
	console.log("Etat des GPIOS : " + ret)
	callback(JSON.parse(ret))
};

exports.transmission=function(req, res, conf){
	res.render('transmission', {address : conf.server.address, port : conf.server.port})
};

exports.getListeDD=function(req, res, conf, callback){
	var liste = "{"
	var boolDD = true
	var i = 2
	var cmd = "sudo fdisk -l | grep /dev/sda | sed -n " 
	var stdout = ""
	
	while(boolDD)
	{
		cmd += i + "p"
		console.log("cmd : " + i + " " + cmd)
		stdout = execSync(cmd)
		console.log("stdout : " + i + " " + stdout)
		if(stdout == "")
		{
			boolDD = false
			if(liste != '{')
				liste = liste.substring(0, liste.length - 2) + '}'
			else
				liste += '}'
		}
		else
		{
			liste += '"' + i + '" : "' + stdout + '", '
		}
		cmd = cmd.substring(0, cmd.length - 2)
		i++
	}
	console.log("liste : " + liste)
	callback(JSON.parse(liste.replace(/(\r\n|\n|\r)/gm,"")))
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
