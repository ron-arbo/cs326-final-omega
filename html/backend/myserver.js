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
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        this.headerText = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        };
        this.theDatabase = db;
        this.server = http.createServer();
        this.server.on('request', this.handler.bind(this));
    }
    /*
    A function to route the various urls to their respective functions
    ie. /read should call readCounter()
    */
    MyServer.prototype.handler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var options, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Your code here
                        response.writeHead(200, this.headerText);
                        options = url.parse(request.url, true).query;
                        console.log(options);
                        return [4 /*yield*/, this.theDatabase.isFound(options.name)];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            this.errorCounter(options.name, response);
                            return [2 /*return*/];
                        }
                        if (!request.url.startsWith("/create")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createCounter(options.name, response)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        if (!request.url.startsWith("/read")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.readCounter(options.name, response)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        if (!request.url.startsWith("/update")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.updateCounter(options.name, options.value, response)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        if (!request.url.startsWith("/delete")) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.deleteCounter(options.name, response)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        response.write("no command found.");
                        _a.label = 10;
                    case 10:
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    /*
    A function to create a counter in the database, should be initialized to 0
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing 3 things:
            - a result of 'created'
            = the name of the counter
            - its value (should be 0)
    */
    MyServer.prototype.createCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Your code here
                    return [4 /*yield*/, this.theDatabase.put(name, 0)];
                    case 1:
                        // Your code here
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'created', 'name': name, 'value': 0 }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    A function to communicate if the database has produced an error of some kind
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing a 'result' of 'error'
    */
    MyServer.prototype.errorCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Your code here
                response.write(JSON.stringify({ 'result': 'error' }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    /*
    A function to read a counter in the database
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing 3 things:
            - a result of 'read'
            = the name of the counter
            = its value (which is read from the database)
    */
    MyServer.prototype.readCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.get(name)];
                    case 1:
                        value = _a.sent();
                        response.write(JSON.stringify({ 'result': 'read', 'name': name, 'value': value }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    A function to update a counter in the database
    Inputs:
        name - a string that is the name of the counter
        value - a number which is the new value of the counter
        response - the response object that is written to with JSON containing 3 things:
            - a result of 'updated'
            = the name of the counter
            = its value (which is updated from the argument)
    */
    MyServer.prototype.updateCounter = function (name, value, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Your code here
                    return [4 /*yield*/, this.theDatabase.put(name, value)];
                    case 1:
                        // Your code here
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'updated', 'name': name, 'value': value }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    A function to delete a counter from the database
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing 2 things:
            - a result of 'deleted'
            = the name of the counter
    */
    MyServer.prototype.deleteCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Your code here
                    return [4 /*yield*/, this.theDatabase.del(name)];
                    case 1:
                        // Your code here
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'deleted', 'name': name }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
