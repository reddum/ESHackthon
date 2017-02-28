var express = require('express');
var request = require("request");
var btoa = require("btoa");
var querystring = require('querystring');
var app = express();

function getRandomArbitrary(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
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
  console.log("/branches");
    var params = {
        client_id: "3a6c1054-fc3a-48cb-805e-af6e96a49598"
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
      else {
        console.log("[Error][Branches]", error);
      }
    }

    request(options, callback);
});

app.get('/market', function(req, res) {
    //plan=4&risk=01&invest_time=0&age=30
    var params = {
        client_id: "3a6c1054-fc3a-48cb-805e-af6e96a49598",
        risk: "01",
        invest_time: "0",
        age: "30",
        plan: "4"
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

app.get('/oauth/authorize', function(req, res) {

    var client_id = "3a6c1054-fc3a-48cb-805e-af6e96a49598";
    var client_secret = "wS8wY5hT2bR7yU0eA3cS0pU6eN0dU4qH8tL2iN3oQ2jE7wV8sB";
    var username = "B204449696";
    var password = "265434";
    var auth_value = btoa(client_id + ":" + client_secret);
    console.log("[Debug][Authorization][Value]::" + auth_value);

    var params = {
        authorization: auth_value,
        grant_type: "password",
        username: username,
        password: password,
        scope: "/user"
    }

    var formData = querystring.stringify(params);
    var contentLength = formData.length;

    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'https://eospu.esunbank.com.tw/esun/bank/user/oauth/authorize',
        body: formData,
        method: 'POST'
    }, function(err, res, body) {
        if (!error && response.statusCode == 200) {
            console.log("[Debug][API][/oauth/authorize][Response]::" + body);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.parse(body));

        }
    });

});

app.get('/speech', function(req, res) {
<<<<<<< Updated upstream
    res.sendFile(__dirname + '/public/eusansystem.html');
=======
	res.sendFile(__dirname + '/public/eusansystem.html');
});	

app.listen(80, function () {
  console.log('Example app listening on port 80!');
>>>>>>> Stashed changes
});

app.listen(8000, function() {
    console.log('Example app listening on port 80!');
});