var RoomToken = artifacts.require("./RoomContract.sol");

contract('Room Token initialize', function(accounts) {
  var tokenInstance;

  it('initializes the contract with the correct values', function() {
    return RoomToken.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, 'J.W. MArriot', 'has the correct name');
      return tokenInstance.orderBook('101');
    }).then(function(deployedAddress) {
      assert(deployedAddress, accounts[0], 'admin address is inserted correctly.');
      return tokenInstance.balanceOf(accounts[0]);
    }).then((roomNumers)=>{
      assert.equal(roomNumers, 3, 'total number of rooms is correct or not.');
      return tokenInstance.transfer(accounts[1], 'ABC');
    }).then(assert.fail).catch((e)=>{
      assert(e.message.indexOf('revert') >= 0, 'room name is incorrect.');
      return tokenInstance.transfer(accounts[1], '101');
    }).then((receipt)=>{
      return tokenInstance.balanceOf(accounts[1]);
    }).then((balance)=>{
      assert.equal(balance.toNumber(), 1, `balance is updated for 'to' account`);
      return tokenInstance.balanceOf(accounts[0]);
    }).then((balanceOfSender)=>{
      assert.equal(balanceOfSender.toNumber(), 2, `balance is updated for 'from' account`);
      
    });
  });

  it('unit-cases for  transferFrom ', ()=>{
    return RoomToken.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.transferFrom(accounts[0], accounts[1], '102');
    }).then((receipt)=>{
      return tokenInstance.orderBook('102');
    }).then((address)=>{
      assert.equal(address, accounts[1], 'room is transffered');
      return tokenInstance.balanceOf(accounts[1]);
    }).then((balance)=>{
      assert(balance.toNumber(), 1, 'THE BALANCE IS UPDATED');
    });
  })


});