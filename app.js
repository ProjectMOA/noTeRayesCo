var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.static('public'));

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
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
    connection.query('SELECT value FROM stats WHERE stats.id_stat=\'visits\'', function (error, results, fields) {
        if (!error) {
            console.log(results[0].value);
            nVisits = results[0].value + 1;
            res.send(JSON.stringify(nVisits));
            var sql = 'UPDATE stats SET value=' + nVisits + ' WHERE id_stat=\'visits\'';
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    console.error("Couldn't update visits from databse.");
                }
            });
        } else {
            nVisits = 'unos cuantos'
            res.send(JSON.stringify(nVisits));
            console.error("Couldn't retrieve visits from databse.");
        }
        
    });
});

var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    var host = server.address().address;
    console.log("Server running on http://" + host + ":" +port);
});
