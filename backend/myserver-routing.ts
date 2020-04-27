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
		this.router.post('/users/:userId/createProfile', this.createProfileHandler.bind(this));
		this.router.post('/users/:userId/readProfile', [
			this.errorHandler.bind(this),
			this.readProfileHandler.bind(this)
		]);
		this.router.post('/users/:userId/updateProfile', [
			this.errorHandler.bind(this),
			this.updateProfileHandler.bind(this)
		]);
		this.router.post('/users/:userId/deleteProfile', [
			this.errorHandler.bind(this),
			this.deleteProfileHandler.bind(this)
		]);

		//Other endpoints
		this.router.post('/users/:userId/allProjects', [this.errorHandler.bind(this), this.findAllProjects.bind(this)]);

		// Set a fall-through handler if nothing matches.
		this.router.post('*', async (request, response) => {
			response.send(JSON.stringify({ result: 'command-not-found' }));
		});
		// Start up the counter endpoint at '/codetogether'.
		this.server.use('/codetogether', this.router);
	}

	//ERROR Handler
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


	//CREATE Handlers
	private async createHandler(request, response): Promise<void> {
		await this.createProject(
			request.body.projectName,
			request.body.projectDescription,
			request.body.projectWorkers,
			request.body.projectProgress,
			request.body.projectLinks,
			request.body.projectNumWorkers,
			response
		);
	}
	private async createProfileHandler(request, response): Promise<void> {
		await this.createProfile(
			request.body.firstName,
			request.body.lastName,
			request.body.email,
			request.body.inputPassword,
			request.body.confirmPassword,
			response
		);
	}


	//READ Handlers
	private async readHandler(request, response): Promise<void> {
		await this.readProject(
			request.body.projectName,
			request.body.projectDescription,
			request.body.projectWorkers,
			request.body.projectProgress,
			request.body.projectLinks,
			request.body.projectNumWorkers,
			response
		);
	}

	private async readProfileHandler(request, response): Promise<void> {
		await this.readProfile(
			request.params['userId'] + '-' + request.body.email,
			request.body.password,
			request.body.name,
			request.body.bio,
			request.body.about,
			request.body.projects,
			request.body.links,
			response
		);
	}


	//UPDATE Handlers
	private async updateHandler(request, response): Promise<void> {
		await this.updateProject(
			request.body.projectName,
			request.body.projectDescription,
			request.body.projectWorkers,
			request.body.projectProgress,
			request.body.projectLinks,
			request.body.projectNumWorkers,
			response
		);
	}

	private async updateProfileHandler(request, response): Promise<void> {
		await this.updateProfile(request.body.profileName, request.body.value, response);
	}

	//DELETE Handlers
	private async deleteHandler(request, response): Promise<void> {
		await this.deleteProject(request.body.name, response);
	}

	private async deleteProfileHandler(request, response): Promise<void> {
		await this.deleteProfile(request.body.name, response);
	}


	public listen(port): void {
		this.server.listen(port);
	}


	//CREATE Functions
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
				name: projectName
			})
		);
		response.end();
	}

	public async createProfile(
		firstName: string,
		lastName: string,
		email: string,
		inputPassword: string,
		confirmPassword: string,
		response
	): Promise<void> {
		await this.theDatabase.put(firstName, lastName, email, inputPassword, confirmPassword);
		response.write(
			JSON.stringify({
				result: 'created',
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: inputPassword
			})
		);
		response.end();
	}


	//READ Functions	
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

	public async readProfile(
		email: string,
		password: string,
		name: string,
		bio: string,
		about: string,
		projects: [],
		links: [],
		response
	): Promise<void> {
		//This needs to be changed, need to display all parameters using database query
		response.write(
			JSON.stringify({
				result: 'read',
				name: name
			})
		);
		response.end();
	}


	//UPDATE Functions
	public async updateProject(
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
				result: 'updated',
				name: projectName
			})
		);
		response.end();
	}

	public async updateProfile(
		email: string,
		password: string,
		name: string,
		bio: string,
		about: string,
		projects: [],
		links: [],
		response): Promise<void> {
		//Put parameters in database
		response.write(
			JSON.stringify({
				result: 'updated',
				name: name
			})
		);
		response.end();
	}


	//DELETE Functions
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

	public async deleteProfile(name: string, response): Promise<void> {
		//await this.theDatabase.del(name);
		response.write(
			JSON.stringify({
				result: 'deleted',
				name: name
			})
		);
		response.end();
	}


	//Other Functions
	public async findAllProjects(response): Promise<void> {
		let a = await this.theDatabase.find();
		console.log('db.find()', a);
		response.write(
			JSON.stringify({
				result: 'find',
				name: 'Something'
			})
		);
		response.end();
	}
}

// public async errorCounter(name: string, response): Promise<void> {
	// 	response.write(JSON.stringify({ 'result': 'error' }));
	// 	response.end();
	// }
