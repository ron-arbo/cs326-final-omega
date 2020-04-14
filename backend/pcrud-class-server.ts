'use strict';
​
import { Database } from './level-database';
import { MyServer } from './myserver';
​
const theDatabase = new Database('counter-db');
const theServer = new MyServer(theDatabase);
​
theServer.listen(8080);