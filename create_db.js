var mysql = require('mysql');

var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "test"
});

con.connect(function (err){
	if (err) throw err;
	console.log('connected!');

	var sql = "INSERT INTO team (name, desg, mobile) VALUES ('Sivaram' , 'developer', '7898798846')";

	con.query(sql,function (err,result){
		if (err) throw err ;
		console.log(result);
		console.log('inserted');
	});
});