var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var url = 'http://localhost:8080/codetogether'; //Local host
//const url = 'https://cs-326-final-omega.herokuapp.com/codetogether';
var projName = '';
window.onload = function () {
    var url2 = document.location.href, params = url2.split('?')[1].split('&'), //Will be 'name' or 'lastName' in our case (Splits after ?, before &)
    data = {
        name: null,
        lastName: null
    }, tmp;
    this.console.log('Original url: ' + url2);
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('='); //Splits around equals, so tmp[0] is the variable name and tmp[1] is the variable value
        data[tmp[0]] = tmp[1];
    }
    this.console.log('data[name]: ' + data['name']);
    this.console.log('data[lastName]: ' + data['lastName']);
    //this.console.log('data[email]: ' + data['email']);
    //Read project from html
    if (data['name']) {
        this.console.log(data.name);
        this.projectRead(data.name);
        this.projName = data.name;
    }
    else if (data['lastName']) {
        //Read profile from html
        this.console.log('calling profileRead on: ' + data.lastName);
        this.profileRead(data.lastName);
    }
    // //Signing in, redirect to update the rest of their profile
    // else if(data['email']){
    // 	this.console.log('redirect to profileUpdate with param: ' + data.email);
    // 	this.profileUpdate(data.email);
    // }
    // haven't thought how would index.html work with the same function
};
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        body: JSON.stringify(data)
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
//CREATE functions
function projectCreate() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var pName, projectName, pDesc, projectDescription, pWork, projectWorkers, pProg, projectProgress, pLink, projectLinks, pNW, projectNumWorkers, projectButtons, projectData, newURL, resp, j, createProjectOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pName = document.getElementById('projectName');
                    projectName = pName.value;
                    pDesc = document.getElementById('projectDescription');
                    projectDescription = pDesc.value;
                    pWork = document.getElementById('projectWorkers');
                    projectWorkers = pWork.value;
                    pProg = document.getElementById('projectProgress');
                    projectProgress = pProg.value;
                    pLink = document.getElementById('projectLinks');
                    projectLinks = pLink.value;
                    pNW = document.getElementById('projectNumWorkers');
                    projectNumWorkers = pNW.value;
                    projectButtons = $.map($('input:checkbox:checked'), function (e, i) {
                        return e.value;
                    });
                    projectData = {
                        projectName: projectName,
                        projectDescription: projectDescription,
                        projectWorkers: projectWorkers,
                        projectProgress: projectProgress,
                        projectLinks: projectLinks,
                        projectButtons: projectButtons,
                        projectNumWorkers: projectNumWorkers
                    };
                    newURL = url + '/users/' + 'omega' + '/createProject';
                    console.log('projectCreate: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, projectData)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    createProjectOutput = document.getElementById('createProjectOutput');
                    createProjectOutput.style.visibility = 'visible';
                    if (j['result'] !== 'error') {
                        createProjectOutput.innerHTML = 'Project: ' + j['name'] + ' was created successfully';
                    }
                    else {
                        createProjectOutput.innerHTML = 'Error Occurred During Creation';
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
function profileCreate() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var profileID, fName, firstName, lName, lastName, em, email, pword, password, profileData, newURL, resp, j, createProfOutput, hyperlink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profileID = Math.floor(Math.random() * 100000);
                    fName = document.getElementById('firstName');
                    firstName = fName.value;
                    lName = document.getElementById('lastName');
                    lastName = lName.value;
                    em = document.getElementById('inputEmail');
                    email = em.value;
                    pword = document.getElementById('inputPassword');
                    password = pword.value;
                    profileData = {
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
                    newURL = url + '/users/' + 'omega' + '/createProfile';
                    console.log('projectCreate: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, profileData)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    createProfOutput = document.getElementById('createProfOutput');
                    createProfOutput.style.visibility = 'visible';
                    if (j['result'] !== 'error') {
                        console.log(j['result']);
                        hyperlink = "<a href='edit_profile.html'>Click Here to Finish Your Profile!</a>";
                        console.log('hyperlink: ' + hyperlink);
                        createProfOutput.innerHTML =
                            'User:' + firstName + ' ' + lastName + "'s profile has been created. " + hyperlink;
                    }
                    else {
                        createProfOutput.innerHTML = 'Error Occurred During Profile Creation';
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
//READ Functions
function projectRead(name) {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var pName, projectData, userName, newURL, resp, j, project, projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectButtons, projectNumWorkers, rowDiv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, name];
                case 1:
                    pName = _a.sent();
                    projectData = {
                        projectName: pName
                    };
                    userName = 'omega';
                    newURL = url + '/users/' + userName + '/readProject';
                    console.log('projectRead: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, projectData)];
                case 2:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 3:
                    j = _a.sent();
                    project = j.projectAttributes;
                    console.log(project);
                    projectName = project.projectName;
                    projectDescription = project.projectDescription;
                    projectWorkers = project.projectWorkers;
                    projectProgress = project.projectProgress;
                    projectLinks = project.projectLinks;
                    projectButtons = project.projectButtons;
                    projectNumWorkers = project.projectNumWorkers;
                    rowDiv = document.getElementById('projectButtons');
                    projectButtons.forEach(function (element) {
                        var button = document.createElement('button');
                        button.type = 'button';
                        button.classList.add('btn');
                        button.classList.add('btn-success');
                        button.classList.add('btn-sm');
                        button.classList.add('mr-1');
                        if (element !== null) {
                            button.classList.add('mt-2');
                        }
                        button.textContent = element;
                        rowDiv.appendChild(button);
                    });
                    //let readProjectOutput = document.getElementById('readProjectOutput');
                    //readProjectOutput.style.visibility = 'visible';
                    if (j['result'] !== 'error') {
                        //Assigning variables to html elements
                        document.getElementById('projectName').innerHTML = projectName;
                        document.getElementById('projectDescription').innerHTML = projectDescription;
                        document.getElementById('projectWorkers').innerHTML = projectWorkers;
                        document.getElementById('projectProgress').innerHTML = projectProgress;
                        document.getElementById('projectLinks').innerHTML = projectLinks;
                        document.getElementById('projectNumWorkers').innerHTML = projectNumWorkers;
                        //readProjectOutput.innerHTML = 'Read the output of project: ' + j['name'];
                    }
                    else {
                        //readProjectOutput.innerHTML = 'Does not work';
                        console.log('Error Occurred in projectRead');
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
function profileRead(lastName) {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var lName, profileData, userName, newURL, resp, j, profile, firstName, lastName2, bio, about, projects, links, skillsArray, rowDiv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lastName];
                case 1:
                    lName = _a.sent();
                    profileData = {
                        lastName: lName
                    };
                    userName = 'omega';
                    newURL = url + '/users/' + userName + '/readProfile';
                    console.log('counterRead: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, profileData)];
                case 2:
                    resp = _a.sent();
                    console.log(resp);
                    return [4 /*yield*/, resp.json()];
                case 3:
                    j = _a.sent();
                    profile = j.profileAttributes;
                    console.log('profile in profileRead : ' + profile);
                    firstName = profile.firstName;
                    lastName2 = profile.lastName;
                    bio = profile.profileBio;
                    about = profile.profileAbout;
                    projects = profile.profileProjects;
                    links = profile.profileLinks;
                    skillsArray = profile.skills;
                    rowDiv = document.getElementById('skillsSection');
                    skillsArray.forEach(function (element) {
                        var button = document.createElement('button');
                        button.type = 'button';
                        button.classList.add('btn');
                        button.classList.add('btn-success');
                        button.classList.add('btn-sm');
                        button.classList.add('mr-1');
                        if (element !== null) {
                            button.classList.add('mt-2');
                        }
                        button.textContent = element;
                        rowDiv.appendChild(button);
                    });
                    if (j['result'] !== 'error') {
                        //Now, fill in HTML with stuff we read
                        document.getElementById('profileName').innerHTML = '<b>' + firstName + ' ' + lastName2 + '</b>';
                        document.getElementById('bio').innerHTML = bio;
                        document.getElementById('aboutSection').innerHTML = about;
                        document.getElementById('projectSection').innerHTML = projects;
                        document.getElementById('contactSection').innerHTML = links;
                    }
                    else {
                        document.getElementById('profileName').innerHTML = 'User Not Found';
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
//UPDATE Functions
function projectUpdate() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var pName, projectName, pDesc, projectDescription, pWork, projectWorkers, pProg, projectProgress, pLink, projectLinks, pNW, projectNumWorkers, projectButtons, projectData, userName, newURL, resp, j, updateProjectOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pName = document.getElementById('projectName');
                    projectName = pName.value;
                    pDesc = document.getElementById('projectDescription');
                    projectDescription = pDesc.value;
                    pWork = document.getElementById('projectWorkers');
                    projectWorkers = pWork.value;
                    pProg = document.getElementById('projectProgress');
                    projectProgress = pProg.value;
                    pLink = document.getElementById('projectLinks');
                    projectLinks = pLink.value;
                    pNW = document.getElementById('projectNumWorkers');
                    projectNumWorkers = pNW.value;
                    projectButtons = $.map($('input:checkbox:checked'), function (e, i) {
                        return e.value;
                    });
                    projectData = {
                        projectName: projectName,
                        projectDescription: projectDescription,
                        projectWorkers: projectWorkers,
                        projectProgress: projectProgress,
                        projectLinks: projectLinks,
                        projectButtons: projectButtons,
                        projectNumWorkers: projectNumWorkers
                    };
                    userName = 'omega';
                    newURL = url + '/users/' + userName + '/updateProject';
                    console.log('counterUpdate: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, projectData)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    updateProjectOutput = document.getElementById('updateProjectOutput');
                    updateProjectOutput.style.visibility = 'visible';
                    if (j['result'] !== 'error') {
                        updateProjectOutput.innerHTML = 'Project: ' + j['name'] + ' has been updated successfully';
                    }
                    else {
                        updateProjectOutput.innerHTML = 'Error Occurred During Update';
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
function profileUpdate() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var fName, firstName, lName, lastName, bio, profileBio, about, profileAbout, projects, profileProjects, links, profileLinks, skills, profileData, userName, newURL, resp, j, updateOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fName = document.getElementById('firstNameInput');
                    firstName = fName.value;
                    lName = document.getElementById('lastNameInput');
                    lastName = lName.value;
                    bio = document.getElementById('bioInput');
                    profileBio = bio.value;
                    about = document.getElementById('aboutInput');
                    profileAbout = about.value;
                    projects = document.getElementById('projectInput');
                    profileProjects = projects.value;
                    links = document.getElementById('linkInput');
                    profileLinks = links.value;
                    skills = $.map($('input:checkbox:checked'), function (e, i) {
                        return e.value;
                    });
                    profileData = {
                        //profileID: profileID,
                        //profileEmail: email,
                        //profilePassword: password,
                        firstName: firstName,
                        lastName: lastName,
                        profileBio: profileBio,
                        profileAbout: profileAbout,
                        profileProjects: profileProjects,
                        profileLinks: profileLinks,
                        skills: skills
                    };
                    userName = 'omega';
                    newURL = url + '/users/' + userName + '/updateProfile';
                    console.log('counterUpdate: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, profileData)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    updateOutput = document.getElementById('updateOutput');
                    updateOutput.style.visibility = 'visible';
                    if (j['result'] !== 'error') {
                        updateOutput.innerHTML = 'User: ' + j['name'] + "'s " + 'profile has been updated';
                    }
                    else {
                        updateOutput.innerHTML = 'Error Occurred During Update';
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
//DELETE Functions
function projectDelete() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var deleteProject, userName, data, newURL, resp, j, deleteOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // let projectName = this.projecName
                    console.log(this.projName);
                    deleteProject = this.projName;
                    console.log(this.projName);
                    userName = 'omega';
                    data = { name: deleteProject };
                    newURL = url + '/users/' + userName + '/deleteProject';
                    console.log('counterDelete: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j['result'] !== 'error') {
                        deleteOutput = document.getElementById('deleteOutput');
                        deleteOutput.style.visibility = 'visible';
                        deleteOutput.innerHTML = 'Project: ' + deleteProject + ' has been deleted';
                    }
                    else {
                        document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
                    }
                    // tried javascript sleep
                    setTimeout(function () {
                        console.log('World!');
                    }, 5000);
                    // redirects to the index.html page after deleting
                    document.location.href = '../index.html';
                    return [2 /*return*/];
            }
        });
    }); })();
}
function profileDelete() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var pName, profileName, lastName, userName, data, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pName = document.getElementById('profileName');
                    profileName = pName.innerHTML;
                    console.log("profileName: " + profileName);
                    lastName = profileName.split(' ')[1].split('<')[0];
                    console.log('lastName : ' + lastName);
                    userName = 'omega';
                    data = { lastName: lastName };
                    newURL = url + '/users/' + userName + '/deleteProfile';
                    console.log('counterDelete: fetching ' + newURL);
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j['result'] !== 'error') {
                        // let deleteOutput = document.getElementById('deleteProf') as HTMLOutputElement;
                        // deleteOutput.style.visibility = 'visible';
                        // deleteOutput.innerHTML = 'Profile: ' + profileName + ' has been deleted';
                    }
                    else {
                        //document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
//Clears the results div and adds a "Results" header
function resultsHelper() {
    var resultsDiv = document.getElementById('results');
    var child = resultsDiv.lastElementChild;
    while (child) {
        resultsDiv.removeChild(child);
        child = resultsDiv.lastElementChild;
    }
    var resultHeader = document.createElement('h5');
    resultHeader.classList.add('card-header');
    resultHeader.classList.add('mt-4');
    resultHeader.innerHTML = 'Results:';
    resultsDiv.appendChild(resultHeader);
}
// get all projects from the database
function findAllProjects() {
    var _this = this;
    console.log('finding all projects');
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, newURL, resp, j, projects, i, projectName, projectDescription, projectButtons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {};
                    newURL = url + '/users/' + 'omega' + '/allProjects';
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    console.log('getting response');
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    console.log('printing response:-- ');
                    console.log(resp);
                    projects = j['projects'];
                    console.log(projects);
                    resultsHelper();
                    for (i = 0; i < projects.length; i++) {
                        projectName = projects[i]['projectName'];
                        projectDescription = projects[i]['projectDescription'];
                        projectButtons = projects[i]['projectButtons'];
                        addProject(projectName, projectDescription, projectButtons);
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
//Returns specific projects with projectName matching the one given in the serach bar
function projectSearch() {
    var _this = this;
    console.log('finding all projects');
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var sk, searchKey, data, newURL, resp, j, resultList, i, projectName, projectDescription, projectButtons, i, firstName, lastName, profileBio;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sk = document.getElementById('searchBar');
                    searchKey = sk.value;
                    data = {
                        searchKey: searchKey
                    };
                    console.log('Search key in client: ' + searchKey);
                    newURL = url + '/users/' + 'omega' + '/projectSearch';
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    console.log('getting response');
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    console.log('printing response:-- ');
                    console.log(resp);
                    resultList = j['resultList'];
                    console.log('resultList: ' + resultList);
                    console.log('resultList[0][projectName]: ' + resultList[0]['projectName']);
                    console.log('resultList[0][lastName]: ' + resultList[0]['lastName']);
                    resultsHelper();
                    if (resultList[0]['projectName']) {
                        console.log('resultList contains projects');
                        for (i = 0; i < resultList.length; i++) {
                            projectName = resultList[i]['projectName'];
                            projectDescription = resultList[i]['projectDescription'];
                            projectButtons = resultList[i]['projectButtons'];
                            addProject(projectName, projectDescription, projectButtons);
                        }
                    }
                    else if (resultList[0]['lastName']) {
                        console.log('resultList contains profiles');
                        for (i = 0; i < resultList.length; i++) {
                            firstName = resultList[i]['firstName'];
                            lastName = resultList[i]['lastName'];
                            profileBio = resultList[i]['profileBio'];
                            addProfile(firstName, lastName, profileBio);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
// trying something
// once we load all the projects in index.html
// onclick function changes the global variable - projectName
// then once we go to the project_description page - we use the project name and load that project
// function projectClick(name, page_name) {
// 	if (page_name === 'index') {
// 		// we get the project name here when they click on the function
// 		projectName = name;
// 		window.location.replace("./pages/page_description.html");
// 	} else if (page_name === 'description') {
// 		let n = projectName;
// 		console.log(n);
// 	}
// }
function addProject(projectName, projectDescription, projectButtons) {
    var mainDiv = document.getElementById('results');
    // card div
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add('mt-4');
    // cardmt-4
    // card body
    var cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    var a = document.createElement('a');
    //a.href = './pages/project_description.html?name=' + projectName;
    a.setAttribute('href', './pages/project_description.html?name=' + projectName);
    // a.onClick = projectClick(projectName, 'index')
    a.textContent = projectName;
    a.classList.add('card-title');
    //a.style = 'color: green;font-size: 24px;';
    a.setAttribute('style', 'color: green;font-size: 24px;');
    var text = document.createElement('p');
    text.textContent = projectDescription;
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.classList.add('mb-2');
    rowDiv.classList.add('ml-0');
    var skills = projectButtons;
    for (var i = 0; i < projectButtons.length; i++) {
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
    var mainDiv = document.getElementById('results');
    // card div
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add('mt-4');
    // cardmt-4
    // card body
    var cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    var a = document.createElement('a');
    //a.href = './pages/profile.html?lastName=' + lastName;
    a.setAttribute('href', './pages/profile.html?lastName=' + lastName);
    // a.onClick = projectClick(projectName, 'index')
    a.textContent = firstName + ' ' + lastName;
    a.classList.add('card-title');
    //a.style = 'color: green;font-size: 24px;';
    a.setAttribute('style', 'color: green;font-size: 24px;');
    var text = document.createElement('p');
    text.textContent = profileBio;
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.classList.add('mb-2');
    rowDiv.classList.add('ml-0');
    cardBodyDiv.appendChild(a);
    cardBodyDiv.appendChild(text);
    cardBodyDiv.appendChild(rowDiv);
    cardDiv.appendChild(cardBodyDiv);
    mainDiv.appendChild(cardDiv);
}
