# Back-end

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

/inventory
Description
Used for managing total inventory and individual items. Able to Add items, remove items, update items AND get a list of the total inventory for the user currently logged in.


Operation and Schemas

Has an auto-incrementing unique id number (you don't need to add this)

An "item" name is required and must be unique, with a max length of 255 characters

A quantity is optional. If you don't add a quantity, it will default to 0.

The units are required . This would be useful for entering units of measure for ingredients. Can be anything and is made to be flexible for a soup kitchen and many possible measurements for kitchen ingredirents (lbs, oz's, bundles, bunches, etc.)

example:

id	name	quantity	units
1	Chicken Soup	25	

GET
https://illservesoup.herokuapp.com/api/inventory 

Returns a JSON object with the entire inventory. User must be logged in to access.

Success: Returns a status of 200 and a JSON object with the inventory of all registered users. 

  {
        "id": 1,
        "username": "bob11",
        "item": "apple",
        "quantity": 10,
        "units": " 1 lb",
        "threshold": 1
    },

    {
        "id": 4,
        "username": "kobe24",
        "item": "chicken broth mix",
        "quantity": 100,
        "units": "ounces",
        "threshold": 1
    }

POST
The request body must include a unique name, and can optionally include quantity and units. User must be logged in to access.

{
	name:  "Apples", //required
	quantity:  89,
	units:  "ounces",
},
Success: Returns a status of 201 and a JSON object with a success message and the id number of the new item.



POST
Body Schema:


{	"userId": 5, 
    "username": "kobe24",
    "item": "pear",
    "quantity": "10",
    "units": "5 oz"
}