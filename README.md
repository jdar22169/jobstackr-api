# one-minute-away-api
[![Build Status](https://travis-ci.org/one-minute-away/one-minute-away-api.svg?branch=dev)](https://travis-ci.org/one-minute-away/one-minute-away-api)

An api to get realtime sms alerts for the bus you want to catch. Setup a route, create an alert for that route and then receive a text when your bus is x mins away


### Deploy
Start by cloning the repo
```
git clone git@github.com:one-minute-away/one-minute-away-api.git
```
Set the your env variables locally and remotely

`TWILIO_ACCOUNT_SID=[your sid]`

`TWILIO_AUTH_TOKEN=[your token]`

`TWILIO_NUMBER=[your number]`

`OBA_KEY=[your one bus away key]`

`CALLBACK_ULR=[http://yoururl.com/hook/firealert]` *see below for running locally

Install dependancies
````
npm i
````

Start the mongo
````
mongod --dbpath db --smallfiles
````

Start the Server
````
npm start
````


## Users
User are required for logging in, setting up routes and creating alerts

#### New user
Create a user by posting to the /signup route with a JSON object:
```
{
"username":"exampleusername"
"phoneNumber":"55512345678"
"password":"examplepassword"
"email":"user@example.com"
}
```
will return token and user id to be used for future requests

##### Authenticate user
GET request to `/signin using basic auth`

will return token and user id to be used for future requests and any saved routes


## Find stops
In order to create aroute you must first find your stop and route with a GET request with an address as query string
```
/transit/findstops/2245+Eastlake+Ave+E,+Seattle,+WA
```
from the JSON response determine `stop_id` and the `route_id` nested in the stops (example `1_100264` and `1_9200`)


## Routes
Routes are used to set alerts and have friendly names like ('Home to School', 'Work to Home')

#### Save Route
Get a stope_id and route_id from `findstops` and create a JSON object to POST to
`/user/[user_id]/routes `
````
{
"nickname":"Home to Work",
"route_id":"1_100264",
"stop_id":"1_9200"
}
````
will returns list of routes with new route created and user object

#### List routes
GET request will return all routes a user has saved
````
/user/[userid]/route
````

### Alerts
By creating an alert you are asking to be notified via sms when your bus is within X minutes

#### Create Alert
POST json to `/user/[user_id]/alert`
with your route id and time in minutes
```
{
"savedRouteId": 'dsauf89dsf70example'
"leadTime": '8'
}
```
## Testing

Run test with
```
$mocha
```

## For Running locally
The callback url is the hook used by OBA to alert us that a bus with within X mins and fire the route to send the sms

download ngrok and save to your project folder (it is in git ignrore so don't worry)
````
./ngrok http 3000
````

````
export CALLBACK_URL="[url from ngrok]/hook/firelart"
````
