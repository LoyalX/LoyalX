
<img src="http://l0yalx.io/uploads/MusicKings_logo%202-nji.png" height="45px"/> LoyalX Javascript API
=========================================================================================

Javascript api to interface with LoyalX protocol.

## Install

will be published soon to npm for now you can use our git repo

```
$ npm install git+https://github.com/MarcWafik/LoyalX-JSAPI.git
```

## Node Usage


```typescript
import TruffleContract = require("truffle-contract");

var loyalx = new LoyalX(
    TruffleContract,
    LoyalX.SERVERS.PRODUCTION  // you can change to an other server here exm: LoyalX.SERVERS.LOCALHOST
);
```
You now have access to the following 

## Browser Usage ( builds coming soon )
minified version and non minified version will be avalble at [Releases](https://github.com/MarcWafik/LoyalX-JSAPI/releases)   
In your `head` element, include Web3, truffle-contract then loyalx-jsapi:

```html
<script type="text/javascript" src="web3.min.js"></script>
<script type="text/javascript" src="truffle-contract.min.js"></script>
<script type="text/javascript" src="loyalx-jsapi.min.js"></script>
```

Alternatively, you can use the non-minified versions for easier debugging.

With this usage, it will be available via the `Loyalx` object:

```javascript
var loyalx = new LoyalX(...);
```

## Transfer token example

transfer tokens from the current user to the provided address

```javascript
var toAddress = "0xb3cc2d1bbe6b87edfcd3b4c1c394f35caf0593be",
    tokenAddress = "0xd69d78e1cf0729cad59080820c9931315aba7778",
    amount = 123;
var myToken = new loyalx.Token(tokenAddress);
myToken.transfer(amount, toAddress);
```








# APIs












## Token

```javascript
var loyalx = new LoyalX(...);
var tokenAddress = "0xd69d78e1cf0729cad59080820c9931315aba7778",
var myToken = new loyalx.Token(tokenAddress);
```

to use our main token you can use

```javascript
var loyalx = new LoyalX(...);
loyalx.LoyalXToken;
```

### `Token.transfer(amount, toAddress)`

transfer tokens from the selected account to the recipient account   

Param       | Type    | Description
-----------:|---------| :-----------------------------
`amount`    | number  | the amount to be transferred   
`toAddress` | address |the recipient account address   

```javascript
var tokenAddress = "0xd69d78e1cf0729cad59080820c9931315aba7778",
    toAddress = "0xb3cc2d1bbe6b87edfcd3b4c1c394f35caf0593be",
    amount = 123;
var myToken = new loyalx.Token(tokenAddress);
myToken.transfer(amount, toAddress);
```

### `Token.getBalance()`

get the balance of the selected user   
return bignumber, for more reference check [bignumber.js](https://github.com/MikeMcl/bignumber.js/) 

```javascript
var tokenAddress = "0xd69d78e1cf0729cad59080820c9931315aba7778";
var myToken = new loyalx.Token(tokenAddress);
var balance = await myToken.getBalance();
```










## TokenFactory

```javascript
var loyalx = new LoyalX(...);
loyalx.TokenFactory;
```

### `TokenFactory.initialiseRetail(symbol, name, amount, decimal)`

deploy a new token contract instance.   

Param     | Type   | Description
---------:|--------| :-----------------------------
`symbol`  | string |  a short name usually 3 chars   
`name`    | string |  reward point name   
`amount`  | number |  total points in circulation  
`decimal` | number |  how many decimal point  

```javascript
var symbol = "tst",
    name = "test",
    amount = "1000000",
    decimal = 2;
var result = await loyalx.TokenFactory.initialiseRetail(symbol, name, amount, decimal);
```

### `TokenFactory.getTokensAddress()`

get all token's data.   
return a promise with an array containing the tokens data.   

Alternatively u can use:-
* `TokenFactory.getTokensAddress()` to get only the addresses.   
* `TokenFactory.getTokensByOwner()` to get them by the selected user account
* `TokenFactory.getTokensAddressByOwner()` to get only the addresses.  

```javascript
var tokensData = await loyalx.getTokensAddress();
console.log(tokensData);
```

```json
TokensData = [
    {
        address: Address,
        name: string,
        symbol: string,
        decimal: number,
    },
    ...
];
```
