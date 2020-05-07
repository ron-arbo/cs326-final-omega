# Code Together

## Todo

What is done and who did it: (If I missed something you did just add it in, mostly been keeping track of myself)  
Database:  
Note that we have two methods for each operation. One for projects, and one for profiles. Their implementation is very similar.  
Creation and connection in code: Aryan  
put() Method: Mostly Aryan, Small Part Ron 
get() Method: Mostly Ron, Small Part Aryan  
del() Method: Ron  
Incorporation of Radio Buttons into DB: TJ  
find() Method: Mostly Aryan, Small Part TJ  
  
HTML Connection/Output:  
Project CRUD Operations work with DB and Output in HTML:  
Create: Aryan, I think  
Read: Ron  
Update: Ron  
Delete: TJ  
Profile CRUD Operations Work with DB and Output in HTML:  
Create: Aryan/Ron?  
Read: Ron  
Update: Ron (Need tweaks with HTML though)  
Delete: TJ  
  
Other:  
Searching Functionality: Ron  
Minor Index.html layout changes: Ron  
Hyperlink projectName in index.html to appropriate project description: Aryan  
Hyperlink lastName in index.html to appropriate profile page: Ron, but largely based off Aryan's work  
Feedback section: Aryan  
Radio buttons integration into db and HTML: TJ  
  
Things that need to be done:  
* Finish above HTML connections with DB (Try to change the need for input for delete, update)
* Some HTML might be weird with our inputs (Contact section in profile, Project section in profile, etc.)
* Add radio buttons to profiles? Either this, or we need to delete the skills section in profile

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
## Welcome screen, All projects
<img width="1436" alt="Screen Shot 2020-05-07 at 7 19 13 PM" src="https://user-images.githubusercontent.com/31454667/81354004-84765e00-9098-11ea-9717-bab4211289a5.png">
## Create project 
<img width="1437" alt="Screen Shot 2020-05-07 at 7 19 23 PM" src="https://user-images.githubusercontent.com/31454667/81354005-84765e00-9098-11ea-968b-0469ba877a13.png">
## Login
<img width="1429" alt="Screen Shot 2020-05-07 at 7 19 31 PM" src="https://user-images.githubusercontent.com/31454667/81354007-850ef480-9098-11ea-820c-a5ce060d5d29.png">
## Browse projects - from the DB
<img width="1433" alt="Screen Shot 2020-05-07 at 7 21 43 PM" src="https://user-images.githubusercontent.com/31454667/81354008-850ef480-9098-11ea-99bc-5c9b40b37899.png">
## Profile
<img width="1431" alt="Screen Shot 2020-05-07 at 7 21 56 PM" src="https://user-images.githubusercontent.com/31454667/81354009-850ef480-9098-11ea-9357-530f7f445c6d.png">
## Feedback section
<img width="1432" alt="Screen Shot 2020-05-07 at 12 25 26 AM" src="https://user-images.githubusercontent.com/31454667/81354018-8b9d6c00-9098-11ea-9698-b8e2678c2095.png">
## Project Description 
<img width="1432" alt="Screen Shot 2020-05-07 at 7 22 37 PM" src="https://user-images.githubusercontent.com/31454667/81354016-8b04d580-9098-11ea-8675-fe067f749cf8.png">

