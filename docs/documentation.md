Routes
Authentication Routes

/login
/register

User Routes

will update

Authentication
/login
Description
This endpoint is responsible for logging in a user. Upon successful authentication (with valid username and password), the endpoint will return a token. 

The receieved token will be used to access inventory routes

Operation and Schemas
POST
Body Schema:

{
    "username": string,
    "password": string
}
Output Schema:

