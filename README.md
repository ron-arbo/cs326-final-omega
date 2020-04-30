# Code Together

## Todo

- [ ] Identify objects and their attributes, along with CRUD operation endpoints
- [ ] Create server.ts, database.ts, and specific page typescript file
- [ ] Plan out possible functions for API. (Ex: Create, Read, Update, Complete. Use project IDs, user IDs)
- [ ] Dummy server, just make sure client requests are addressed
- [ ] Clean up front end to work with what we're adding
- [ ] Button filters on index.html
- [ ] Add functionality to all buttons (create, update profile, etc.)
- [ ] Add another account option to indicate devloper/investor (or both)
- [ ] Find a way to hyperlink user profile to edit profile, but only for the specific user logged in
- [ ] If no user logged in, hyperlink account page to sign up
- [ ] Create a list of all the most relevant languages and frameworks people use. Make sure to include the option to include any of    these in a project or user skills section. There may be so many we may need to resort to dropdown menus

## How to run
* Open terminal and go to the project directory
* Run ``npm i @types/node`` 
* Everytime you make a change in a typescript file - ``tsc backend/*.ts``
* Run ``node backend/server-main.js``
* Go to http://localhost:8080/ 
* website: https://cs-326-final-omega.herokuapp.com/

* Project - 
    * project_id: int
    * name: string
    * description: string
    * already_working: string
    * helpful_links:[string]
    * programming_languages: [string]
    * developers_working: int (or could be an array of develop ids?)
    * developers_needed: int

* Developer
    * developer_id: int
    * name: string
    * email: string
    * skills: [string]
    * resume (maybe parse this using something in the future): pdf
    * weekly_hours: int

* Investor
    * investor_id: int
    * name: string
    * email: string
    * job_description: string
    * funding: int
    * weekly_hours: int

# Screenshots

## Welcome screen, all projects
<img width="1430" alt="Screen Shot 2020-04-08 at 5 49 23 PM" src="https://user-images.githubusercontent.com/31454667/78837203-8f6a9f80-79c1-11ea-95ac-3e9f55ecd21b.png">

## Project Description 
<img width="1432" alt="Screen Shot 2020-04-08 at 5 49 11 PM" src="https://user-images.githubusercontent.com/31454667/78837199-8da0dc00-79c1-11ea-8eb8-bd7e50c74a71.png">

## Create a new Project page
<img width="1430" alt="Screen Shot 2020-04-08 at 5 49 42 PM" src="https://user-images.githubusercontent.com/31454667/78837206-90033600-79c1-11ea-9168-b1e71cff05fe.png">

## Profile Section
<img width="1431" alt="Screen Shot 2020-04-08 at 5 50 18 PM" src="https://user-images.githubusercontent.com/31454667/78837211-909bcc80-79c1-11ea-9940-50e10eac26e4.png">

## Login
<img width="1414" alt="Screen Shot 2020-04-08 at 5 49 52 PM" src="https://user-images.githubusercontent.com/31454667/78837207-90033600-79c1-11ea-9338-b8428fb3206e.png">

## Sign Up
<img width="1429" alt="Screen Shot 2020-04-08 at 5 50 03 PM" src="https://user-images.githubusercontent.com/31454667/78837209-90033600-79c1-11ea-92ca-1c1f54a06e5b.png">
