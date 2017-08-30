# Day 13 Lab -- MongoDB and express

NPM install to get needed packages.

NPM Start will start the server.

This project uses MongoDB to store events.

An event must have a title (a string) and my have attendees (an array) and a location (a string).

To create a new event make a POST request to /localhost/3000/api/event.  The body should be a valid json object and must include a title property, and may contain any of the optional properties.
  The response returned from the server will contain the newly created event in the body.

To retrieve an event that has already been created make a GET request to localhost/3000/api/event/<id> where <id> is the id of the event you are trying to recieve.
  The response returned from the server will contain the event with that ID.

To update an event make a PUT request to localhost/3000/api/event/<id> where <id> is the id of the event you are trying to update.  The body should be a valid json object and may contain any properties valid for an event.  It may not be empty.
  The response returned from the server will contain the newly updated event in the body.

To delete an event that has already been created make a DELETE request to localhost/3000/api/event/<id> where <id> is the id of the event you are trying to delete.
