var Franchise = require('mongoose').model('Franchise');

exports.getFranchises = function(req, res) {
    Franchise.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getFranchiseById = function(req, res) {
    Franchise.findOne({_id:req.params.id}).exec(function(err, course) {
        res.send(course);
    })
}