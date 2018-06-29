pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./FeatureFactory.sol";

contract Feature is Ownable {
    FeatureFactory factory;
}
