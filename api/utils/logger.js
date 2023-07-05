const {createLogger, format, transports} = require ('winston');

module.exports = createLogger ({
	format: format.combine(
		format.simple(),
		format.timestamp(),
		format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
	),
	transports :[
		new transports.File({ /// destino donde va el archivo
			maxsize:5120000, 
			maxFiles: 5, // max de archivo
			filename: `${__dirname}/../logs/log-api.log`
		}),
		new transports.Console({
			level: 'debug'
		})
	]
});