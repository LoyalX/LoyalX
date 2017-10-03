import "./LoyaltyToken.sol";

pragma solidity ^0.4.8;

contract LoyaltyTokenFactory {

    address[] public tokens;
    mapping(address => address[]) ownerMap;

    function initialiseRetail(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) returns (address) {

        LoyaltyToken newToken = new LoyaltyToken(_initialAmount, _name, _decimals, _symbol);
        newToken.transfer(msg.sender, _initialAmount);       //the factory will own the created tokens. You must transfer them.

        ownerMap[msg.sender].push(address(newToken));   // to keep track of who created what
        tokens.push(address(newToken));                 // a basic list of all tokens

        return address(newToken);
    }

    function getTokensAddress() constant returns (address[]) {
        return tokens;
    }

    function getTokensAddressByOwner(address owner) constant returns (address[]) {
        return ownerMap[owner];
    }

}
