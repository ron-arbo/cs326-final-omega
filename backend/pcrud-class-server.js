'use strict';
exports.__esModule = true;
var level_database_1 = require("./level-database");
var myserver_1 = require("./myserver");
var theDatabase = new level_database_1.Database('counter-db');
var theServer = new myserver_1.MyServer(theDatabase);
theServer.listen(8080);
