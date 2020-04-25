# Group Omega, CS 326, UMass Amherst, Website: CodeTogether

# API
https://docs.google.com/document/d/1ZHUFN1Cn2qoWK_u0NsNuoe08plqc7KW53t5yCGObwlc/edit#  
  
Generally, our API handles CRUD operations for two objects, projects and profiles.  
Our endpoints have a  simple format:  
They all start with codetogether/, just as the in-class exercises started with counter/  
/users/:userID/(crud)(Object)  
:userID : The ID of the user who is currently logged in  
(crud) : The operation you wish to perform (create, read, update, delete). Note the lowercase 'c'.  
(Object) : The object type you wish to perform the operation on (Project, Profile). Note the uppercase 'O'.  
  
# Heroku URL
https://cs-326-final-omega.herokuapp.com  
  
# Client Interface Screenshots
Here we'll see the before and after of the creation of a project. Before is the screen before clicking the create button. After, we receive and alert from the server, giving us the name of the project that the user created.  
<img width="1137" alt="Screen Shot 2020-04-24 at 11 28 59 PM" src="https://user-images.githubusercontent.com/42826472/80270137-8f39f780-8683-11ea-8600-fdcbaa25d666.png">  
<img width="1162" alt="Screen Shot 2020-04-24 at 11 28 17 PM" src="https://user-images.githubusercontent.com/42826472/80270161-ba244b80-8683-11ea-94a0-f5b00eaf558c.png">  
  
Now, we see a similar interaction for reading a project:  

  
Interaction for updating a project:  
<img width="1142" alt="Screen Shot 2020-04-24 at 11 33 51 PM" src="https://user-images.githubusercontent.com/42826472/80270233-49316380-8684-11ea-9323-03b46e5831d6.png">  
<img width="1127" alt="Screen Shot 2020-04-24 at 11 33 15 PM" src="https://user-images.githubusercontent.com/42826472/80270250-53ebf880-8684-11ea-9658-c54561a65899.png">  
  
Interaction for deleting a project:  
<img width="1133" alt="Screen Shot 2020-04-24 at 11 39 30 PM" src="https://user-images.githubusercontent.com/42826472/80270343-03c16600-8685-11ea-8ab0-3076e8c02ac6.png">  
<img width="1149" alt="Screen Shot 2020-04-24 at 11 39 47 PM" src="https://user-images.githubusercontent.com/42826472/80270346-0cb23780-8685-11ea-9921-d1555d7e5942.png">  
  
# *Rough* Breakdown of work:  
client.js - See endpoints  
myserver-routing.ts - See endpoints 
Connecting HTML to JS - TJ  
Connecting to Heroku Server - TJ and Ron  
MongoDB Progress - Aryan  

Breakdown of endpoints:  
Project endpoints:  
create - Aryan    
read - Ron  
update - Ron   
delete - Ron  
Profile Endpoints:  
create - TJ  
read - TJ
update - Ron  
delete - TJ  
Other:  
findAllProjects - Aryan  


