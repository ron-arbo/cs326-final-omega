const url = "http://localhost:8080/counter"; // NOTE NEW URL

async function postData(url, data) {
    const resp = await fetch(url,
                             {
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

// function projectCreate() {
//     (async () => {
// 	let projectName = document.getElementById("exampleFormControlInput1").value;
// 	let projectDescription = document.getElementById("exampleFormControlTextarea1").value;
// 	let projectWorkers = document.getElementById("exampleFormControlTextarea2").value;
// 	let projectProgress = document.getElementById("exampleFormControlTextarea4").value;
// 	let projectLinks = document.getElementById("exampleFormControlTextarea5").value;
// 	//HOW TO INCORPORATE BUTTONS??
// 	let projectNumWorkers = document.getElementById("exampleFormControlInput2").value;

// 	const projectData = {   'projectName' : projectName,
// 							'projectDecription' : projectDescription,
// 							'projectWorkers' : projectWorkers,
// 							'projectProgress' : projectProgress,
// 							'projectLinks' : projectLinks,
// 							'projectNumWorkers' : projectNumWorkers };

// 	//For now, userName will be omega
// 	const newURL = url + "/users/" + "omega" + "/createProject";
// 	console.log("projectCreate: fetching " + newURL);
// 	const resp = await postData(newURL, projectData);
// 	const j = await resp.json();

// 	//GOAL: Find a way to display the json response on a DIFFERENT PAGE, namely project_description.html.
// 	//This create_project --> project_description may be more straightforward since it is the same exact content, but eventually
// 	//we'll need to get new content to diplay on the project_desciption page (when we click on the link to a project, for example)

// 	if (j['result'] !== 'error') {
// 	    console.log(j['result']);
// 	} else {
// 	    conole.log("Error occurred");
// 	}
//     })();
// }

function counterCreate() {
    (async () => {	
	// let counterName = document.getElementById("countername").value;
	// let userName = document.getElementById("username").value;
	let counterName = "counter1";
	let userName = "omega";

	const data = {'name' : counterName};

	const newURL = url + "/users/" + userName + "/create";
	console.log("counterCreate: fetching " + newURL);
	const resp = await postData(newURL, data);
	console.log(resp);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    console.log(j['result']);
	} else {
	    console.log('error');
	}
    })();
}

function counterRead() {
    (async () => {
	let userName = 'omega'
	let counterName = 'counter1'

	const data = { 'name' : counterName};

	const newURL = url + "/users/" + userName + "/read";
	console.log("counterRead: fetching " + newURL);
	const resp = await postData(newURL, data);
	console.log(resp);
	const j = await resp.json();
	if (j['result'] !== 'error') {
		console.log('connected, and received some valid JSON data');
	} else {
	    console.log('error');
	}	    
    })();
}
