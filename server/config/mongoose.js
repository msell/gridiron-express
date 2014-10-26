var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    franchiseModel = require('../models/Franchise');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('gridiron db opened');
    });

    userModel.createDefaultUsers();
    franchiseModel.createDefaultFranchises();

};

