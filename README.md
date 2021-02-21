**express**
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications

**express-validator**
To Validate the body data on the server in the express framework, we will be using this library. It's a server-side data validation library. So, even if a malicious user bypasses the client-side verification, the server-side data validation will catch it and throw an error.

**body-parser**
It is nodejs middleware for parsing the body data.

**bcryptjs**
This library will be used to hash the password and then store it to database.This way even app administrators can't access the account of a user.

**jsonwebtoken**
jsonwebtoken will be used to encrypt our data payload on registration and return a token. We can use that token to authenticate ourselves to secured pages like the dashboard. There would also an option to set the validity of those token, so you can specify how much time that token will last.

**mongoose**
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

_Help_

- https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i

mongodb cmd : "C:\Users\Janardan Pethani\mongodb\bin\mongod.exe" --dbpath="C:\Users\Janardan Pethani\mongodb-data"
