var mongoose = require('mongoose');

var franchiseSchema = mongoose.Schema({
    name: {type:String, required:'{PATH} is required'}
});

var Franchise = mongoose.model('Franchise', franchiseSchema);

function createDefaultFranchises(){
    Franchise.find({}).exec(function(err, collection){
        if(collection.length === 0){
            Franchise.create({name: 'Dumb Punts'});
            Franchise.create({name: 'Stinky Taco'});
            Franchise.create({name: 'Facebook Warriors'});
        }
    })
}

exports.createDefaultFranchises = createDefaultFranchises;