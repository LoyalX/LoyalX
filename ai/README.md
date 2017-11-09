# RESTFUL API for AI Engine for l0yalx

## Requirements 

- Node and npm
- Download NodeJS from http://nodejs.org/

## Installation

- Install dependencies: `npm install`

MONGODB:
- Make sure to create account for mongoDB @ mongolab.com for Database
- Update credentials and db path in server.js mongoose.connect....
- Create the DB

BLUEMIX WATSON
- Make sure to create account for Bluemix AI https://github.com/watson-developer-cloud/personality-insights-nodejs
- Update it in /helpers/personality-insight.js

RUN APP
- Start the server: `node server.js`

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)
Add the Activity:
POST /api/activity HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: 17d1e49d-7624-ca4a-5d1a-926695e0aa09
user=john&activity=Purchase&vendor=Amazon&category=gold

Get profile from bluemix for user
POST /job/profile HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: 574a96f5-5327-381e-1eda-660f8adc6236
user=john&activity=browse

How AI and recommendation Works:
Once the user logsin , get the profile of teh user from IBM watson based on his past activities.
the profile which describes the user as described below. Based on teh traits , one can recommend the user with the categories that are best described by these traits.

"personality": [
        {
            "trait_id": "big5_openness",
            "name": "Openness",
            "category": "personality",
            "percentile": 0.3939352165353622,
            "children": [
                {
                    "trait_id": "facet_artistic_interests",
                    "name": "Artistic interests",
                    "category": "personality",
                    "percentile": 0.1426287298262099
                },
                {
                    "trait_id": "facet_excitement_seeking",
                    "name": "Excitement-seeking",
                    "category": "personality",
                    "percentile": 0.002038120626615292
                },
                  {
            "trait_id": "need_challenge",
            "name": "Challenge",
            "category": "needs",
            "percentile": 0.08331187428291764
        }
            ]
        },
             


## Credit / Thanks
Thanks to scotch.io for awesome tutorial.





