const url = 'http://localhost:8080/codetogether'; //Local host
// const url = 'https://cs-326-final-omega.herokuapp.com/codetogether';

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

//CREATE functions
function projectCreate() {
	(async () => {
		let projectName = document.getElementById('projectName').value;
		let projectDescription = document.getElementById('projectDescription').value;
		let projectWorkers = document.getElementById('projectWorkers').value;
		let projectProgress = document.getElementById('projectProgress').value;
		let projectLinks = document.getElementById('projectLinks').value;
		let projectNumWorkers = document.getElementById('projectNumWorkers').value;
		let projectButtons = $.map($('input:checkbox:checked'), function(e, i) {
			return e.value;
		});

		//Then create JSON to return
		const projectData = {
			projectName        : projectName,
			projectDescription : projectDescription,
			projectWorkers     : projectWorkers,
			projectProgress    : projectProgress,
			projectLinks       : projectLinks,
			projectButtons     : projectButtons,
			projectNumWorkers  : projectNumWorkers
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

function profileCreate() {
	(async () => {
		//Only need the elements on the sign up page
		let profileID = Math.floor(Math.random() * 100000);
		let firstName = document.getElementById('firstName').value;
		let lastName = document.getElementById('lastName').value;
		let email = document.getElementById('inputEmail').value;
		let password = document.getElementById('inputPassword').value;

		const profileData = {
			profileID : profileID,
			email     : email,
			password  : password,
			firstName : firstName,
			lastName  : lastName
		};

		//For now, userName will be omega
		const newURL = url + '/users/' + 'omega' + '/createProfile';
		console.log('projectCreate: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			console.log(j['result']);
			document.getElementById('createProfOutput').innerHTML =
				'User:' + firstName + ' ' + lastName + "'s profile has been created";
		} else {
			document.getElementById('createProfOutput').innerHTML = 'Error Occurred During Profile Creation';
		}
	})();
}

//READ Functions
function projectRead() {
	(async () => {
		//We just need projectName, then we'll look up other attributes in DB
		let nameFromDoc = document.getElementById('nameFromDoc').value;

		const projectData = {
			projectName : nameFromDoc
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProject';
		console.log('projectRead: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();

		//This the JSON returned from the db in readProject() in myserver-routing
		let project = j.projectAttributes;
		console.log(project);
		//Now declare all attributes using the above JSON
		let projectName = project.projectName;
		let projectDescription = project.projectDescription;
		let projectWorkers = project.projectWorkers;
		let projectProgress = project.projectProgress;
		let projectLinks = project.projectLinks;
		let projectButtons = project.projectButtons;
		let projectNumWorkers = project.projectNumWorkers;

		for (let i = 0; i < projectButtons.length; i++) {
			//trying to add formatting to buttons but not working
			var button = document.createElement('button');
			button.classList.add('btn');
			button.classList.add('btn-success');
			if (i != 0) {
				button.classList.add('ml-2');
			}
			button.textContent = projectButtons[i];
		}
		//let readProjectOutput = document.getElementById('readProjectOutput');
		//readProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			//Assigning variables to html elements
			document.getElementById('projectName').innerHTML = projectName;
			document.getElementById('projectDescription').innerHTML = projectDescription;
			document.getElementById('projectWorkers').innerHTML = projectWorkers;
			document.getElementById('projectProgress').innerHTML = projectProgress;
			document.getElementById('projectLinks').innerHTML = projectLinks;
			document.getElementById('projectButtons').innerHTML = projectButtons;
			document.getElementById('projectNumWorkers').innerHTML = projectNumWorkers;

			//readProjectOutput.innerHTML = 'Read the output of project: ' + j['name'];
		} else {
			readProjectOutput.innerHTML = 'Does not work';
		}
	})();
}

function profileRead() {
	(async () => {
		//Get profileID of profile we want to read
		let searchID = document.getElementById('searchID');

		let profileData = {
			profileID : searchID
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProfile';
		console.log('counterRead: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		console.log(resp);
		const j = await resp.json();

		//This *should* be a JSON of the profile
		//Maybe should be j['profileAttributes']?
		let profile = j.profileAttributes;

		//Assign values needed to display on html
		let name = profile.name;
		let bio = profile.bio;
		let about = profile.about;
		let projects = profile.projects;
		let links = profile.links;

		if (j['result'] !== 'error') {
			console.log('Read works!');
			//Now, fill in HTML with stuff we read
			document.getElementById('profileName').innerHTML = '<b>' + name + '</b>';
			document.getElementById('bio').innerHTML = bio;
			document.getElementById('aboutSection').innerHTML = about;
			document.getElementById('projectSection').innerHTML = projects;
			document.getElementById('contactSection').innerHTML = links;
		} else {
			document.getElementById('profileName').innerHTML = 'User Not Found';
		}
	})();
}

//UPDATE Functions
function projectUpdate() {
	(async () => {
		let projectName = document.getElementById('projectName').value;
		let projectDescription = document.getElementById('projectDescription').value;
		let projectWorkers = document.getElementById('projectWorkers').value;
		let projectProgress = document.getElementById('projectProgress').value;
		let projectLinks = document.getElementById('projectLinks').value;
		let projectNumWorkers = document.getElementById('projectNumWorkers').value;
		// let projectButtons = $.map($('input:checkbox:checked'), function(e, i) {
		// 	return e.value;
		// });
		const projectData = {
			projectName        : projectName,
			projectDescription : projectDescription,
			projectWorkers     : projectWorkers,
			projectProgress    : projectProgress,
			projectLinks       : projectLinks,
			//Buttons
			projectButtons     : projectButtons,
			projectNumWorkers  : projectNumWorkers
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

function profileUpdate() {
	(async () => {
		//Get relevant info from html page
		//NOTE: id, email, password will be retrieved from db, they won't be on the edit profile page, but we need them for the JSON
		let profileID = 10;
		let email = 'example@gmail.com';
		let password = 'myPassword';
		let name = document.getElementById('nameInput').value;
		let bio = document.getElementById('bioInput').value;
		let about = document.getElementById('aboutInput').value;
		let projects = document.getElementById('projectInput').value;
		let links = document.getElementById('linkInput').value;
		//BUTTONS, IDK

		const profileData = {
			profileID       : profileID,
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

//DELETE Functions
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
			console.log(j['result']);
			let deleteOutput = document.getElementById('deleteOutput');
			deleteOutput.style.visibility = 'visible';
			deleteOutput.innerHTML = 'Profile: ' + profileName + ' has been deleted';
		} else {
			document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}
	})();
}

// get all projects from the database
function findAllProjects() {
	console.log('finding all projects');
	(async () => {
		// do we need to add anything to data?
		//
		const data = {};
		const newURL = url + '/users/' + 'omega' + '/allProjects';
		const resp = await postData(newURL, data);

		console.log('getting response');
		const j = await resp.json();
		console.log('printing response:-- ');
		console.log(resp);

		let projects = j['projects'];
		console.log(projects);
		for (let i = 0; i < projects.length; i++) {
			let projectName = projects[i]['projectName'];
			let projectDescription = projects[i]['projectDescription'];
			let projectButtons = projects[i]['projectButtons'];
			addProject(projectName, projectDescription, projectButtons);
		}
	})();
}

function addProject(projectName, projectDescription, projectButtons) {
	let mainDiv = document.getElementById('container');

	// card div
	let cardDiv = document.createElement('div');

	cardDiv.classList.add('card');
	cardDiv.classList.add('mt-4');
	// cardmt-4

	// card body
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');

	let a = document.createElement('a');
	a.href = './pages/project_description.html';
	a.textContent = projectName;
	a.classList.add('card-title');
	a.style = 'color: green;font-size: 24px;';

	let text = document.createElement('p');
	text.textContent = projectDescription;

	let rowDiv = document.createElement('div');
	rowDiv.classList.add('row');
	rowDiv.classList.add('mb-2');
	rowDiv.classList.add('ml-0');

	let skills = projectButtons;

	for (let i = 0; i < projectButtons.length; i++) {
		var button = document.createElement('button');
		button.classList.add('btn');
		button.classList.add('btn-success');
		if (i != 0) {
			button.classList.add('ml-2');
		}
		button.textContent = skills[i];
		rowDiv.appendChild(button);
	}

	cardBodyDiv.appendChild(a);
	cardBodyDiv.appendChild(text);
	cardBodyDiv.appendChild(rowDiv);

	cardDiv.appendChild(cardBodyDiv);
	mainDiv.appendChild(cardDiv);
}
