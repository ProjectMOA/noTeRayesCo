var express = require('express');
var app = express();
var nVisits = 0;
app.use(express.static('public'));

app.get('/getVisits', function(req,res){
    nVisits++;
    res.end(JSON.stringify(nVisits));
    console.debug("GetVisits: %d",nVisits);

});

var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    var host = server.address().address;
    console.log("Server running on http://%s:%s",host,port);
});
