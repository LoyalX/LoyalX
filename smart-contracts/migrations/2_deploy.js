const OrganizationFactory = artifacts.require("./OrganizationFactory.sol");
const RewardProgramFactory = artifacts.require("./features/reward_program/RewardProgramFactory.sol");

module.exports = (deployer) => deployer.deploy(OrganizationFactory, RewardProgramFactory);