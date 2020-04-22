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

function projectCreate() {
    (async () => {
	let projectName = document.getElementById("exampleFormControlInput1").value;
	let projectDescription = document.getElementById("exampleFormControlTextarea1").value;
	let projectWorkers = document.getElementById("exampleFormControlTextarea2").value;
	let projectProgress = document.getElementById("exampleFormControlTextarea4").value;
	let projectLinks = document.getElementById("exampleFormControlTextarea5").value;
	//HOW TO INCORPORATE BUTTONS??
	let projectNumWorkers = document.getElementById("exampleFormControlInput2").value;

	const projectData = {   'projectName' : projectName,
							'projectDecription' : projectDescription,
							'projectWorkers' : projectWorkers,
							'projectProgress' : projectProgress,
							'projectLinks' : projectLinks,
							'projectNumWorkers' : projectNumWorkers }

	const newURL = url + "/users/" + userName + "/createProject";
	console.log("projectCreate: fetching " + newURL);
	const resp = await postData(newURL, projectData);
	const j = await resp.json();

	//GOAL: Find a way to display the json response on a DIFFERENT PAGE, namely project_description.html.
	//This create_project --> project_description may be more straightforward since it is the same exact content, but eventually
	//we'll need to get new content to diplay on the project_desciption page (when we click on the link to a project, for example)

	if (j['result'] !== 'error') {
	    //No error result
	} else {
	    //Error result;
	}
    })();
}
