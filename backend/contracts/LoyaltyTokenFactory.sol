pragma solidity ^0.4.8;

import "./LoyaltyToken.sol";

contract LoyaltyTokenFactory {

    // an array of all tokens addresses
    address[] public tokens;
    // a map of owener = > array of his tokens
    mapping(address => address[]) ownerMap;

    function initialiseRetail(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) returns (address) {

        LoyaltyToken newToken = new LoyaltyToken(_initialAmount, _name, _decimals, _symbol);
        newToken.transfer(msg.sender, _initialAmount);  // the factory will own the created tokens. You must transfer them.

        ownerMap[msg.sender].push(address(newToken));   // to keep track of who created what
        tokens.push(address(newToken));                 // adds the token address to the list

        return address(newToken);
    }

    function getTokensAddress() constant returns (address[]) {
        return tokens;
    }

    function getTokensAddressByOwner(address owner) constant returns (address[]) {
        return ownerMap[owner];
    }

    function getTokens() constant returns (address[], bytes32[], bytes32[], uint8[]) {
        bytes32[] memory names = new bytes32[](tokens.length);
        bytes32[] memory symbols = new bytes32[](tokens.length);
        uint8[] memory decimals = new uint8[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {
            LoyaltyToken selToken = LoyaltyToken(tokens[i]);
            names[i] = selToken.getName();
            symbols[i] = selToken.getSymbol();
            decimals[i] = selToken.getDecimals();
        }

        return (tokens, names, symbols, decimals);
    }
    
    function getTokensByOwner(address owner) constant returns (address[], bytes32[], bytes32[], uint8[]) {
        address[] memory ownerTokens = ownerMap[owner];
        bytes32[] memory names = new bytes32[](ownerTokens.length);
        bytes32[] memory symbols = new bytes32[](ownerTokens.length);
        uint8[] memory decimals = new uint8[](ownerTokens.length);

        for (uint i = 0; i < ownerTokens.length; i++) {
            LoyaltyToken selToken = LoyaltyToken(ownerTokens[i]);
            names[i] = selToken.getName();
            symbols[i] = selToken.getSymbol();
            decimals[i] = selToken.getDecimals();
        }

        return (ownerTokens, names, symbols, decimals);
    }

}

