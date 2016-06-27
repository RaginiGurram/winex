
	var express = require('express');
	var app = express();
	var url = require('url');

	var com = require("serialport");

	var serialPort = new com.SerialPort("COM3", {
		baudrate: 9600,
		parser: com.parsers.readline('\r\n')
	});

	var v = ['a','b',
	'c','d','e','f','g','h',
	'i','j','k','l','m','n',
	'o','p','q','r','s','t',
	'u','v','w','x','y','z',
	'A','B','C','D','E','F',
	'G','H','I','J','K','L',
	'M','N','O','P','Q','R',
	'S','T','U','V','W','X',
	'Y','Z','0','1','3','4'];

	var k = [0,1,
	1000,1001,1010,1011,1020,1021,
	2000,2001,2010,2011,2020,2021,
	3000,3001,3010,3011,3020,3021,
	4000,4001,4010,4011,4020,4021,
	5000,5001,5010,5011,5020,5021,
	6000,6001,6010,6011,6020,6021,
	7000,7001,7010,7011,7020,7021,
	8000,8001,8010,8011,8020,8021,
	9000,9001,9010,9011,9020,9021];
	var r = 0, g = 1, b = 2, on = 1, off = 0;

	function setled(led,color,state)
	{
		console.log("in Led");
		var key = led * 1000 + color * 10 + state;
		console.log("setting key to "+key);
		for (var i = 0; i < 56; i++) 
		{
			if (key == k[i])
			{
				serialPort.write(v[i]);
				//console.log('key='+key);
				//console.log('wrote data 1',v[i]);
				break;
			}
		}
	}

	function led(state)
	{
		var key = state;
		for (var i = 0; i < 56; i++)
		{
			if (key == k[i])
			{
	        	// serialPort.Open();
	         	serialPort.write(v[i]);
				console.log('key='+key);
	         	console.log('wrote data 2',v[i]);
	         	break;
            }
        }
    }

    function topSellers(id) 
    {
    	led(0);
    	if(id == 0) 
    	{
    		purpleLed(1);
    		purpleLed(5);
    	}
    	else 
    	{
    		purpleLed(id);
    	}
    	//purpleLed(6);
    }
    function fineWines(id)
    {
    	led(0);
    	if(id == 0) 
    	{
    		redLed(2);
    		redLed(5);
    		redLed(6);
    	}
    	else 
    	{
    		redLed(id);
    	}

    }
    function winesOfWeek(id) 
    {
    	led(0);
    	if(id == 0) 
    	{
    		greenLed(5);
    		greenLed(9);
    	}
    	else 
    	{
    		greenLed(id);
    	}
    }
	function newWines(id) 
    {
    	led(0);
    	if(id == 0) 
    	{
    		blueLed(7);
    	}
    	else 
    	{
    		blueLed(id);
    	}
    }
	function finest(id) 
    {
    	led(0);
    	if(id == 0) 
    	{
    		blueLed(4);
    		blueLed(5);
    	}
    	else 
    	{
    		blueLed(id);
    	}
    }

    function purpleLed(l)
	{
		setled(l, r, 1);
		setled(l, g, 0);
		setled(l, b, 1);
	}
	function yellowLed(l)
	{
		setled(l, r, 1);
		setled(l, g, 1);
		setled(l, b, 0);
	}
	function whiteLed(w)
	{
		setled(w, r, 1);
		setled(w, g, 1);
		setled(w, b, 1);
	}
	function greenLed(n)
	{
		setled(n, r, 0);
		setled(n, g, 1);
		setled(n, b, 0);
	}
	function blueLed(d)
	{
		setled(d, r, 0);
		setled(d, g, 0);
		setled(d, b, 1);
	}
	function redLed(m)
	{
		setled(m, r, 1);
		setled(m, g, 0);
		setled(m, b, 0);
	}
	function favoriteLed(f)
	{
		setled(f, r, 0);
		setled(f, g, 1);
		setled(f, b, 1);
	}
	function clear()
	{
		led(0);
	}

	serialPort.on('open',function() {
		console.log('Port open');
	});

	serialPort.on('data', function(data) {
		console.log(data);
	});
	
	serialPort.on('error', function(data) {
		console.log(data);
	});
	
	app.get('/topsellers/:id', function(req, res) {
		var id = req.params.id;
	    topSellers(id);
		res.send('done');
	});
	app.get('/finewines/:id', function(req, res) {
		var id = req.params.id;
	    fineWines(id);
		res.send('done');
	});
	app.get('/winesofweek/:id', function(req, res) {
		var id = req.params.id;
	    winesOfWeek(id);
		res.send('done');
	});
	app.get('/newwines/:id', function(req, res) {
		var id = req.params.id;
	    newWines(id);
		res.send('done');
	});
	app.get('/finest/:id', function(req, res) {
		var id = req.params.id;
	    finest(id);
		res.send('done');
	});
	app.get('/clear', function(req, res) {
		clear();
		res.send('done');
	});

	app.get('/led/:id', function(req, res) {
		var url_parts = url.parse(req.url, true);
	    var query = url_parts.query;
	    var id = req.params.id;
	    var cmd = query.cmd;
	    switch(cmd)
	    {
			case 'clear':
				led(0);
				break;
				
			case 'purple':
				led(0);
				purpleLed(id);
				break;
			
			case 'yellow':
				led(0);
				yellowLed(id);

			case 'white':
				led(0);
				whiteLed(id);
				break;
				
			case 'green':
				led(0);
				greenLed(id);
				break;	
			
			case 'red':
				led(0);
				redLed(id);
				break;
		
			case 'blue':
				led(0);
				blueLed(id);
				break;

			default:
				led(0);
				break;
		}
			//serialPort.close();
		 // var respPage='<html><head><script>function loaded(){window.setTimeout(CloseMe, 500);}function CloseMe() {    window.close();}</script></head><body onLoad="loaded()">Done!</body>';
		var respPage="done";
		res.send(respPage);	
	
	});
    app.use(express.static(__dirname + '/public'));
	app.listen(3001);
	console.log('API Server Listening on port 3000...');