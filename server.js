var express = require('express'),
    chalk = require('chalk');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app, config);

app.listen(config.port);

console.log(chalk.green('listening on port ' + config.port + '...'));