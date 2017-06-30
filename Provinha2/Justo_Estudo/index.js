// Roberto Pommella Alegro - 8936756
// Provinha 2 de Introdução ao Desenvolvimento Web

const express = require("express");
const fs = require("fs");

const port = 3000;
const app = express();

app.listen(port, 'localhost', () => {
	console.log('Listening on port ' + port + '!');
});

// Add CORS and content-type to all requests
function corsJson(req, resp, next) {
	resp.setHeader('Access-Control-Allow-Origin', '*');
	resp.setHeader('Content-Type', 'application/json');
	next();
}

const logFilename = 'log.log';
const logSeparator = '|';

// Log manager
class Logger {
	static middleware(request, response, next) {
		const log = {
			timestamp: new Date(),
			service: request.path.replace('/', '')
		};
		let toWrite = JSON.stringify(log);
		fs.stat(logFilename, (err, stats) => {
			if (!err && stats.size > 0) {
				toWrite = logSeparator + toWrite;
			}
			fs.writeFile(logFilename, toWrite, { flag: 'a' }, (err) => {
				if (err) {
					return console.error(err);
				}
				next();
			});
		});
	}
	static get(callback) {
		fs.readFile(logFilename, (err, data) => {
			const log = data.toString();
			const logs = log.split(logSeparator).map(l => {
				if (l === '')
					return;
				return JSON.parse(l);
			});
			callback(logs);
		});
	}
}

// Setup middlewares
// Enable CORS and use content-type json
app.use(corsJson);
// Enable logger
app.use(Logger.middleware);

// ENDPOINTS
app.get('/mean', (request, response) => {
	const data = request.query.data;
	const numbers = data.split(',').map(n => parseInt(n));
	const sum = numbers.reduce((prev, cur) => {
		return prev + cur;
	});
	const mean = sum / numbers.length;
	// use string because the assignment example uses string
	response.send({ mean: ('' + mean) });
});

app.get('/nusp', (request, response) => {
	response.send({ nusp: '8936756' });
});

app.get('/log', (request, response) => {
	Logger.get(log => response.send(JSON.stringify(log)));
});
