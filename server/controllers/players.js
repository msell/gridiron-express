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
      var fantasyPlayers = players.filter(isFantasyPlayer);

      for(var i=0;i<fantasyPlayers.length;i++){

        fantasyPlayers[i].bye = getByeFromTeam(byeWeeks, fantasyPlayers[i].team);
        getPlayerDetails(fantasyPlayers[i]);
      }
    });
  };

  http.request(options, callback).end();

  function isFantasyPlayer(p){
    return p.position.toUpperCase() === 'DEF' ||
      p.position.toUpperCase() === 'QB' ||
      p.position.toUpperCase() === 'RB' ||
      p.position.toUpperCase() === 'WR' ||
      p.position.toUpperCase() === 'PK' ||
      p.position.toUpperCase() === 'TE'
  }
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
        var details = JSON.parse(playerDetails).players.player;
        player.name = details.name;
        player.details = details;
        if(player.bye) {
          var p = new Player();
          console.log(player.id + " : " + player.bye + " : " + details.position);
          p.name = details.name;
          p.bye = player.bye;
          p.team = player.team;
          p.mflId = player.id;
          p.position = details.position;
          p.save();
        }
      });
    };

      http.request(options, callback).end();
  }

