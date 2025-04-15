// migrations/1_initial_migration.js
const FarmDapp = artifacts.require("FarmDapp");

module.exports = function (deployer) {
    deployer.deploy(FarmDapp);
};