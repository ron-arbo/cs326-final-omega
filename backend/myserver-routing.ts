let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

	private theDatabase;

	// Server stuff: use express instead of http.createServer
	private server = express();
	private port = 8080 || process.env.PORT;
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
		this.server.use('/', express.static('html'));
		this.server.use('/pages', express.static('pages'));
		this.server.use('/assets', express.static('assets'));
		this.server.use('/backend', express.static('backend'));

		//handle POST in JSON format
		this.server.use(express.json());

		// Set a single handler for a route.
		this.router.post('/users/:userId/create', this.createHandler.bind(this));
		// Set multiple handlers for a route, in sequence.
		// this.router.post('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
		// this.router.post('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
		// this.router.post('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
		// Set a fall-through handler if nothing matches.
		this.router.post('*', async (request, response) => {
			response.send(JSON.stringify({ "result": "command-not-found" }));
		});
		// Start up the counter endpoint at '/counter'.
		this.server.use('/counter', this.router);
	}

	private async errorHandler(request, response, next): Promise<void> {
		let value: boolean = await this.theDatabase.isFound(request.params['userId'] + "-" + request.body.name);
		//	console.log("result from database.isFound: " + JSON.stringify(value));
		if (!value) {
			response.write(JSON.stringify({ 'result': 'error' }));
			response.end();
		} else {
			next();
		}
	}

	private async createHandler(request, response): Promise<void> {
		await this.createProject(
			request.params['userId'] + "-" + request.body.projectName, 
			request.body.projectDescription, 
			request.body.projectWorkers, 
			request.body.projectProgress, 
			request.body.projectLinks, 
			request.body.projectNumWorkers, 
			response);
	}

	// private async readHandler(request, response): Promise<void> {
	// 	console.log(request.params['userId']);
	// 	await this.readCounter(request.params['userId'] + "-" + request.body.name, response);
	// }

	// private async updateHandler(request, response): Promise<void> {
	// 	await this.updateCounter(request.params['userId'] + "-" + request.body.name, request.body.value, response);
	// }

	// private async deleteHandler(request, response): Promise<void> {
	// 	await this.deleteCounter(request.params['userId'] + "-" + request.body.name, response);
	// }

	public listen(port): void {
		this.server.listen(port);
	}

	public async createProject(projectName: string, projectDescription: string, projectWorkers: string, projectProgress: string, projectLinks: string, projectNumWorkers, response): Promise<void> {
		// console.log("creating project named '" + name + "'");
		await this.theDatabase.put(projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers);
		response.write(JSON.stringify({
			'result': 'created',
			'name': projectName,
			'value': 0
		}));
		response.end();
	}

	// public async createCounter(name: string, response): Promise<void> {
	// 	console.log("creating counter named '" + name + "'");
	// 	//await this.theDatabase.put(name, 0);
	// 	response.write(JSON.stringify({
	// 		'result': 'created',
	// 		'name': name,
	// 		'value': 0
	// 	}));
	// 	response.end();
	// }

	// public async errorCounter(name: string, response): Promise<void> {
	// 	response.write(JSON.stringify({ 'result': 'error' }));
	// 	response.end();
	// }

	// public async readCounter(name: string, response): Promise<void> {
	// 	//let value = await this.theDatabase.get(name);
	// 	let value = 5;
	// 	response.write(JSON.stringify({
	// 		'result': 'read',
	// 		'name': name,
	// 		'value': value
	// 	}));
	// 	response.end();
	// }

	// public async updateCounter(name: string, value: number, response): Promise<void> {
	// 	await this.theDatabase.put(name, value);
	// 	response.write(JSON.stringify({
	// 		'result': 'updated',
	// 		'name': name,
	// 		'value': value
	// 	}));
	// 	response.end();
	// }

	// public async deleteCounter(name: string, response): Promise<void> {
	// 	await this.theDatabase.del(name);
	// 	response.write(JSON.stringify({
	// 		'result': 'deleted',
	// 		'value': name
	// 	}));
	// 	response.end();
	// }
}