## User API User DataBase

This web app allows you to store and edit User information in a mongodb.

 ### Routes
 - /api/chat/:id 
 - /api/chat/
 #### **GET**
 - Returns a 200 response code and a body containing the information of the User
 #### **PUT**
 - Returns a 200 response code and a body with updated information. If only one property needs to be updated you can just have that property in the body.
 #### **DELETE**
 - Returns a 204 response code if deletion was successful
 #### **POST**
 - Returns a 200 response code with the body
