var Player = require('mongoose').model('Player'),
  http = require('http');

exports.reloadPlayerData = function(req, res){
  var byeOptions = {
    host: 'www.fantasyfootballnerd.com',
    port: 80,
    path: '/service/byes/json/k3bppf468tzs',
    method: 'GET'
  };

  var byeWeekData = '';

  var byeWeeksCallback = function(response){
    response.on('data', function(chunk){
      byeWeekData += chunk;
    });

    response.on('end', function(){
      console.log(byeWeekData);
    });
  }

  var playerOptions = {
    host: 'myfantasyleague.com',
    port: 80,
    path: '/2014/export/export?TYPE=players&JSON=1',
    method: 'GET'
  };

  var playerData = '';
  var playersCallback = function(response){
    response.on('data', function(chunk){
      playerData += chunk;
    });

    response.on('end', function(){
      console.log(playerData);
    });
  }

  http.request(byeOptions, byeWeeksCallback).end();
  http.request(playerOptions, playersCallback).end();
  res.sendStatus(202);

};
