pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../Feature.sol";

/*
This Token Contract implements the standard token functionality (https://github.com/ethereum/EIPs/issues/20) as well as the following OPTIONAL extras intended for use by loyalty team.

1) Initial Finite Supply (upon creation one specifies how much is minted).
2) In the absence of a token registry: Optional Decimal, Symbol & Name.
3) Optional approveAndCall() functionality to notify a contract if an approval() has occurred.
*/
contract RewardProgram is StandardToken, Ownable, Feature {

    /*
    Public variables of the token

    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;               // fancy name: eg Simon Bucks
    uint8 public decimals = 0;        // How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string public symbol;             // An identifier: eg SBX
    string public version = "0.1";    // human 0.1 standard. Just an arbitrary versioning scheme.

    function RewardProgram(FeatureFactory _factory, uint256 _initialAmount, string _name, uint8 _decimal, string _symbol) public Ownable() {
        balances[msg.sender] = _initialAmount;  // Give the creator all initial tokens
        totalSupply = _initialAmount;           // Update total supply
        name = _name;                           // Set the name for display purposes
        decimals = _decimal;                    // Amount of decimals for display purposes
        symbol = _symbol;                       // Set the symbol for display purposes
    }


}
