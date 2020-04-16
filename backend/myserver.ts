let http = require('http');
let url = require('url');
​
export class MyServer {
​
    private theDatabase;
    private server;
​
    private headerText = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    };
​
    constructor(db) {
        this.theDatabase = db;
        this.server = http.createServer();
        this.server.on('request', this.handler.bind(this));
    }
​
    /*
    A function to route the various urls to their respective functions
    ie. /read should call readCounter()
    */
    public async handler(request, response) {
        // Your code here
        response.writeHead(200, this.headerText);
        let options = url.parse(request.url, true).query;
        console.log(options);
        let found = await this.theDatabase.isFound(options.name);
        if (!found) {
            this.errorCounter(options.name, response);
            return;
        }
        if (request.url.startsWith("/create")) {
        await this.createCounter(options.name, response);
            return;
        }
        if (request.url.startsWith("/read")) {
        await this.readCounter(options.name, response);
        }
        else if (request.url.startsWith("/update")) {
        await this.updateCounter(options.name, options.value, response);
        }
        else if (request.url.startsWith("/delete")) {
        await this.deleteCounter(options.name, response);
        }
        else {
            response.write("no command found.");
        }
        response.end();
    }
​
    public listen(port) : void {
        this.server.listen(port);
    }
​
    /*
    A function to create a counter in the database, should be initialized to 0
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing 3 things:
            - a result of 'created'
            = the name of the counter
            - its value (should be 0)
    */
    public async createCounter(name: string, response) : Promise<void> {
        // Your code here
        await this.theDatabase.put(name,0);
        response.write(JSON.stringify({'result' : 'created','name' : name,'value' : 0 }));
        response.end();
    }
​
    /*
    A function to communicate if the database has produced an error of some kind
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing a 'result' of 'error'
    */
    public async errorCounter(name: string, response) : Promise<void> {
        // Your code here
        response.write(JSON.stringify({'result' : 'error'}));
        response.end();
    }
​
    /*
    A function to read a counter in the database
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing 3 things: 
            - a result of 'read'
            = the name of the counter
            = its value (which is read from the database)
    */
    public async readCounter(name: string, response) : Promise<void> {
        // Your code here
        let value: Number = await this.theDatabase.get(name);
        response.write(JSON.stringify({'result' : 'read','name' : name,'value' : value}));
        response.end();
    }
​
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
    public async updateCounter(name: string, value: number, response) : Promise<void> {
        // Your code here

        await this.theDatabase.put(name,value);
        response.write(JSON.stringify({'result' : 'updated','name' : name,'value' : value }));
        response.end();
    }
​
    /*
    A function to delete a counter from the database
    Inputs:
        name - a string that is the name of the counter
        response - the response object that is written to with JSON containing 2 things: 
            - a result of 'deleted'
            = the name of the counter
    */
    public async deleteCounter(name: string, response) : Promise<void> {
        // Your code here
        await this.theDatabase.del(name);
        response.write(JSON.stringify({'result' : 'deleted','name' : name }));
        response.end();
    }
}