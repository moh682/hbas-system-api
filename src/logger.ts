import winston, { format } from 'winston';
const { combine, timestamp, prettyPrint } = format;
import rootPath from 'app-root-path';

const logger = winston.createLogger({
	exceptionHandlers: new winston.transports.File({ filename: 'exceptions.log', dirname: rootPath + '/logs' }),
	transports: [
		new winston.transports.File({
			filename: 'error.log',
			dirname: rootPath.path + '/logs',
			level: 'error',
			format: combine(timestamp(), prettyPrint())
		}),
		new winston.transports.File({
			filename: 'info.log',
			dirname: rootPath.path + '/logs',
			level: 'info',
			format: combine(timestamp(), prettyPrint())
		}),
		new winston.transports.File({
			filename: 'debug.log',
			dirname: rootPath.path + '/logs',
			level: 'debug',
			format: combine(timestamp(), prettyPrint())
		})
	]
});

export default logger;
