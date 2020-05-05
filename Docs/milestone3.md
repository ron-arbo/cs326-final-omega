## Milestone 3 Docs

# Database Documentation
Our database is a collection containing two types of documents: Projects and Profiles. They are described below  
```Typescript
    project document {  
        _id: <ObjectId>,            //ObjectId provided by MongoDB  
        projectName: String,        //Name of the project  
        projectButtons: String[],   //Array of all languages used to create the project (Ex: ["Java", "HTML", "CSS"])  
        projectDescription: String, //Description of the project  
        projectLinks: String,       //A string of helpful links related to the project (Githubs, guides, url, etc.)  
        projectNumWorkers: String,  //The number of people you're looking for to help with the project  
        projectProgress: String,    //The amount of progress made on the current project  
        projectWorkers: String,     //The current people working on the project
    } 
```  

```Typescript
    profile document {  
        _id: <ObjectId>,           //ObjectId provided by MongoDB  
        profileID: String,         //ID used to identify specific profile  
        firstName: String,         //First name of user  
        lastName: String,          //Last name of user  
        profileAbout: String,      //The 'About' section for the user's profile page  
        profileBio: String,        //The user's bio section  
        profileEmail: String,      //The user's email used to sign and log in   
        profileLinks: String,      //The user's links for things like github, linkedin, facebook, etc.  
        profilePassword: String,   //The password used by the user to sign and log in  
        profileProjects: String,   //The 'projects' section for the user's profile page  
    } 
```

# *Rough* Breakdown of Work
Note that we have two methods for the put(), get(), and del() operations. One for projects, and one for profiles. Their implementation is very similar.  
Creation of database and connection in code: Aryan  
put() Method: Mostly Aryan, Small Part Ron  
get() Method: Mostly Ron, Small Part Aryan  
del() Method: Ron  
find() Method: Mostly Aryan, Small Part TJ  
find() Essentially uses get() to retrieve a list of projects in the database to display in our HTML  
Adding radio button selections from HTML into DB entries: TJ  
