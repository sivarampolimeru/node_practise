var http = require('http');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');
var parse_string = require('querystring');
var axios = require('axios');


var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "test"
});

con.connect(function (err){
	if (err) throw err;
	console.log("db connected successfully!");
});

http.createServer(function (req,res){
	fs.readFile('add_data.html',function (err,data){
		var pathname = url.parse(req.url,true);
		if (err) throw err;
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(data);
		if (req.method == 'POST') {
			let values = '';

			req.on('data',chunk => {
				values += chunk;
			});
			req.on('end',() => {
				values = parse_string.parse(values);
				console.log(values.name);
				console.log(values.desg);
				console.log(values.mobile);
				
				var sql = "INSERT INTO team (name, desg, mobile) VALUES ('"+values.name+"','"+values.desg+"','"+values.mobile+"')";
				
				con.query(sql,function (err,result){
					if (err) throw err;
					console.log("inserted successfully!");
					document.getElementById('success_msg').innerHTML = "Inserted successfully!";
					//res.write("inserted successfully!");
					return false;
				});
				res.end();
			})
		}
		res.end();
	});
}).listen(7485);