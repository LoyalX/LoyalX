pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./features/Feature.sol";

contract Organization is Ownable {

    string public name;
    string public country;
    string public metaData;                     // a json string that hold the data
    string public version = "0.1";              // human 0.1 standard. Just an arbitrary versioning scheme.
    
    Feature[] public features;                  // a list of enabled features

    function Organization(
        string _name,
        string _country,
        string _metaData
    ) public Ownable() {
        name = _name;
        country = _country;
        metaData = _metaData;
    }

    event FeatureAdded(address feature);

    function addFeature(address _feature) public onlyOwner {
        features.push(_feature);
    }

    function update(
        string _name,
        string _country,
        string _metaData
    ) external onlyOwner returns (bool) {
        name = _name;
        country = _country;
        metaData = _metaData;
        return true;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        super.transferOwnership(newOwner);
        for (uint i=0; i<features.length; i++) {
            features[i].transferOwnership(newOwner);
        }
    }

}
