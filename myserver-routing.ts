let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

	private theDatabase;

	// Server stuff: use express instead of http.createServer
	private server = express();
	private port = 8080;
	private router = express.Router();

	constructor(db) {
		this.theDatabase = db;
		// from https://enable-cors.org/server_expressjs.html
		this.router.use((request, response, next) => {
			response.header('Content-Type', 'application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
		});
		// Serve static pages from a particular path.
		this.server.use('/', express.static('./'));
		// YOUR CODE GOES HERE
		// HANDLE CREATE, READ, UPDATE, AND DELETE OPERATIONS
		this.router.get('/users/:userId/create', this.createHandler.bind(this));
		this.router.get('/users/:userId/read', this.readHandler.bind(this));
		this.router.get('/users/:userId/update', this.updateHandler.bind(this));
		this.router.get('/users/:userId/delete', this.deleteHandler.bind(this));
		// HANDLE ERRORS WITH A WILDCARD (*)
		
		this.router.get('*', this.errorHandler.bind(this));
		// this.router.get('*', async (request, response) => {
        //     response.send(JSON.stringify({ "result" : "command-not-found" }));
        // });

		// Start up the counter endpoint at '/counter'.
		this.server.use('/counter', this.router);
	}

	private async errorHandler(request, response, next): Promise<void> {
		let value: boolean = await this.theDatabase.isFound(request.params['userId'] + "-" + request.query.name);
		if (!value) {
			response.write(JSON.stringify({ 'result': 'error' }));
			response.end();
		} else {
			next();
		}
	}

	private async createHandler(request, response): Promise<void> {
		await this.createCounter(request.params['userId'] + "-" + request.query.name, response);
	}

	private async readHandler(request, response): Promise<void> {
		/// YOUR CODE GOES HERE
		await this.readCounter(request.params['userId'] + "-" + request.query.name, response);
	}

	private async updateHandler(request, response): Promise<void> {
		/// YOUR CODE GOES HERE
		await this.updateCounter(request.params['userId'] + "-" + request.query.name, request.query.value, response);
	}

	private async deleteHandler(request, response): Promise<void> {
		/// YOUR CODE GOES HERE
		await this.deleteCounter(request.params['userId'] + "-" + request.query.name, response);
	}

	public listen(port): void {
		this.server.listen(port);
	}

	public async createCounter(name: string, response): Promise<void> {
		console.log("creating counter named '" + name + "'");
		await this.theDatabase.put(name, 0);
		response.write(JSON.stringify({
			'result': 'created',
			'name': name,
			'value': 0
		}));
		response.end();
	}

	public async errorCounter(name: string, response): Promise<void> {
		response.write(JSON.stringify({ 'result': 'error' }));
		response.end();
	}

	public async readCounter(name: string, response): Promise<void> {
		let value = await this.theDatabase.get(name);
		response.write(JSON.stringify({
			'result': 'read',
			'name': name,
			'value': value
		}));
		response.end();
	}

	public async updateCounter(name: string, value: number, response): Promise<void> {
		await this.theDatabase.put(name, value);
		response.write(JSON.stringify({
			'result': 'updated',
			'name': name,
			'value': value
		}));
		response.end();
	}

	public async deleteCounter(name: string, response): Promise<void> {
		await this.theDatabase.del(name);
		response.write(JSON.stringify({
			'result': 'deleted',
			'value': name
		}));
		response.end();
	}
}

