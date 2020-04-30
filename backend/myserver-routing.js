"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require('http');
var url = require('url');
var express = require('express');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = 8080 || process.env.PORT;
        this.router = express.Router();
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use('/', express.static('html'));
        this.server.use('/pages', express.static('pages'));
        this.server.use('/assets', express.static('assets'));
        this.server.use('/backend', express.static('backend'));
        //handle POST in JSON format
        this.server.use(express.json());
        //Project-related endpoints
        this.router.post('/users/:userId/createProject', this.createHandler.bind(this));
        this.router.post('/users/:userId/readProject', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
        this.router.post('/users/:userId/updateProject', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
        this.router.post('/users/:userId/deleteProject', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        //Profile-related endpoints
        this.router.post('/users/:userId/createProfile', this.createProfileHandler.bind(this));
        this.router.post('/users/:userId/readProfile', [this.errorHandler.bind(this), this.readProfileHandler.bind(this)]);
        this.router.post('/users/:userId/updateProfile', [this.errorHandler.bind(this), this.updateProfileHandler.bind(this)]);
        this.router.post('/users/:userId/deleteProfile', [this.errorHandler.bind(this), this.deleteProfileHandler.bind(this)]);
        //Other endpoints
        this.router.post('/users/:userId/allProjects', [this.findAllProjects.bind(this)]);
        // Set a fall-through handler if nothing matches.
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ result: 'command-not-found' }));
                return [2 /*return*/];
            });
        }); });
        // Start up the counter endpoint at '/codetogether'.
        this.server.use('/codetogether', this.router);
    }
    //ERROR Handler
    MyServer.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.isFound(request.body.name)];
                    case 1:
                        value = _a.sent();
                        //	console.log("result from database.isFound: " + JSON.stringify(value));
                        //Check that value is found, if not respond to client with error, if so, continue to next handler
                        if (!value) {
                            response.write(JSON.stringify({ result: 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //CREATE Handlers
    MyServer.prototype.createHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createProject(request.body.projectName, request.body.projectDescription, request.body.projectWorkers, request.body.projectProgress, request.body.projectLinks, request.body.projectNumWorkers, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createProfileHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createProfile(request.body.profileID, request.body.email, request.body.password, request.body.firstName, request.body.lastName, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //READ Handlers
    MyServer.prototype.readHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readProject(request.body.projectName, request.body.projectDescription, request.body.projectWorkers, request.body.projectProgress, request.body.projectLinks, request.body.projectNumWorkers, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readProfileHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readProfile(request.body.profileID, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //UPDATE Handlers
    MyServer.prototype.updateHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateProject(request.body.projectName, request.body.projectDescription, request.body.projectWorkers, request.body.projectProgress, request.body.projectLinks, request.body.projectNumWorkers, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateProfileHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateProfile(request.body.profileID, request.body.email, request.body.password, request.body.firstName, request.body.lastName, request.body.bio, request.body.about, request.body.projects, request.body.links, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //DELETE Handlers
    MyServer.prototype.deleteHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteProject(request.body.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteProfileHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteProfile(request.body.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Listener
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    //CREATE Functions
    MyServer.prototype.createProject = function (projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Put new project in database
                    return [4 /*yield*/, this.theDatabase.put(projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers)];
                    case 1:
                        //Put new project in database
                        _a.sent();
                        //Respond to client
                        response.write(JSON.stringify({
                            result: 'created',
                            name: projectName
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createProfile = function (profileID, email, password, firstName, lastName, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bio, about, project, links;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bio = '';
                        about = '';
                        project = '';
                        links = '';
                        //Put new user in database
                        return [4 /*yield*/, this.theDatabase.put(profileID, email, password, firstName, lastName, bio, about, project, links)];
                    case 1:
                        //Put new user in database
                        _a.sent();
                        //Respond to client
                        response.write(JSON.stringify({
                            result: 'created',
                            firstName: firstName,
                            lastName: lastName
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //READ Functions	
    MyServer.prototype.readProject = function (projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //let value = await this.theDatabase.get(name);
                response.write(JSON.stringify({
                    result: 'read',
                    name: projectName
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.readProfile = function (profileID, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //Get the following attributes from db, using the profileId parameter:
                // profileID: number,
                // email: string,
                // password: string,
                // firstName: string,
                // lastName: string,
                // bio: string,
                // about: string,
                // projects: string,
                // links: string,
                //Respond to client that profile was read
                response.write(JSON.stringify({
                    result: 'read',
                    name: profileID
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    //UPDATE Functions
    MyServer.prototype.updateProject = function (projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Update Project in database
                    return [4 /*yield*/, this.theDatabase.put(projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers)];
                    case 1:
                        //Update Project in database
                        _a.sent();
                        //Respond to client that project was updated
                        response.write(JSON.stringify({
                            result: 'updated',
                            name: projectName
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateProfile = function (profileID, email, password, firstName, lastName, bio, about, project, links, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Update Profile in Database
                    return [4 /*yield*/, this.theDatabase.put(profileID, email, password, firstName, lastName, bio, about, project, links)
                        //Respond to client about update
                    ];
                    case 1:
                        //Update Profile in Database
                        _a.sent();
                        //Respond to client about update
                        response.write(JSON.stringify({
                            result: 'updated',
                            name: firstName + " " + lastName
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //DELETE Functions
    MyServer.prototype.deleteProject = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.del(name)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({
                            result: 'deleted',
                            name: name
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteProfile = function (profileID, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Watch out here, there is a firstName and lastName attribute, something will need to be changed with this call
                    return [4 /*yield*/, this.theDatabase.del(profileID)];
                    case 1:
                        //Watch out here, there is a firstName and lastName attribute, something will need to be changed with this call
                        _a.sent();
                        response.write(JSON.stringify({
                            result: 'deleted',
                            profileID: profileID
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Other Functions
    MyServer.prototype.findAllProjects = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var projects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.find()];
                    case 1:
                        projects = _a.sent();
                        console.log("routing function");
                        console.log(projects);
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
// public async errorCounter(name: string, response): Promise<void> {
// 	response.write(JSON.stringify({ 'result': 'error' }));
// 	response.end();
// }
