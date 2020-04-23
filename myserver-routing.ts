let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {
	private theDatabase;

	// Server stuff: use express instead of http.createServer
	private server = express();
	private port = process.env.PORT || 8080;
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
		// this.server.use('/',express.static('html'));
		this.server.use('/', express.static('./html'));
		this.server.use('/assets', express.static('assets'));
		this.server.use('/backend', express.static('backend'));

		this.server.use(express.json())

		// this.router.get('/users/:userId/create', this.createHandler.bind(this));
		// making a dummy request
		this.router.get('/users/:userId/create', this.createHandler.bind(this));


		// this.router.get('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);

		this.router.get('*', async (request, response) => {
			response.send(JSON.stringify({ result: 'command-not-found' }));
		});

		// Start up the counter endpoint at '/counter'.
		this.server.use('/counter', this.router);
	}

	// private async errorHandler(request, response, next): Promise<void> {
	// 	let value: boolean = await this.theDatabase.isFound(request.params['userId'] + '-' + request.body.name);
	// 	if (!value) {
	// 		response.write(JSON.stringify({ result: 'error' }));
	// 		response.end();
	// 	} else {
	// 		next();
	// 	}
	// }

	private async createHandler(request, response): Promise<void> {
		await this.createProject(request.params['userId'] + '-' + request.body.name, response);
	}

	public listen(port): void {
		this.server.listen(port);
	}

	public async createProject(name: string, response): Promise<void> {
		console.log("creating counter named '" + name + "'");
		await this.theDatabase.put('omega', 'description1');
		response.write(
			JSON.stringify({
				result: 'created',
				name: name,
				value: 0
			})
		);
		response.end();
	}

	public async errorCounter(name: string, response): Promise<void> {
		response.write(JSON.stringify({ result: 'error' }));
		response.end();
	}

}
