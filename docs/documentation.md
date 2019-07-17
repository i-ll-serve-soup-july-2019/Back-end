Routes

Authentication Routes

/login
/register
User Routes

Inventory Routes

/inventory


Authentication
/login

Description
This endpoint is responsible for logging a user. Upon successful authentication (with valid username and password), the endpoint will return a token. 

The receieved token will be used to access protected routes for inventory retrieval/update and post.

Operation and Schemas
POST
Body Schema:

{
    "username": string,
    "password": string
}
Output Schema:

200 Success
{
    "token": string,
}

//
400 Bad Request
Request is missing either or both username and password.

401 Unauthorized
Credentials invalid.



/register
Description
Endpoint is responsible for registering a user. Upon successful registration, the server will save received data.


Operation and Schemas
POST
Body Schema:

{
    "name": string
    "email": string,
    "username": string,
    "password": string,
    "role": string // optional

}
Output Schema:

201 Created

400 Bad Request
Check error message:

* Missing username, password, or email
* Email and/or username already exists
401 Unauthorized
Invalid credentials

