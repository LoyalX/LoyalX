var LoyaltyCoin = artifacts.require("./LoyaltyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(LoyaltyCoin);
};