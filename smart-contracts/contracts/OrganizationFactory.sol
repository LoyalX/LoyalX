pragma solidity ^0.4.18;

import "./Organization.sol";

contract OrganizationFactory {

    Organization[] public organizations;                    // an array of all Organizations addresses
    mapping(address => Organization) public ownerMap;       // a map of owener => orgnization

    event Created(address owner, Organization organization);

    function create(
        string _name,
        string _country,
        string _metaData
    ) external returns (Organization) {
        require(ownerMap[msg.sender] == address(0x0));  // the owner must have no orginizations

        Organization org = new Organization(_name, _country, _metaData);
        org.transferOwnership(msg.sender);

        ownerMap[msg.sender] = org;                     // to keep track of who created what
        organizations.push(org);                        // adds the token address to the list
        Created(msg.sender, org);

        return org;
    }

   /**
    * @return A Organizations array of all registered organizations.
    */
    function getOrganizations() external view returns (Organization[]) { return organizations; }

}

