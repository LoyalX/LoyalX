import "./LoyaltyToken.sol";

pragma solidity ^0.4.8;

contract LoyaltyTokenFactory {

    function initialiseRetail(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) returns (address) {

        LoyaltyToken newToken = (new LoyaltyToken(_initialAmount, _name, _decimals, _symbol));
        newToken.transfer(msg.sender, _initialAmount); //the factory will own the created tokens. You must transfer them.
        return address(newToken);
    }
}
