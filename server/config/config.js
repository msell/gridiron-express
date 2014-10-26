var
    path = require( 'path' ),
    rootPath = path.normalize( __dirname + '/../../' );

module.exports = {
    development:{
        rootPath: rootPath,
        db: 'mongodb://localhost/gridiron',
        port: process.env.PORT || 3000,
        passport: {},
        winston: {
            level: 'info',
            silent: false,
            colorize: true,
            timestamp: false
        }
    },
    production:{
        rootPath: rootPath,
        db: 'mongodb://wut',
        port: process.env.PORT || 80,
        passport: {},
        winston: {
            level: 'info',
            silent: false,
            colorize: false,
            timestamp: false
        }
    }
};
