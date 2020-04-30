'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-routing';

const theDatabase = new Database('aryan'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT || 8080);
