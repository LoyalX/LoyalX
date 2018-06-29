pragma solidity ^0.4.18;

import "./FeatureFactory.sol";


contract FeatureStore {

    FeatureFactory[] public Features;                         // an array of all Features addresses
    
    event Added(FeatureFactory feature);

    function add(FeatureFactory _feature) external returns (Feature) {
        
        Features.push(fet);                             // adds the token address to the list
        Added(msg.sender, fet);

        return fet;
    }

   /**
    * @return A Features array of all registered Features.
    */
    function getFeatures() external view returns (Feature[]) { return Features; }

}
