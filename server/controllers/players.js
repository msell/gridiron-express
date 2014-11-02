var Player = require('mongoose').model('Player'),
  http = require('http');

exports.reloadPlayerData = function(req, res) {
 getByeWeekData();
  //var players = getPlayerData();

  res.sendStatus(202);
};

function getPlayerData(byeWeeks){
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
      var players = JSON.parse(playerData).players.player;
      for(var i=0;i<players.length;i++){
        players[i].bye = getByeFromTeam(byeWeeks, players[i].team);
        getPlayerDetails(players[i]);
      }
    });
  };

  http.request(options, callback).end();

}

function getByeFromTeam(byeWeeks, team){
  for(var i=0;i<byeWeeks.length;i++){
    if(team === byeWeeks[i].team){
      return byeWeeks[i].byeWeek;
    }
  }
};
function getByeWeekData() {
  var rawData = '';
  var byeWeeks = [];
  var options = {
    host: 'www.fantasyfootballnerd.com',
    port: 80,
    path: '/service/byes/json/k3bppf468tzs',
    method: 'GET'
  };
  var callback = function (response) {
    response.on('data', function (chunk) {
      rawData += chunk;
    });

    response.on('end', function () {
      byeWeekData = JSON.parse(rawData);
      for(var propertyName in byeWeekData)
      {
        byeWeekData[propertyName].map(function(x){
          byeWeeks.push(x);
        });
      }
      getPlayerData(byeWeeks);
    });
  };

    http.request(options, callback).end();
}


  function getPlayerDetails(player) {
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
        player.details = JSON.parse(playerDetails).players.player;
        console.log(player);
      });
    };

      http.request(options, callback).end();

      return playerDetails;
  }

