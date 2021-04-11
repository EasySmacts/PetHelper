const PetHelper = artifacts.require("PetHelper.sol");

module.exports = function (deployer) {
  deployer.deploy(PetHelper);
};
