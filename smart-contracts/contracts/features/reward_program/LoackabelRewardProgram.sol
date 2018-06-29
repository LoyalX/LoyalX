pragma solidity ^0.4.18;

import "./ExtendedRewardProgram.sol";

contract LockabelRewardProgram is ExtendedRewardProgram {

 using SafeMath for uint256;


    struct EnabeledFunctions {
        bool transfer;
        bool transferFrom;
        bool approve;
        bool increaseApproval;
        bool decreaseApproval;

        bool increaseSupply;
        bool decreaseSupply;
        bool burn;
        bool updateEnabeledFunctions;
    }

    EnabeledFunctions enabeledFunctions;

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(enabeledFunctions.transfer);
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(enabeledFunctions.transferFrom);
        return super.transferFrom(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        require(enabeledFunctions.approve);
        return super.approve(_spender, _value);
    }

    function increaseApproval(address _spender, uint _addedValue) public returns (bool success) {
        require(enabeledFunctions.increaseApproval);
        return super.increaseApproval(_spender, _addedValue);
    }

    function decreaseApproval(address _spender, uint _subtractedValue) public returns (bool success) {
        require(enabeledFunctions.decreaseApproval);
        return super.decreaseApproval(_spender, _subtractedValue);
    }


    function increaseSupply(uint value, address to) public returns (bool) {
        require(enabeledFunctions.increaseSupply);
        return super.increaseSupply(value, to);
    }

    function decreaseSupply(uint value, address from) public returns (bool) {
        require(enabeledFunctions.decreaseSupply);
        return super.decreaseSupply(value, from);
    }
}
