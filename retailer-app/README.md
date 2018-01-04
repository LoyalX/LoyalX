# <img src="https://avatars1.githubusercontent.com/u/33500684" height="45px"/> LoyalX Retailer Application

This is a demo of LoyalX Retailer Application. It is still in development.

## Table of Contents
 - [Getting Started](#getting-started)
 - [App Preview](#app-preview)
 - [Deploying](#deploying)


## Getting Started

* Clone this repository: `git clone https://github.com/LoyalX/LoyalX-App`.
* Run `npm install` from the retalier-app root.
* Install the ionic CLI (`npm install -g ionic`)
* Run `ionic serve` in a terminal from the project root.

## App Preview

[Try it live](http://165.165.131.155:8102/)


## Deploying

* PWA - Un-comment [this](https://github.com/LoyalX/LoyalX-App/blob/master/retailer-app/src/index.html#L19,L20,L21,L22,L23,L24,L25), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Browser - Run `ionic cordova run browser --prod`
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`
