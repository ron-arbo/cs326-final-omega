const url = "http://localhost:8080/counter"; // NOTE NEW URL

// NEW: helper method for posting data
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


function createProject() {
	(async () => {
		// document.getElementById("output").innerHTML = "works";
		let userName = 'omega'; // we need to get this from the login page
		// let projectName = document.getElementById("projectname").value;
		// let description = document.getElementById("description").value;
		// let alreadyWorking = document.getElementById("alreadyWorking").value;
		// let farAlong = document.getElementById("farAlong").value;
		// let helpfulLinks = document.getElementById("helpfulLinks").value;
		// let languages = document.getElementById("languages").value;

		const data = { 
			'name': 'projectName', 
			'description': 'description'
		};
		
		// this is how project.js interacts with the POST url
		// we need a different url here - for the posts? or maybe no
		const newURL = url + "/users/" + userName + "/create";

		const resp = await postData(newURL, data);

		console.log("printing json now");

		console.log(resp)
		// getting an error of something isn't json but we're parsing it that way
		// const j = await resp.json();
		// // j is the JSON database for us - response
		// console.log(j);


		// if (j['result'] !== 'error') {
		// // we need to show a page with a thumbs up or something when they click the 
		//     document.getElementById("output").innerHTML = "works";
		// } else {
		//     document.getElementById("output").innerHTML = "does not work";
		// }
	})();
}

