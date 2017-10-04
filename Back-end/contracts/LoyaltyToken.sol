/*
This Token Contract implements the standard token functionality (https://github.com/ethereum/EIPs/issues/20) as well as the following OPTIONAL extras intended for use by loyalty team.


1) Initial Finite Supply (upon creation one specifies how much is minted).
2) In the absence of a token registry: Optional Decimal, Symbol & Name.
3) Optional approveAndCall() functionality to notify a contract if an approval() has occurred.

.*/

pragma solidity ^0.4.8;

import "./StandardToken.sol";

contract LoyaltyToken is StandardToken {

    function () {
        //if ether is sent to this address, send it back.
        throw;
    }

    /* Public variables of the token */

    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name = "LOYALTY COIN";   //fancy name: eg Simon Bucks
    uint8 public decimals = 18;            //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string public symbol = "LOY";          //An identifier: eg SBX
    string public version = "0.1";         //human 0.1 standard. Just an arbitrary versioning scheme.

    function LoyaltyToken(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
        ) {
        balances[msg.sender] = _initialAmount;    
       // users[msg.sender] = _initialAmount;                   // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
    }

    function getSymbol() constant returns (bytes32) {
        return stringToBytes32(symbol);
    }

    function getName() constant returns (bytes32) {
        return stringToBytes32(name);
    }

   
  // stolen from: http://ethereum.stackexchange.com/questions/9142/how-to-convert-a-string-to-bytes32
    function stringToBytes32(string memory source) constant returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }

    function getDecimals() constant returns (uint8) {
        return decimals;
    }
    
    function initialiseRetail(address address_retail_receiver, uint amount) returns(uint balance) {
        //Validate if it is from the platform
        balances[msg.sender] -= amount;
        balances[address_retail_receiver] += amount;
       // users[msg.sender] -= amount;

        Transfer(msg.sender, address_retail_receiver, amount);
        return getBalance(address_retail_receiver);
    }

    function transferFromRetailToUser(address address_retail_sender,address user_receiver, uint amount) returns(bool sufficient) {
        //Validate if it is from the platform
        balances[address_retail_sender] -= amount;
        //users[address_retail_sender] -= amount;


        Transfer(address_retail_sender, user_receiver, amount);
        return true;
    }

    function getBalance(address addr) returns(uint) {
        return balances[addr];
    }



}
