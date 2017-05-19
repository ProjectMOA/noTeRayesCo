var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.static('public'));

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : process.env.MYSQL_DB
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/getVisits', function(req,res){
    var nVisits = 0;
    connection.query('SELECT visits FROM stats', function (error, results, fields) {
        if (error) throw error;
        nVisits = results + 1;
        res.end(JSON.stringify(nVisits));
        console.log("GetVisits: " + nVisits);
        connection.query('UPDATE stats SET ?', {visits: nVisits}, function (error, results, fields) {
            if (error) throw error;
        });
    });

});

var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    var host = server.address().address;
    console.log("Server running on http://" + host + ":" +port);
});
