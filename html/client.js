//const url = 'http://localhost:8080/counter'; //Local host
const url = 'https://cs-326-final-omega.herokuapp.com/codetogether';

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
		let createProjectOutput = document.getElementById('createProjectOutput');
		createProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			createProjectOutput.innerHTML = 'Project: ' + j['name'] + ' was created successfully';
		} else {
			createProjectOutput.innerHTML = 'Error Occurred During Creation';
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
			projectName       : projectName,
			projectDecription : projectDescription,
			projectWorkers    : projectWorkers,
			projectProgress   : projectProgress,
			projectLinks      : projectLinks,
			//Buttons
			projectNumWorkers : projectNumWorkers
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProject';
		console.log('counterRead: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();
		let readProjectOutput = document.getElementById('readProjectOutput');
		readProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			readProjectOutput.innerHTML = "Read the output of project: " + j['name'];
		} else {
			readProjectOutput.innerHTML = 'Does not work';
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
			projectName       : projectName,
			projectDecription : projectDescription,
			projectWorkers    : projectWorkers,
			projectProgress   : projectProgress,
			projectLinks      : projectLinks,
			//Buttons
			projectNumWorkers : projectNumWorkers
		};

		let userName = 'omega';
		const newURL = url + '/users/' + userName + '/updateProject';
		console.log('counterUpdate: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();
		let updateProjectOutput = document.getElementById('updateProjectOutput');
		updateProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			updateProjectOutput.innerHTML = 'Project: ' + j['name'] + ' has been updated successfully';
		} else {
			updateProjectOutput.innerHTML = 'Error Occurred During Update';
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

function profileCreate() {
	(async () => {
		let firstName = document.getElementById('firstName').value;
		let lastName = document.getElementById('lastName').value;
		let email = document.getElementById('inputEmail').value;
		let inputPassword = document.getElementById('inputPassword').value;
		let confirmPassword = document.getElementById('confirmPassword').value;

		if (inputPassword !== confirmPassword) {
			console.log('Passwords do not match!');
		}
		//Then create JSON to return
		const profileData = {
			firstName     : firstName,
			lastName      : lastName,
			email         : email,
			inputPassword : inputPassword
		};

		//For now, userName will be omega
		const newURL = url + '/users/' + 'omega' + '/createProfile';
		console.log('projectCreate: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		const j = await resp.json();

		//GOAL: Find a way to display the json response on a DIFFERENT PAGE, namely project_description.html.
		//This create_project --> project_description may be more straightforward since it is the same exact content, but eventually
		//we'll need to get new content to diplay on the project_desciption page (when we click on the link to a project, for example)
		console.log(resp);
		if (j['result'] !== 'error') {
			console.log(j['result']);
			document.getElementById('createProfOutput').innerHTML = 'works';
		} else {
			document.getElementById('createProfOutput').innerHTML = 'Does not work';
		}
	})();
}
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
			email           : email,
			password        : password,
			profileName     : name,
			profileBio      : bio,
			profileAbout    : about,
			profileProjects : projects,
			profileLinks    : links
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
			updateOutput.innerHTML = 'User: ' + j['name'] + "'s " + 'profile has been updated';
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
			email           : email,
			password        : password,
			profileName     : name,
			profileBio      : bio,
			profileAbout    : about,
			profileProjects : projects,
			profileLinks    : links
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

// incomplete
function findAllProjects() {
	console.log('finding all projects');
	(async () => {
		// do we need to add anything to data?
		const data = {};
		const newURL = url + '/users/' + 'omega' + '/allProjects';
		const resp = await postData(newURL, data);
		// doesn't work
		const j = await resp.json();
		console.log(resp);

		// we need to loop over all projects, set to do nothing FOR NOW
		// for (let i = 0; i <= 0; i++) {
		// 	let projectName = j['projectName'];
		// 	let projectDescription = j['projectDescription'];
		// 	let projectWorkers = j['projectWorkers'];
		// 	let projectProgress = j['projectProgress'];
		// 	let projectLinks = j['projectLinks'];
		// 	let projectNumWorkers = j['projectNumWorkers'];
		// 	if (j['result'] !== 'error') {
		// 		// change html for all projects
		// 		// dynamically add projects here?
		// 		document.getElementById('output').innerHTML =
		// 			'201: <b>' + userName + ', ' + counterName + ' value = ' + j['value'] + '</b>';
		// 	}
		// }

		if (j['result'] !== 'error') {
			document.getElementById('output').innerHTML = 'works';
		} else {
			document.getElementById('output').innerHTML = 'does not work';
		}
	})();
}
