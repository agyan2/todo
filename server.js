//Abhinav Test application
//Made changes to include mongoose setup
// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var mongoose = require('mongoose');
    var swagger = require('swagger-express');
   

// configuration =================

    mongoose.connect('mongodb://localhost:27017/');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());



    
//Configure routes
 app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:8080',
    apis: ['./api.js'],
    middleware: function(req, res){}
  }));
 
	app.use(require('./api'));
	app.use(require('./web'));


 

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
