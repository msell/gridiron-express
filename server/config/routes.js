var auth = require('./auth'),
    users = require('../controllers/users'),
    players = require('../controllers/players'),
    franchises = require('../controllers/franchises'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/franchises', franchises.getFranchises);
    app.get('/api/franchises/:id', franchises.getFranchiseById);

    app.post('/api/reloadPlayerData' , players.reloadPlayerData);

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.get('/', function(req,res){
        res.redirect('./app');
    });

    app.all('/api/*', function(req, res) {
        res.send(404);
    });
}
