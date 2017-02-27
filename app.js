var express = require('express');
var request = require("request");
var app = express();

function getRandomArbitrary(min, max) {
    var number= Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString();
}

app.use(express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});	

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});	

app.get('/branches', function(req, res) {
    var params = {
        client_id : "3a6c1054-fc3a-48cb-805e-af6e96a49598"
    }
    var options = {
      url: 'https://eospu.esunbank.com.tw/esun/bank/location/branches?',
      qs: params
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.parse(body));       
      }
    }

    request(options, callback);
});	

app.get('/market', function(req, res) {
    //plan=4&risk=01&invest_time=0&age=30
    var params = {
        client_id : "3a6c1054-fc3a-48cb-805e-af6e96a49598",
        risk : "01",
        invest_time : "0",
        age : "30",
        plan : "4" 
    }
    var options = {
      url: 'https://eospu.esunbank.com.tw/esun/bank/information/robot_insight?',
      qs: params
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.parse(body));
      }
    }
    request(options, callback);
}); 


/*
app.get('/oauth/authorize',function(req,res){
var params = {    
        authorization : "",
        grant_type : "",
        username : "",
        password : "",
        scope : "" 
    }
    var options = {
      url: 'https://eospu.esunbank.com.tw/esun/bank/user/oauth/authorize?',
      body: params
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.parse(body));
             
      }
    }

    request(options, callback);

});*/


app.get('/speech', function(req, res) {
	res.sendFile(__dirname + '/public/eusansystem.html');
});	

app.listen(8000, function () {
  console.log('Example app listening on port 80!');
});

