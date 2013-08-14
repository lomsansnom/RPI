var fs = require ( 'fs' );

/**
 * Read the conf file and parse it as a JSON object
 */
exports.getConfigurationFile = function ( ) {
	const CONF_PATH = './conf.json';

	return JSON.parse ( fs.readFileSync ( CONF_PATH, 'utf8' ).toString ( ) );
};