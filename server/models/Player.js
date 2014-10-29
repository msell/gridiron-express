var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
  name : {type:String, required:'{Path} is required}'},
  mflId : {type:String, required:'{Path} is required}'},
  team : {type:String, required:'{Path} is required'},
  position : {type:String, required:'{Path} is required'},
  bye : {type:Number, required: '{Path} is required'}
});

var Player = mongoose.model('Player', playerSchema);

function initializePlayerData(){
  console.log('initialize player data requested...');
};

exports.initializePlayerData = initializePlayerData;

