//Gabriel Scalet Bicalho, 8937204

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.listen(port, "localhost", ()=>{
	//console.log("listening on port " + port);
});

app.get("/mean", (request, response)=>{
	add_log("mean")
	
	let mean = 0
	
	let list = request.query.data;
	if(list){
		if(list[list.length - 1] == ","){
			list = list.substring(0, list.length - 1);
		}
		
		let arr = list.split(",");
		
		for(let i = 0; i < arr.length; i++){
			mean += parseFloat(arr[i]);
		}
		mean /= arr.length;
	}
	
	response.setHeader("Content-Type", "application/json");
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.send({ mean: mean + "" });
});

app.get("/nusp", (request, response)=>{
	add_log("nusp")
	
	const nusp = 8937204;
	
	response.setHeader("Content-Type", "application/json");
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.send({ nusp: nusp + "" });
});

app.get("/log", (request, response)=>{
	fs.readFile('log_file.txt', function (err, data) {
		let log_list = [];
		if (err) {
			// File hasn't been created yet 
		}else{
			let list = data.toString();
			if(list.length && list[list.length - 1] == ","){
				list = list.substring(0, list.length - 1);
				
				list = "{ \"logs\":[" + list + "]}";
				
				let obj = JSON.parse(list);
				if(obj && obj.logs){
					log_list = obj.logs;
				}
			}
		}
		
		response.setHeader("Content-Type", "application/json");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.send(log_list);
		
		add_log("log")
	});
});


function add_log(function_name){
	let log_obj = {};
	log_obj["timestamp"] = new Date().toJSON();
	log_obj["service"] = function_name;
	
	fs.appendFile("log_file.txt", "\n" + JSON.stringify(log_obj) + ",");
}





