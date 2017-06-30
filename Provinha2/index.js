/*
		ALUNO: GABRIEL HENRIQUE CAMPOS SCALICI
		NUMERO: 9292970

*/

const express = require("express");
const fs = require("fs");
const port_host = 3000;
const app = express();

//verificando a porta de entrada
app.listen(port_host, 'localhost', () => {
	console.log(port_host);
});


//Armazenando os logs do sistema
class Logger {
	static middleware(request, response, next) {
		const log = {
			timestamp: new Date(),
			service: request.path.replace('/', '')
		};

		//armazenando para onde vai
		let armazena_end = JSON.stringify(log);
		fs.stat("lista.log", (erro, stats) => {
			if (!erro && stats.size > 0) {
				armazena_end = '|' + armazena_end;
			}
			fs.writeFile("lista.log", armazena_end, { flag: 'a' }, (erro) => {
				next();
			});
		});
	}
	static get(callback) {
		fs.readFile("lista.log", (erro, dados) => {
			const log = dados.toString();
			const logs = log.split('|').map(l => {
				if (l === '')
					return;
				return JSON.parse(l);
			});
			callback(logs);
		});
	}
}

app.use(Logger.middleware);

//MEDIANA
app.get('/median', (request, response) => {
	//pegando as informacoes
	const dados = request.query.dados;
	const valores = dados.split(',').map(n => parseInt(n));
	//ordenando a lista
	valores.sort((a,b) => { return a > b; });

	//pegando o valor do meio
	const pos = (valores.length / 2) - 1;
	pos = Math.ceil(pos);
	const res = numbers[pos];


	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'application/json');
	response.send({ median: res + "" });
});

//NUMERO USP
app.get('/nusp', (request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'application/json');
	response.send({ nusp: '9292970' });
});

//LOG
app.get('/log', (request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'application/json');
	//imprimindo a lista de logs
	Logger.get(log => response.send(JSON.stringify(log)));
});
