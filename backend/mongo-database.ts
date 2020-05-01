export class Database {
	private MongoClient = require('mongodb').MongoClient;
	private client;
	private collectionName: string;
	private dbName: string = 'omega';

	constructor(collectionName) {
		this.collectionName = collectionName;
		let secrets;
		let uri;
		if (!process.env.URI) {
			secrets = require('../secrets.json');
			uri = secrets.uri;
		} else {
			uri = process.env.URI;
		}

		this.client = new this.MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });
		// Open up a connection to the client.
		// The connection is asynchronous, but we can't call await directly
		// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.

		/* from https://anthonychu.ca/post/async-await-typescript-nodejs/
	
		  Async/Await and the Async IIFE
	
		  The await keyword can only be used inside of a function
		  marked with the async keyword. [...] One way to do this is
		  with an "async IIFE" (immediately invoked function
		  expression)...
	
		   (async () => {
		   // code goes here
		   })();
	
		*/
		(async () => {
			await this.client.connect().catch((err) => {
				console.log(err);
			});
		})();
	}

	//PUT Functions
	public async putProject(
		projectName: string,
		projectDescription: string,
		projectWorkers: string,
		projectProgress: string,
		projectLinks: string,
		projectNumWorkers: string,
		projectButtons: string
	): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);

		// console.log("put: key = " + projectName + ", value = " + value);
		// insert one PROJECT into the database
		let result = await collection.insertOne({
			projectName: projectName,
			projectDecription: projectDescription,
			projectWorkers: projectWorkers,
			projectProgress: projectProgress,
			projectLinks: projectLinks,
			projectNumWorkers: projectNumWorkers,
			projectButtons: projectButtons
		});
		console.log('result = ' + result);
	}
	public async putProfile(
		profileID: number,
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		bio: string,
		about: string,
		project: string,
		links: string
	): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);

		// console.log("put: key = " + projectName + ", value = " + value);
		// insert one profile into the database
		let result = await collection.insertOne({
			profileID: profileID,
			profileEmail: email,
			profilePassword: password,
			firstName: firstName,
			lastName: lastName,
			profileBio: bio,
			profileAbout: about,
			profileProjects: project,
			profileLinks: links
		});
		console.log('result = ' + result);
	}

	//GET Functions
	public async getProject(key: string): Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);

		//Result is the JSON of the project in the DB associated with projectName
		let result = await collection.findOne({ projectName: key });

		//We want to return the whole JSON, not sure if that's what result.value is
		if (result) {
			return result;
		} else {
			return null;
		}
	}
	public async getProfile(key: string): Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);

		//Find info of userProfile
		let result = await collection.findOne({ profileID: key });

		//We want to return the whole JSON, not sure if that's what result.value is
		if (result) {
			return result.value;
		} else {
			return null;
		}
	}

	//DEL Functions
	public async delProject(key: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);

		let result = await collection.deleteOne({ projectName: key });
	}
	public async delProfile(key: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);

		let result = await collection.deleteOne({ profileID: key });
	}

	public async find(): Promise<string> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);

		//  findOne works but not find
		// let r = await db.collection(this.collectionName).findOne({projectName: 'Sample project'});
		// console.log(r);
		// returns all projects
		let projects: Array<string> = [];
		let result = await collection.find().toArray().then((items) => {
			console.log(`Successfully found ${items.length} documents.`);
			// console.log(items);
			projects.push(items);
			return items;
		});

		// console.log()
		// console.log(projects[0]);

		// console.log("RESULT...." + );

		if (result) {
			console.log('result is not null');
			return projects[0];
		} else {
			return null;
		}
	}

	//ONLY CURRENTLY WORKING FOR PROJECTS (uses getProject only)
	public async isFound(key: string): Promise<boolean> {
		console.log('isFound: key = ' + key);
		let v = await this.getProject(key);
		console.log('is found result = ' + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}
}
