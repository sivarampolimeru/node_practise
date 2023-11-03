var http = require('http');
var url = require('url');

http.createServer(function (req,res){
	var q = url.parse(req.url,true);
	console.log(q.host);
	res.write(q);
	res.end();
}).listen(3105);