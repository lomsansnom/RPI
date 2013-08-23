 var fs = require('fs')
 , path = require('path')
 , exec = require('child_process').exec
 , ffi = require('node-ffi')
 
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
			console.log("Le mode a été changé avec succès")
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
					if(error != null)
					{
						console.log("Erreur lors de la commande gpio write " + numeroWiringPi + " 1 : " + error)
					}
					else
					{
						console.log("stdout : " + stdout)
						console.log("stderr : " + stderr)
						console.log("L'état du GPIO " + numeroGpio + " a été changé avec succès (numero wiring pi : " + numeroWiringPi + ")")
						ret += '1}'
						console.log(ret)
						callback(JSON.parse(ret))
					}
				})
			}
			else if(stdout == 1)
			{
				exec("gpio write " + numeroWiringPi + " 0", function(error, stdout, stderr){
					if(error != null)
					{
						console.log("Erreur lors de la commande gpio write " + numeroWiringPi + " 0 : " + error)
					}
					else
					{
						console.log("stdout : " + stdout)
						console.log("stderr : " + stderr)
						console.log("L'état du GPIO " + numeroGpio + " a été changé avec succès")
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
	var liste = "{ "
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
			liste = liste.substring(0, liste.length - 1) + '}'
		}
		else
		{
			liste += i + ': "' + stdout + '", '
		}
		cmd = cmd.substring(0, cmd.length - 2)
		i++
	}
	console.log("liste : " + liste)
	callback(JSON.parse(liste))
};