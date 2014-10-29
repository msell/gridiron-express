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
      console.log('got bye week data');
      // get players
      var playerOptions = {
        host: 'myfantasyleague.com',
        port: 80,
        path: '/2014/export/export?TYPE=players&JSON=1',
        method: 'GET'
      };

      var playerData = '';
      var playersCallback = function(playerResponse){
        playerResponse.on('data', function(chunk){
          playerData += chunk;
        });

        playerResponse.on('end', function(){
          console.log('got players');
          var players = JSON.parse(playerData).players.player;
          console.log('MFL returned ' + players.length + ' players');
          players.map(function(player){
            // get details.
            // map details and bye week to player
            var playerDetailOptions = {
              host: 'myfantasyleague.com',
              port: 80,
              path: '/2014/export/export/?TYPE=players&JSON=1&PLAYERS=' + player.id + '&DETAILS=1'
            };
            var playerDetails = '';
            var detailsCallback = function(detailResponse){
              detailResponse.on('data', function(chunk){
                playerDetails += chunk;
              });

              detailResponse.on('end', function(){
                console.log('got details');
                playerDetails = JSON.parse(playerDetails).players.player;
                //Player.create()
              });
            };
            // need to await the previous request or face epic fail
            http.request(playerDetailOptions, detailsCallback).end();
          });
        });
      };

      http.request(playerOptions, playersCallback).end();
    });
  };

  http.request(byeOptions, byeWeeksCallback).end();

  res.sendStatus(202);

};
