# <img src="http://l0yalx.io/uploads/MusicKings_logo%202-nji.png" height="45px"/> LoyalX Applications

A demo of LoyalX Applications. It is still in development.


## Table of Contents
 - [Getting Started](#getting-started)
 - [Retailer Application](#retailer-application)
 - [User Application](#user-application)

 ## Getting Started

* Install latest Current Version of [Node.js](https://nodejs.org/en/download/current/)
* Install the cordova CLI (`npm install -g cordova`)
* Install the typescript CLI (`npm install -g typescript`)
* Install the angular CLI (`npm install -g angular-cli`)
* Install the ionic CLI (`npm install -g ionic`)
* Install the development environment, testing framework and asset pipeline for Ethereum (`npm install -g truffle`)
* Install the ethereum client for testing and development (`npm install -g ethereumjs-testrpc`)

**Note:** Ran into a problem on windows? Install its build tools : `npm install --global windows-build-tools`.

**Note:** Is your build slow? Update `npm` to 3.x: `npm install -g npm`.







## Retailer Application

### App Preview

[Try it live](http://165.165.131.155:8102/)


### Deploying

* PWA - Un-comment [this](https://github.com/MarcWafik/Loyalty-Chain/blob/master/retailer-app/src/index.html#L19,L20,L21,L22,L23,L24,L25), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Browser - Run `ionic cordova run browser --prod`
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`






## User Application

### App Preview

[Try it live](http://165.165.131.155:8101/)


### Deploying

* PWA - Un-comment [this](https://github.com/MarcWafik/Loyalty-Chain/blob/master/user-app/src/index.html#L19,L20,L21,L22,L23,L24,L25), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Browser - Run `ionic cordova run browser --prod`
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`


