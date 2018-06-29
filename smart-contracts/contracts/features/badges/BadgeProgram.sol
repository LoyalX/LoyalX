pragma solidity ^0.4.18;

import "../Feature.sol";
import "./Badge.sol";

contract BadgeProgram is Feature {

    string public metaData;                            // a json string that hold the data
    string public version = "0.1";                     // human 0.1 standard. Just an arbitrary versioning scheme.

    Badge[] public badges;                             // a list of created badges
    mapping(address => Badge[]) public issuedBadges;   // a list of issued badges (owner => badges index array)

    function BadgeProgram() public Ownable() {}

    event Issued(address indexed owner, Badge indexed badge);
    event Created(Badge indexed badge);

   /**
    * @dev Function to add a new badge to the reward program
    * @param _name       badge name
    * @param _metaData   such as color or background color ... etc
    * @return A Badge the badge that has been created.
    */
    function add(string _name, string _metaData, Badge _next, Badge _previous) external onlyOwner returns (Badge) {
        Badge nbadge = new Badge(_name, _metaData, _next, _previous);
        badges.push(nbadge);
        Created(nbadge);
        return nbadge;
    }

   /**
    * @dev Function to issue to user badges
    * @param _badgeIndex The badge index from the Badgeprogram.badges array.
    * @param _to         The address that will receive the badge.
    * @return A Badge the badge that has been issued.
    */
    function issue(uint _badgeIndex, address _to) onlyOwner public returns (Badge) {
        issuedBadges[_to].push(badges[_badgeIndex]);
        Issued(_to, badges[_badgeIndex]);
        return badges[_badgeIndex];
    }

   /**
    * @return A Badges array of all the badges in that reward program.
    */
    function getBadges() public view returns (Badge[]) { return badges; }

   /**
    * @return A Badges array of the badges that the user recived.
    */
    function getIssuedBadges(address user) public view returns (Badge[]) { return issuedBadges[user]; }
}
