var request = require('request');
var express = require('express');
var app = express();

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

// Configure the request


app.get('/',function(req,res){
	var options = {
	    url: 'http://192.168.3.179/',
	    method: 'GET',
	    port:8080,
	    headers: headers,
	    qs: {'direction': req.query.direction}
	}
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        res.send(body);
	    }
	})
});

// Start the request

app.listen(process.env.PORT || 8585);
console.log('API Server Listening on port 8585...');
