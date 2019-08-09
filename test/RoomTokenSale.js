var RoomTokenSale = artifacts.require("./RoomTokenSale.sol");
const RoomContract = artifacts.require('./RoomContract.sol');

contract('Room Token sale initialize', function (accounts) {
  var roomTokenSaleInstance;
  var roomContractInstance;

  it('initializes the contract with the correct values', function () {
    return RoomTokenSale.deployed().then(function (instance) {
      roomTokenSaleInstance = instance;
      return roomTokenSaleInstance.roomContract();
    }).then((address) => {
      assert.notEqual(address, 0x0, 'Room contract is deployed');
      return roomTokenSaleInstance.tokenPrice()
    }).then((price) => {
      assert.equal(price.toNumber(), 1000000000000000, 'price of room is fixed');
    })
  });

  it('Buy tokens functionality ', function () {
    return RoomTokenSale.deployed().then(function (instance) {
      roomTokenSaleInstance = instance;
      return roomTokenSaleInstance.buyTokens('103', { from: accounts[2] })
    }).then((receipts) => {
      // return roomTokenSaleInstance.roomContract.orderBook('103')
      RoomContract.deployed().then((instance) => {
        roomContractInstance = instance;
        return roomContractInstance.orderBook('103');
      }).then((address) => {
        assert.equal(address, accounts[0], 'the address of the buying person is perfect !');

      })
    })

  });
});
