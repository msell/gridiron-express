var Player = require('mongoose').model('Player'),
  http = require('http');

exports.reloadPlayerData = function(req, res){
  var options = {
    host: 'www.fantasyfootballnerd.com',
    port: 80,
    path: '/service/byes/json/k3bppf468tzs',
    method: 'GET'
  };

  var callback = function(response){
    var str = '';
    response.on('data', function(chunk){
      str += chunk;
    });

    response.on('end', function(){
      console.log(str);
    });
  }

  http.request(options, callback).end();

  res.sendStatus(202);

};
