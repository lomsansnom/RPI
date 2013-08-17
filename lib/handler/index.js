 var fs = require('fs')
 , path = require('path')
 , exec= require('child_process').exec
 
 
exports.index=function(req, res, conf){
   res.render('index', {address : conf.server.address, port : conf.server.port})
};

exports.gpioManager=function(req, res, conf){
   res.render('gpiomanager', {address : conf.server.address, port : conf.server.port})
};

exports.changerEtatGpio=function(req, res, conf, callback){
	numeroGpio = req.body['numero']
	modeGpio = req.body['mode']
	ret = '{"numero" : "' + numeroGpio + '", "etat" : ' 
	console.log('Numero du GPIO : ' + numeroGpio)
	numeroWiringPi = -1
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

