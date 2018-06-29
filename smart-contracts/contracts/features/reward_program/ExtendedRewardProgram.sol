pragma solidity ^0.4.18;

import "./RewardProgram.sol";

contract ExtendedRewardProgram is RewardProgram {

 using SafeMath for uint256;

    event SupplyIncreased(uint value, address indexed to);

    // stolen from https://github.com/ethereum/EIPs/pull/621
    function increaseSupply(uint value, address to) public onlyOwner returns (bool) {
        totalSupply = totalSupply.add(value);
        balances[to] = balances[to].add(value);
        Transfer(0, to, value);
        SupplyIncreased(value, to);
        return true;
    }

    event SupplyDecreased(uint value, address indexed from);

    function decreaseSupply(uint value, address from) public onlyOwner returns (bool) {
        balances[from] = balances[from].sub(value);
        totalSupply = totalSupply.sub(value);  
        Transfer(from, 0, value);
        SupplyDecreased(value, from);
        return true;
    }

    function update(
        string _name,
        uint8 _decimal,
        string _symbol
    ) external onlyOwner returns (bool) {
        name = _name;
        decimals = _decimal;
        symbol = _symbol;
        return true;
    }
}
