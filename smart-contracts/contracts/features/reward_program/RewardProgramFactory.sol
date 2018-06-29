pragma solidity ^0.4.18;

import "../../Organization.sol";
import "./RewardProgram.sol";
import "../FeatureFactory.sol";

contract RewardProgramFactory is FeatureFactory {

    string metaData = "{\"displayName\":\"Reward Points\"}";

    mapping(address => RewardProgram) public ownerMap;

    event Created(Organization org, RewardProgram rewardProgram);

    function create(
        uint256 _InitialAmount,
        string _Name,
        uint8 _Decimal,
        string _Symbol
    ) external returns (RewardProgram) {
        require(ownerMap[msg.sender] == address(0x0));  // the owner must have no RewardProgram

        // creates the reward program
        RewardProgram rp = new RewardProgram(this, _InitialAmount, _Name, _Decimal, _Symbol);
        rp.transfer(msg.sender, _tokenInitialAmount);   // sends the tokens to the owner
        rp.transferOwnership(msg.sender);

        ownerMap[msg.sender] = rp;                     // to keep track of who created what
        Created(msg.sender, rp);

        return rp;
    }

}
