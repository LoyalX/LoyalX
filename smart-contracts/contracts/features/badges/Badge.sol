pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Badge is Ownable {

    string public name;                     // badge name.
    string public metaData;                 // a json string that hold the data
    Badge public next;                      // the next level badge
    Badge public previous;                  // the prev level badge

    string public version = "0.1";          // human 0.1 standard. Just an arbitrary versioning scheme.

    function Badge(
        string _name, 
        string _metaData,
        Badge _next,
        Badge _previous
    ) public Ownable() {
        name = _name;
        metaData = _metaData;
        next = _next;
        previous = _previous;
    }

    function update(
        string _name, 
        string _metaData,
        Badge _next,
        Badge _previous
    ) external onlyOwner returns (bool) {
        name = _name;
        metaData = _metaData;
        next = _next;
        previous = _previous;
        return true;
    }

}
