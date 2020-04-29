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
		//buttons
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

function profileCreate() {
	(async () => {
		//Only need the elements on the sign up page
		let firstName = document.getElementById('firstName').value;
		let lastName = document.getElementById('lastName').value;
		let email = document.getElementById('inputEmail').value;
		let password = document.getElementById('inputPassword').value;
		
		const profileData = {
			email           : email,
			password        : password,
			firstName       : firstName,
			lastName        : lastName
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
		//Get the following elements from DB
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
			readProjectOutput.innerHTML = 'Read the output of project: ' + j['name'];
		} else {
			readProjectOutput.innerHTML = 'Does not work';
		}
	})();
}

function profileRead() {
	(async () => {
		//Get the following elements from DB
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
			document.getElementById('readOutput').innerHTML = 'User:' + name + "'s profile has been read";
		} else {
			document.getElementById('readOutput').innerHTML = 'Does not work';
		}
	})();
}


//UPDATE Functions
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

		let div = document.findElemenById('container');
		let numProjects = 0;
		// we need to loop over all projects, set to do nothing FOR NOW
		for (let i = 0; i <= 0; i++) {
			let projectName = j['projectName'];
			let projectDescription = j['projectDescription'];
			let projectWorkers = j['projectWorkers'];
			let projectProgress = j['projectProgress'];
			let projectLinks = j['projectLinks'];
			let projectNumWorkers = j['projectNumWorkers'];
			if (j['result'] !== 'error') {
				// change html for all projects
				// dynamically add projects here?
				document.getElementById('output').innerHTML =
					'201: <b>' + userName + ', ' + counterName + ' value = ' + j['value'] + '</b>';
			}
		}

		if (j['result'] !== 'error') {
			document.getElementById('output').innerHTML = 'works';
		} else {
			document.getElementById('output').innerHTML = 'does not work';
		}
	})();
}

function addProject(){
	let div = document.findElemenById('div');
	div.classList.add("container");

	// change this into dynamic
	// 	<div class="card mt-4">
		// 	<div class="card-body">
		// 		<a class="card-title" style="color: green;font-size: 24px;" href="./pages/project_description.html">Covid Pandemic</a>
		// 		<p class="card-text">'Face pandemic' is a non-profit and community-driven effort to utilized
		// 			specialized technologies to identify, analyze and take preventive measures for outbreaks of
		// 			infectious diseases like COVID-19. Unfortunately, most governments were not prepared to handle
		// 			this pandemic. As a result, we the citizens have to take control and use our skills and efforts
		// 			to keep everyone in communities safe globally. We have developed an application that anonymously
		// 			acquires health and location information form participants and performs real-time analytics to
		// 			predict the spread of the virus, alert everyone about the hot zones and identify preventive
		// 			measures. Predictive analytics capability can help health professionals and emergency response
		// 			teams to prepare in advance. THIS IS NOT A CONTACT TRACING APP. Our focus is to create a
		// 			complete system that can help to identify infectious diseases in the early stages, start
		// 			preventive measures and operation planning for the doctors/hospitals. Scale and reach to the
		// 			maximum number of population is the key and it should work online - offline. We can't ever again
		// 			in this situation yet and need to remember "Prevention is better than cure".</p>
		// 		<div class="row mb-2 ml-0 ">
		// 			<button type="button" class="btn btn-success">HTML</button>
		// 			<button type="button" class="btn btn-success ml-2">Javascript</button>
		// 			<button type="button" class="btn btn-success ml-2">CSS</button>
		// 			<button type="button" class="btn btn-success ml-2">Node JS</button>
		// 			<button type="button" class="btn btn-success ml-2">Mongo DB</button>
		// 		</div>
		// 	</div>
	// </div>

	// card div
	let cardDiv = document.createElement("div");
	cardDiv.classList.add("card mt-4");

	// card body 
	let cardBodyDiv = document.createElement("div");
	cardBodyDiv.classList.add("card-body");

	let a = document.createElement('a'); 
	a.href = "./pages/project_description.html";
	a.textContent = "Project title";
	a.classList.add("card-title");

	let text = document.createElement("p");
	text.textContent = " Face pandemic is a non-profit and";

	let rowDiv = document.createElement("div");
	rowDiv.classList.add("row mb-2 ml-0");
	let skills = ['HTML', 'CSS', 'JS', 'Node Js']
	for(let i=0;i<4;i++){
		var a = document.createElement("button");
		a.classList.add("btn btn-success ml-2");
		a.textContent = skills[i];
		rowDiv.appendChild(a);
	}

	cardBodyDiv.appendChild(a);
	cardBodyDiv.appendChild(text);
	cardBodyDiv.appendChild(rowDiv);

	cardDiv.appendChild(cardBodyDiv);
	div.appendChild(cardDiv);

}
