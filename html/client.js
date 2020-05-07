const url = 'http://localhost:8080/codetogether'; //Local host
//const url = 'https://cs-326-final-omega.herokuapp.com/codetogether';
const projName = "";
window.onload = function () {
	let url2 = document.location.href,
		params = url2.split('?')[1].split('&'),  //Will be 'name' or 'lastName' in our case (Splits after ?, before &)
		data = {},
		tmp;
		this.console.log("Original url: " + url2);
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('='); //Splits around equals, so tmp[0] is the variable name and tmp[1] is the variable value
		data[tmp[0]] = tmp[1];
	}

	this.console.log('data[name]: ' + data['name']);
	this.console.log('data[lastName]: ' + data['lastName']);
	this.console.log('data[email]: ' + data['email']);

	//Read project from html
	if(data['name']){
		this.console.log(data.name);
		this.projectRead(data.name);
		this.projName = data.name;
	}
	//Read profile from html
	else if(data['lastName']){
		this.console.log("calling profileRead on: " + data.lastName);
		this.profileRead(data.lastName);
	}
	// //Signing in, redirect to update the rest of their profile
	// else if(data['email']){
	// 	this.console.log('redirect to profileUpdate with param: ' + data.email);
	// 	this.profileUpdate(data.email);
	// }
	
	// haven't thought how would index.html work with the same function
}
async function postData(url, data) {
	const resp = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		body: JSON.stringify(data)
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
		let projectButtons = $.map($('input:checkbox:checked'), function (e, i) {
			return e.value;
		});

		//Then create JSON to return
		const projectData = {
			projectName: projectName,
			projectDescription: projectDescription,
			projectWorkers: projectWorkers,
			projectProgress: projectProgress,
			projectLinks: projectLinks,
			projectButtons: projectButtons,
			projectNumWorkers: projectNumWorkers
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
			profileID: profileID,
			firstName: firstName,
			lastName: lastName,
			profileAbout: 'This user has not completed this section',
			profileBio: 'This user has not completed this section',
			profileEmail: email,
			profileLinks: 'This user has not completed this section',
			profilePassword: password,
			profileProjects: 'This user has not completed this section'
			
		};

		//For now, userName will be omega
		const newURL = url + '/users/' + 'omega' + '/createProfile';
		console.log('projectCreate: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		const j = await resp.json();
		let createProfOutput = document.getElementById('createProfOutput');
		createProfOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			console.log(j['result']);
			let hyperlink = "<a href='edit_profile.html'>Click Here to Finish Your Profile!</a>"
			console.log("hyperlink: " + hyperlink);
			createProfOutput.innerHTML ='User:' + firstName + ' ' + lastName + "'s profile has been created. " + hyperlink;
		} else {
			createProfOutput.innerHTML = 'Error Occurred During Profile Creation';
		}
	})();
}

