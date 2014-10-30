var Player = require('mongoose').model('Player'),
  http = require('http');

exports.reloadPlayerData = function(req, res) {
  getByeWeekData();
  var players = getPlayerData();
  

  res.sendStatus(202);
};


function getByeWeekData() {
  var byeWeekData = '';

  var options = {
    host: 'www.fantasyfootballnerd.com',
    port: 80,
    path: '/service/byes/json/k3bppf468tzs',
    method: 'GET'
  };
  var callback = function (response) {
    response.on('data', function (chunk) {
      byeWeekData += chunk;
    });

    response.on('end', function () {
      console.log('got bye week data');
    });
  };

    http.request(options, callback).end();

    return byeWeekData;
}
  function getPlayerData(){
    var playerData = '';
    var players = [];
    var options = {
      host: 'myfantasyleague.com',
      port: 80,
      path: '/2014/export/export?TYPE=players&JSON=1',
      method: 'GET'
    };

    var callback = function(response) {
      response.on('data', function (chunk) {
        playerData += chunk;
      });

      response.on('end', function () {
        console.log('got players');
        var players = JSON.parse(playerData).players.player;
        console.log('MFL returned ' + players.length + ' players');
      });
    };

      http.request(options, callback).end();

    return players;
  }

  function getPlayerDetails(playerId) {
    var playerDetails = '';

    var options = {
      host: 'myfantasyleague.com',
      port: 80,
      path: '/2014/export/export/?TYPE=players&JSON=1&PLAYERS=' + player.id + '&DETAILS=1'
    };

    var callback = function(detailResponse){
      detailResponse.on('data', function(chunk){
        playerDetails += chunk;
      });

      detailResponse.on('end', function(){
        console.log('got details');
        playerDetails = JSON.parse(playerDetails).players.player;
        //Player.create()
      });
    };

      http.request(options, callback).end();

      return playerDetails;
  }

