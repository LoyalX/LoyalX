const LoyaltyCoinFactory = artifacts.require("./LoyaltyTokenFactory.sol");

module.exports = (deployer) => deployer.deploy(LoyaltyCoinFactory);