//READ Functions
function projectRead(name) {
	(async () => {
		//We just need projectName, then we'll look up other attributes in DB
		// let nameFromDoc = document.getElementById('nameFromDoc').value;
		let pName = await name;
		const projectData = {
			projectName: pName
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

function profileRead(lastName) {
	(async () => {
		//Get profileID of profile we want to read
		//let searchID = document.getElementById('searchID');

		// let profileData = {
		// 	profileID: searchID
		// };
		let lName = await lastName;
		let profileData = {
			lastName: lName
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProfile';
		console.log('counterRead: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		console.log(resp);
		const j = await resp.json();

		//This *should* be a JSON of the profile
		let profile = j.profileAttributes;
		console.log('profile in profileRead : ' + profile);

		//Assign values needed to display on html
		let firstName = profile.firstName;
		let lastName2 = profile.lastName;
		let bio = profile.profileBio;
		let about = profile.profileAbout;
		let projects = profile.profileProjects;
		let links = profile.profileLinks;

		if (j['result'] !== 'error') {
			//Now, fill in HTML with stuff we read
			document.getElementById('profileName').innerHTML = '<b>' + firstName + ' ' + lastName2 + '</b>';
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
			projectName: projectName,
			projectDescription: projectDescription,
			projectWorkers: projectWorkers,
			projectProgress: projectProgress,
			projectLinks: projectLinks,
			//Buttons
			//projectButtons     : projectButtons,
			projectNumWorkers: projectNumWorkers
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
		let profileID = parseInt(document.getElementById('idInput').value);
		let email = document.getElementById('emailInput').value;
		let password = document.getElementById('passwordInput').value;
		let firstName = document.getElementById('firstNameInput').value;
		let lastName = document.getElementById('lastNameInput').value;
		let bio = document.getElementById('bioInput').value;
		let about = document.getElementById('aboutInput').value;
		let projects = document.getElementById('projectInput').value;
		let links = document.getElementById('linkInput').value;
		//BUTTONS, IDK

		const profileData = {
			profileID: profileID,
			profileEmail: email,
			profilePassword: password,
			firstName: firstName,
			lastName: lastName,
			profileBio: bio,
			profileAbout: about,
			profileProjects: projects,
			profileLinks: links
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
		// let projectName = this.projecName
		console.log(this.projName);

		let deleteProject = this.projName;
		console.log(this.projName);
		//Then, delete in database using projectName
		let userName = 'omega';

		const data = { name: deleteProject };

		const newURL = url + '/users/' + userName + '/deleteProject';
		console.log('counterDelete: fetching ' + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();

		if (j['result'] !== 'error') {
			let deleteOutput = document.getElementById('deleteOutput');
			deleteOutput.style.visibility = 'visible';
			deleteOutput.innerHTML = 'Project: ' + deleteProject + ' has been deleted';
		} else {
			document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}

		// tried javascript sleep
		setTimeout(() => {  console.log("World!"); }, 5000);
		// redirects to the index.html page after deleting
		document.location.href = "../index.html";

	})();
}

function profileDelete() {
	(async () => {
		// let profileName = document.getElementById('profileName').innerHTML;
		delProf = document.getElementById('delID').value;
		//Then, delete in database using projectName
		let userName = 'omega';

		const data = { id: delProf };

		const newURL = url + '/users/' + userName + '/deleteProfile';
		console.log('counterDelete: fetching ' + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			let deleteOutput = document.getElementById('deleteProf');
			deleteOutput.style.visibility = 'visible';
			deleteOutput.innerHTML = 'Profile: ' + delProf + ' has been deleted';
		} else {
			document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}
	})();
}

//Clears the results div and adds a "Results" header
function resultsHelper() {
	let resultsDiv = document.getElementById("results")
	let child = resultsDiv.lastElementChild;
	while (child) {
		resultsDiv.removeChild(child);
		child = resultsDiv.lastElementChild;
	}
	let resultHeader = document.createElement('h5');
	resultHeader.classList.add('card-header');
	resultHeader.classList.add('mt-4');
	resultHeader.innerHTML = "Results:";
	resultsDiv.appendChild(resultHeader);
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

		resultsHelper();

		for (let i = 0; i < projects.length; i++) {
			let projectName = projects[i]['projectName'];
			let projectDescription = projects[i]['projectDescription'];
			let projectButtons = projects[i]['projectButtons'];
			addProject(projectName, projectDescription, projectButtons);
		}
	})();
}

//Returns specific projects with projectName matching the one given in the serach bar
function projectSearch() {
	console.log('finding all projects');
	(async () => {

		let searchKey = document.getElementById('searchBar').value;

		const data = {
			searchKey: searchKey
		};
		console.log("Search key in client: " + searchKey);
		const newURL = url + '/users/' + 'omega' + '/projectSearch';
		const resp = await postData(newURL, data);

		console.log('getting response');
		const j = await resp.json();
		console.log('printing response:-- ');
		console.log(resp);

		let resultList = j['resultList'];
		console.log("resultList: " + resultList);
		console.log('resultList[0][projectName]: ' + resultList[0]['projectName']);
		console.log('resultList[0][lastName]: ' + resultList[0]['lastName']);


		resultsHelper();

		if(resultList[0]['projectName']){
			console.log("resultList contains projects");
			for (let i = 0; i < resultList.length; i++) {
				let projectName = resultList[i]['projectName'];
				let projectDescription = resultList[i]['projectDescription'];
				let projectButtons = resultList[i]['projectButtons'];
				addProject(projectName, projectDescription, projectButtons);
			}
		}
		else if(resultList[0]['lastName']){
			console.log('resultList contains profiles');
			for (let i = 0; i < resultList.length; i++) {
				let firstName = resultList[i]['firstName'];
				let lastName = resultList[i]['lastName'];
				let profileBio = resultList[i]['profileBio'];
				addProfile(firstName, lastName, profileBio);
			}
		}

		
	})();
}

// trying something
// once we load all the projects in index.html
// onclick function changes the global variable - projectName
// then once we go to the project_description page - we use the project name and load that project
function projectClick(name, page_name) {

	if (page_name === 'index') {
		// we get the project name here when they click on the function
		projectName = name;
		window.location.replace("./pages/page_description.html");
	} else if (page_name === 'description') {
		let n = projectName;
		console.log(n);
	}
}

function addProject(projectName, projectDescription, projectButtons) {
	let mainDiv = document.getElementById('results');

	// card div
	let cardDiv = document.createElement('div');

	cardDiv.classList.add('card');
	cardDiv.classList.add('mt-4');
	// cardmt-4

	// card body
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');

	let a = document.createElement('a');
	a.href = './pages/project_description.html?name=' + projectName;
	// a.onClick = projectClick(projectName, 'index')
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

function addProfile(firstName, lastName, profileBio) {
	let mainDiv = document.getElementById('results');

	// card div
	let cardDiv = document.createElement('div');

	cardDiv.classList.add('card');
	cardDiv.classList.add('mt-4');
	// cardmt-4

	// card body
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');

	let a = document.createElement('a');
	a.href = './pages/profile.html?lastName=' + lastName;
	// a.onClick = projectClick(projectName, 'index')
	a.textContent = firstName + ' ' + lastName;
	a.classList.add('card-title');
	a.style = 'color: green;font-size: 24px;';

	let text = document.createElement('p');
	text.textContent = profileBio;

	let rowDiv = document.createElement('div');
	rowDiv.classList.add('row');
	rowDiv.classList.add('mb-2');
	rowDiv.classList.add('ml-0');

	cardBodyDiv.appendChild(a);
	cardBodyDiv.appendChild(text);
	cardBodyDiv.appendChild(rowDiv);

	cardDiv.appendChild(cardBodyDiv);
	mainDiv.appendChild(cardDiv);
}

