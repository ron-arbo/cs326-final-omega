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

		//Project-related endpoints
		this.router.post('/users/:userId/createProject', this.createHandler.bind(this));
		this.router.post('/users/:userId/readProject', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
		this.router.post('/users/:userId/updateProject', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
		this.router.post('/users/:userId/deleteProject', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);

		//Profile-related endpoints
		// this.router.post('/users/:userId/createProfile', this.createHandler.bind(this));
		this.router.post('/users/:userId/readProfile', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
		this.router.post('/users/:userId/updateProfile', [
			this.errorHandler.bind(this),
			this.updateProfileHandler.bind(this)
		]);
		this.router.post('/users/:userId/deleteProfile', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);

		this.router.post('/users/:userId/allProjects', [this.errorHandler.bind(this), this.findAllProjects.bind(this)]);

		// Set a fall-through handler if nothing matches.
		this.router.post('*', async (request, response) => {
			response.send(JSON.stringify({ result: 'command-not-found' }));
		});
		// Start up the counter endpoint at '/counter'.
		this.server.use('/counter', this.router);
	}

	private async errorHandler(request, response, next): Promise<void> {
		//let value: boolean = await this.theDatabase.isFound(request.params['userId'] + "-" + request.body.name);
		//	console.log("result from database.isFound: " + JSON.stringify(value));

		//For now, since DB is not implemented, just go to correct handler
		if (false) {
			response.write(JSON.stringify({ result: 'error' }));
			response.end();
		} else {
			next();
		}
	}

	private async createHandler(request, response): Promise<void> {
		await this.createProject(
			request.params['userId'] + '-' + request.body.projectName,
			request.body.projectDescription,
			request.body.projectWorkers,
			request.body.projectProgress,
			request.body.projectLinks,
			request.body.projectNumWorkers,
			response
		);
	}

	private async readHandler(request, response): Promise<void> {
		await this.readProject(
			request.params['userId'] + '-' + request.body.projectName,
			request.body.projectDescription,
			request.body.projectWorkers,
			request.body.projectProgress,
			request.body.projectLinks,
			request.body.projectNumWorkers,
			response
		);
	}

	private async updateHandler(request, response): Promise<void> {
		await this.createProject(
			request.params['userId'] + '-' + request.body.projectName,
			request.body.projectDescription,
			request.body.projectWorkers,
			request.body.projectProgress,
			request.body.projectLinks,
			request.body.projectNumWorkers,
			response
		);
	}

	private async updateProfileHandler(request, response): Promise<void> {
		await this.updateProfile(
			request.params['userId'] + '-' + request.body.profileName,
			request.body.value,
			response
		);
	}

	private async deleteHandler(request, response): Promise<void> {
		await this.deleteProject(request.params['userId'] + '-' + request.body.name, response);
	}

	public listen(port): void {
		this.server.listen(port);
	}

	public async createProject(
		projectName: string,
		projectDescription: string,
		projectWorkers: string,
		projectProgress: string,
		projectLinks: string,
		projectNumWorkers: string,
		response
	): Promise<void> {
		// console.log("creating project named '" + name + "'");
		await this.theDatabase.put(
			projectName,
			projectDescription,
			projectWorkers,
			projectProgress,
			projectLinks,
			projectNumWorkers
		);
		response.write(
			JSON.stringify({
				result: 'created',
				name: projectName,
				value: 0
			})
		);
		response.end();
	}

	// public async errorCounter(name: string, response): Promise<void> {
	// 	response.write(JSON.stringify({ 'result': 'error' }));
	// 	response.end();
	// }

	public async readProject(
		projectName: string,
		projectDescription: string,
		projectWorkers: string,
		projectProgress: string,
		projectLinks: string,
		projectNumWorkers: string,
		response
	): Promise<void> {
		//let value = await this.theDatabase.get(name);

		response.write(
			JSON.stringify({
				result: 'read',
				name: projectName
			})
		);
		response.end();
	}

	public async updateProject(
		projectName: string,
		projectDescription: string,
		projectWorkers: string,
		projectProgress: string,
		projectLinks: string,
		projectNumWorkers: string,
		response
	): Promise<void> {
		await this.theDatabase.put(
			projectName,
			projectDescription,
			projectWorkers,
			projectProgress,
			projectLinks,
			projectNumWorkers
		);
		response.write(
			JSON.stringify({
				result: 'updated',
				name: projectName
			})
		);
		response.end();
	}

	public async updateProfile(name: string, value: number, response): Promise<void> {
		//await this.theDatabase.put(name, value);
		response.write(
			JSON.stringify({
				result: 'updated',
				name: name,
				value: value
			})
		);
		response.end();
	}

	public async deleteProject(name: string, response): Promise<void> {
		//await this.theDatabase.del(name);
		response.write(
			JSON.stringify({
				result: 'deleted',
				name: name
			})
		);
		response.end();
	}

	public async findAllProjects(response): Promise<void> {
		await this.theDatabase.find();
		response.write(
			JSON.stringify({
				result: 'find',
				name: name
			})
		);
		response.end();
	}
}
