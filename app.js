var express = require('express');
var app = express();
var visitCount = 0;
app.use(express.static('public'));

app.get('/', function(req,res){
    visitCount++;
    res.sendFile( __dirname + "/" + "index.html" );
});

var server = app.listen(8080, function(){
    var port = server.address().port;
    var host = server.address().address;
    console.log("Servidor corriendo en http://%s:%s",host,port);
});
