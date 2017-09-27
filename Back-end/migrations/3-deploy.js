var LoyaltyCoinFactory = artifacts.require("./LoyaltyTokenFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(LoyaltyCoinFactory);
};