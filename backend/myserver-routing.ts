import { link } from 'fs';

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
		this.router.post('/users/:userId/readProfile', [this.errorHandler.bind(this),this.readProfileHandler.bind(this)]);
		this.router.post('/users/:userId/updateProfile', [this.errorHandler.bind(this),this.updateProfileHandler.bind(this)]);
		this.router.post('/users/:userId/deleteProfile', [this.errorHandler.bind(this),this.deleteProfileHandler.bind(this)]);

		//Other endpoints
		this.router.post('/users/:userId/allProjects', [this.findAllProjectsHandler.bind(this)]);
		this.router.post('/users/:userID/projectSearch', [this.projectSearchHandler.bind(this)]);

		// Set a fall-through handler if nothing matches.
		this.router.post('*', async (request, response) => {
			response.send(JSON.stringify({ result: 'command-not-found' }));
		});
		// Start up the counter endpoint at '/codetogether'.
		this.server.use('/codetogether', this.router);
	}

	//ERROR Handler
	private async errorHandler(request, response, next): Promise<void> {
		let value: boolean = false;
		//Looking for project
		if(request.body.projectName){
			value = await this.theDatabase.isFoundProj(request.body.projectName);
		}
		else if(request.body.lastName){
			value = await this.theDatabase.isFoundProf(request.body.lastName);
		}
		else{
			console.log('Neither a projectName nor a lastName was found in the request')
		}
		//Check that value is found, if not respond to client with error, if so, continue to next handler
		if (!value) {
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
			request.body.projectButtons,
			response
		);
	}
	private async createProfileHandler(request, response): Promise<void> {
		await this.createProfile(
			request.body.profileID,
			request.body.firstName,
			request.body.lastName,
			request.body.profileAbout,
			request.body.profileBio,
			request.body.profileEmail,
			request.body.profileLinks,
			request.body.profilePassword,
			request.body.profileProjects,
			response
		);
	}

	//READ Handlers
	private async readHandler(request, response): Promise<void> {
		await this.readProject(request.body.projectName, response);
	}
	private async readProfileHandler(request, response): Promise<void> {
		await this.readProfile(request.body.lastName, response);
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
			request.body.projectButtons,
			response
		);
	}
	private async updateProfileHandler(request, response): Promise<void> {
		await this.updateProfile(
			request.body.profileID,
			request.body.profileEmail,
			request.body.profilePassword,
			request.body.firstName,
			request.body.lastName,
			request.body.profileBio,
			request.body.profileAbout,
			request.body.profileProjects,
			request.body.profileLinks,
			response
		);
	}

	//DELETE Handlers
	private async deleteHandler(request, response): Promise<void> {
		await this.deleteProject(request.body.name, response);
	}

	private async deleteProfileHandler(request, response): Promise<void> {
		await this.deleteProfile(request.body.id, response);
	}

	//OTHER Handlers
	private async findAllProjectsHandler(request, response): Promise<void> {
		await this.findAllProjects(response);
	}

	private async projectSearchHandler(request, response): Promise<void> {
		await this.projectSearch(request.body.searchKey, response);
	}

	//Listener
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
		projectButtons: string,
		response
	): Promise<void> {
		//Put new project in database
		await this.theDatabase.putProject(
			projectName,
			projectDescription,
			projectWorkers,
			projectProgress,
			projectLinks,
			projectNumWorkers,
			projectButtons
		);
		//Respond to client
		response.write(
			JSON.stringify({
				result: 'created',
				name: projectName
			})
		);
		response.end();
	}
	public async createProfile(
		profileID: number,
		firstName: string,
		lastName: string,
		profileAbout: string,
		profileBio: string,
		profileEmail: string,
		profileLinks: string,
		profilePassword: string,
		profileProjects: string,
		response
	): Promise<void> {
		//Set these attributes to empty for now, since the sign up page doesn't have them. The user can udpate them later

		//Put new user in database
		await this.theDatabase.putProfile(profileID, firstName, lastName, profileAbout, profileBio, profileEmail, profileLinks, profilePassword, profileProjects);
		//Respond to client
		response.write(
			JSON.stringify({
				result: 'created',
				firstName: firstName,
				lastName: lastName
			})
		);
		response.end();
	}

	//READ Functions
	public async readProject(projectName: string, response): Promise<void> {
		//let value = await this.theDatabase.get(name);
		let projectAttributes = await this.theDatabase.getProject(projectName);
		console.log(projectAttributes);

		response.write(
			JSON.stringify({
				result: 'read',
				projectAttributes: projectAttributes
			})
		);
		response.end();
	}
	public async readProfile(lastName: number, response): Promise<void> {
		let profileAttributes = await this.theDatabase.getProfile(lastName);

		console.log('profileAttributes within myser-routing: ' + profileAttributes);

		//Respond to client that profile was read, return the JSON in the response
		response.write(
			JSON.stringify({
				result: 'read',
				profileAttributes: profileAttributes
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
		projectButtons: string,
		response
	): Promise<void> {
		//Update Project in database
		await this.theDatabase.putProject(
			projectName,
			projectDescription,
			projectWorkers,
			projectProgress,
			projectLinks,
			projectNumWorkers,
			projectButtons
		);
		//Respond to client that project was updated
		response.write(
			JSON.stringify({
				result: 'updated',
				name: projectName
			})
		);
		response.end();
	}
	public async updateProfile(
		profileID: number,
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		bio: string,
		about: string,
		project: string,
		links: string,
		response
	): Promise<void> {
		//Update Profile in Database
		await this.theDatabase.putProfile(profileID, email, password, firstName, lastName, bio, about, project, links);
		//Respond to client about update
		response.write(
			JSON.stringify({
				result: 'updated',
				name: firstName + ' ' + lastName
			})
		);
		response.end();
	}

	//DELETE Functions
	public async deleteProject(name: string, response): Promise<void> {
		await this.theDatabase.delProject(name);
		response.write(
			JSON.stringify({
				result: 'deleted',
				name: name
			})
		);
		response.end();
	}
	public async deleteProfile(profileID: number, response): Promise<void> {
		//Watch out here, there is a firstName and lastName attribute, something will need to be changed with this call
		await this.theDatabase.delProfile(profileID);
		response.write(
			JSON.stringify({
				result: 'deleted',
				profileID: profileID
			})
		);
		response.end();
	}

	//Other Functions
	public async findAllProjects(response): Promise<void> {
		let projects = await this.theDatabase.find();

		console.log('routing function');
		console.log('----Projects----');
		console.log(projects);

		response.write(
			JSON.stringify({
				result: 'find',
				projects: projects
			})
		);
		response.end();
	}

	public async projectSearch(searchKey: string, response): Promise<void> {
		let results = await this.theDatabase.projectSearch(searchKey);

		console.log('routing function');
		console.log('----Results----');
		console.log(results);

		response.write(
			JSON.stringify({
				result: 'search',
				resultList: results
			})
		);
		response.end();
	}
}

// public async errorCounter(name: string, response): Promise<void> {
// 	response.write(JSON.stringify({ 'result': 'error' }));
// 	response.end();
// }
