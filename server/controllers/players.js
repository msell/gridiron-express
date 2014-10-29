var Player = require('mongoose').model('Player');

exports.reloadPlayerData = function(req, res){
  console.log('do stuff here..');
  res.send(202);

};
