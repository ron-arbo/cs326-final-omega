'use strict';

import { Database } from '../backend/mongo-database';
import { MyServer } from '../backend/myserver-routing';

const theDatabase = new Database('ron-arbo'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT || 8080);
