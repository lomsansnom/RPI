 var fs = require('fs')
 , path = require('path')
 , exec= require('child_process').exec
 
 
exports.index=function(req, res, conf, log){
   res.render('index', {address : conf.server.address, port : conf.server.port})
};

exports.gpioManager=function(req, res, conf, log){
   res.render('gpiomanager', {address : conf.server.address, port : conf.server.port})
};

