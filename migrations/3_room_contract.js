var RoomToken = artifacts.require("./RoomContract.sol");
var RoomTokenSale = artifacts.require("./RoomTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(RoomToken,"Hotel Taj","TAJ",['101','102','103']).then((instance)=>{
    var roomPrice = 1000000000000000;
    return deployer.deploy(RoomTokenSale, RoomToken.address,roomPrice).then((instance)=>{
      // console.log('instance-2', instance.address);
    });
  });
};
