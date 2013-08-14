var http = require ( 'http' );
http.globalAgent.maxSockets = 1000;

/**
 * Start the server.
 * 
 * @param app
 *            {Express Object} Express instance.
 * @param port
 *            {String} Server port.
 */
exports.start = function ( app, port, ioptions ) {
	/*
	 * Start the server
	 */
	http.createServer ( app ).listen ( port );    
}