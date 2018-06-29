<img src="http://l0yalx.io/uploads/MusicKings_logo%202-nji.png" height="45px"/> LoyalX Smart Contracts
=========================================================================================

self hosted contracts to help developer run local tests

### Steps to run

For reference: http://truffleframework.com/tutorials/pet-shop


### Install:

1. `$ npm install -g ethereumjs-testrpc`
2. `$ npm install`


### Setup:

1. start the test server `$ testrpc`
2. compile the contracts `$ npm run compile`
3. migrate the contracts `$ npm run migrate`
4. run lite server to host the contract apb `$ npm run dev`


### Hosted apb contracts:

`GET: {host ip}:3000/{contract name}.json`   
* Factory contract apb `GET: localhost:3000/LoyaltyTokenFactory.json`
* Token contract apb `GET: localhost:3000/LoyaltyToken.json`
