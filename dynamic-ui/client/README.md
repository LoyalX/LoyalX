# <img src="https://avatars1.githubusercontent.com/u/33500684" height="45px"/> LoyalX Dynamic UI

## Table of Contents
 - [Getting Started](#getting-started)
 - [Client](#client)

 ## Getting Started

* Install latest current Version of [Node.js](https://nodejs.org/en/download/current/)
* Install the cordova CLI (`npm install -g cordova`)
* Install the typescript CLI (`npm install -g typescript`)
* Install the angular CLI (`npm install -g angular-cli`)
* Install the ionic CLI (`npm install -g ionic`)

## Client

### Install:
```
npm install
ionic cordova prepare
ionic serve
```

### Deploying

* PWA - Un-comment [this](https://github.com/LoyalX/LoyalX-App/blob/master/dynamic-ui/client/src/index.html#L21,L22,L23,L24,L25,L26,L27,L28), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Browser - Run `ionic cordova run browser --prod`
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`

