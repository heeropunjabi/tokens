var HotelToken = artifacts.require("./../contracts/HotelToken.sol");
var HotelTokenSale = artifacts.require("./../contracts/HotelTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(HotelToken, 1000000,1564634599,1565634599).then(function() {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(HotelTokenSale, HotelToken.address, tokenPrice);
  });
};
