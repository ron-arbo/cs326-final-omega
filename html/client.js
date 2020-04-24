const url = 'http://localhost:8080/counter'; // NOTE NEW URL
async function postData(url, data) {
	const resp = await fetch(url, {
		method      : 'POST',
		mode        : 'cors',
		cache       : 'no-cache',
		credentials : 'same-origin',
		headers     : {
			'Content-Type' : 'application/json'
		},
		redirect    : 'follow',
		body        : JSON.stringify(data)
	});
	return resp;
}

function projectCreate() {
	(async () => {
		let projectName = document.getElementById('projectName').value;
		let projectDescription = document.getElementById('projectDescription').value;
		let projectWorkers = document.getElementById('projectWorkers').value;
		let projectProgress = document.getElementById('projectProgress').value;
		let projectLinks = document.getElementById('projectLinks').value;
		//HOW TO INCORPORATE BUTTONS??
		let projectNumWorkers = document.getElementById('projectNumWorkers').value;
		// let projectButtons = [];
		// let checkboxes = document.querySelectorAll('input[type=checkbox]:checked'); //trying to get all of the checked buttons

		// for (var i = 0; i < checkboxes.length; i++) {
		// 	projectButtons.push(checkboxes[i].value);
		// }
		// console.log(projectButtons);

		//Then create JSON to return
		const projectData = {
			projectName       : projectName,
			projectDecription : projectDescription,
			projectWorkers    : projectWorkers,
			projectProgress   : projectProgress,
			projectLinks      : projectLinks,
			//Buttons
			// projectButtons    : projectButtons,
			projectNumWorkers : projectNumWorkers
		};

		//For now, userName will be omega
		const newURL = url + '/users/' + 'omega' + '/createProject';
		console.log('projectCreate: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();

		//GOAL: Find a way to display the json response on a DIFFERENT PAGE, namely project_description.html.
		//This create_project --> project_description may be more straightforward since it is the same exact content, but eventually
		//we'll need to get new content to diplay on the project_desciption page (when we click on the link to a project, for example)
		console.log(resp);
		if (j['result'] !== 'error') {
			console.log(j['result']);
			document.getElementById('output').innerHTML = 'works';
			console.log('YAY!');
		} else {
			document.getElementById('output').innerHTML = 'Does not work';
		}
	})();
}

function projectRead() {
	(async () => {
		//Get these elements from Database vvvv
		// let projectName = document.getElementById("projectName").value;
		// let projectDescription = document.getElementById("projectDescription").value;
		// let projectWorkers = document.getElementById("projectWorkers").value;
		// let projectProgress = document.getElementById("projectProgress").value;
		// let projectLinks = document.getElementById("projectLinks").value;
		// //HOW TO INCORPORATE BUTTONS??
		// let projectNumWorkers = document.getElementById("projectNumWorkers").value;

		//For now, fill these variables with fake data
		let projectName = 'sampleName';
		let projectDescription = 'sampleDescription';
		let projectWorkers = 'sampleWorkers';
		let projectProgress = 'sampleProgress';
		let projectLinks = 'sampleLinks';
		let projectNumWorkers = 1;
		//Buttons
		//Then create JSON to return
		const projectData = {
			'projectName'       : projectName,
			'projectDecription' : projectDescription,
			'projectWorkers'    : projectWorkers,
			'projectProgress'   : projectProgress,
			'projectLinks'      : projectLinks,
			//Buttons
			'projectNumWorkers' : projectNumWorkers
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProject';
		console.log('counterRead: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		console.log(resp);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			document.getElementById('readOutput').innerHTML = 'works';
		} else {
			document.getElementById('readOutput').innerHTML = 'Does not work';
		}
	})();
}

function projectUpdate() {
	(async () => {
		let projectName = 'sampleName';
		let projectDescription = 'sampleDescription';
		let projectWorkers = 'sampleWorkers';
		let projectProgress = 'sampleProgress';
		let projectLinks = 'sampleLinks';
		const projectData = {
			'projectName'       : projectName,
			'projectDecription' : projectDescription,
			'projectWorkers'    : projectWorkers,
			'projectProgress'   : projectProgress,
			'projectLinks'      : projectLinks,
			//Buttons
			projectNumWorkers : projectNumWorkers
		};

		const newURL = url + '/users/' + userName + '/updateProject';
		console.log('counterUpdate: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			document.getElementById('readOutput').innerHTML = 'works';
		} else {
			document.getElementById('readOutput').innerHTML = 'Does not work';
		}
	})();
}

function projectDelete() {
	(async () => {
		let projectName = document.getElementById('projectName').innerHTML;
		//Then, delete in database using projectName
		let userName = 'omega';

		const data = { name: projectName };

		const newURL = url + '/users/' + userName + '/deleteProject';
		console.log('counterDelete: fetching ' + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			let deleteOutput = document.getElementById('deleteOutput');
			deleteOutput.style.visibility = 'visible';
			deleteOutput.innerHTML = 'Project: ' + projectName + ' has been deleted';
		} else {
			document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}
	})();
}

// tsc backend/mongo-database.ts; tsc backend/myserver-routing.ts; tsc backend/server-main.ts;

function profileUpdate() {
	(async () => {
		//Get relevant info from html page
		//NOTE: email and password will be retrieved from db, they won't be on the edit profile page, but we need them for the JSON
		let email = 'example@gmail.com';
		let password = 'myPassword';
		let name = document.getElementById('nameInput').value;
		let bio = document.getElementById('bioInput').value;
		let about = document.getElementById('aboutInput').value;
		let projects = document.getElementById('projectInput').value;
		let links = document.getElementById('linkInput').value;
		//BUTTONS, IDK

		const profileData = {
			'email'           : email,
			'password'        : password,
			'profileName'     : name,
			'profileBio'      : bio,
			'profileAbout'    : about,
			'profileProjects' : projects,
			'profileLinks'    : links
			//BUTTONS
		};

		//Example userName for now
		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/updateProfile';
		console.log('counterUpdate: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		const j = await resp.json();
		let updateOutput = document.getElementById('updateOutput');
		updateOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			updateOutput.innerHTML = 'User: ' + name + "'s " + 'profile has been updated';
		} else {
			updateOutput.innerHTML = 'Error Occurred During Update';
		}
	})();
}
function profileRead() {
	(async () => {
		//Get these elements from Database vvvv
		// let projectName = document.getElementById("projectName").value;
		// let projectDescription = document.getElementById("projectDescription").value;
		// let projectWorkers = document.getElementById("projectWorkers").value;
		// let projectProgress = document.getElementById("projectProgress").value;
		// let projectLinks = document.getElementById("projectLinks").value;
		// //HOW TO INCORPORATE BUTTONS??
		// let projectNumWorkers = document.getElementById("projectNumWorkers").value;

		//For now, fill these variables with fake data
		let email = 'example@gmail.com';
		let password = 'myPassword';
		let name = 'sampleName';
		let bio = 'sampleBio';
		let about = 'sampleAbout';
		let projects = [];
		let links = [];
		//Buttons
		//Then create JSON to return
		const profileData = {
			'email'           : email,
			'password'        : password,
			'profileName'     : name,
			'profileBio'      : bio,
			'profileAbout'    : about,
			'profileProjects' : projects,
			'profileLinks'    : links
			//BUTTONS
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProfile';
		console.log('counterRead: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		console.log(resp);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			console.log('Read works!');
			document.getElementById('readOutput').innerHTML = 'works';
		} else {
			document.getElementById('readOutput').innerHTML = 'Does not work';
		}
	})();
}

function profileDelete() {
	(async () => {
		let profileName = document.getElementById('profileName').innerHTML;
		profileName = 'sampleUser';
		//Then, delete in database using projectName
		let userName = 'omega';

		const data = { name: profileName };

		const newURL = url + '/users/' + userName + '/deleteProfile';
		console.log('counterDelete: fetching ' + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			let deleteOutput = document.getElementById('deleteOutput');
			deleteOutput.style.visibility = 'visible';
			deleteOutput.innerHTML = 'Profile: ' + profileName + ' has been deleted';
		} else {
			document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}
	})();
}

function allProjects(){
	(async ()=> {
		
	})
}
