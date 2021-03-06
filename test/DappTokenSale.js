var HotelToken = artifacts.require('./HotelToken.sol');
var DappTokenSale = artifacts.require('./HotelTokenSale.sol');

contract('HotelTokenSale', function (accounts) {
  var tokenInstance;
  var tokenSaleInstance;
  var admin = accounts[0];
  var buyer = accounts[1];
  var tokenPrice = 1000000000000000; // in wei
  var tokensAvailable = 10;
  var start = 1564634599;
  var end = 1565634599;
  var numberOfTokens;

  it('initializes the contract with the correct values', function () {
    return DappTokenSale.deployed().then(function (instance) {
      tokenSaleInstance = instance;
      return tokenSaleInstance.address
    }).then(function (address) {
      assert.notEqual(address, 0x0, 'has contract address');
      return tokenSaleInstance.tokenContract();
    }).then(function (address) {
      assert.notEqual(address, 0x0, 'has token contract address');
      return tokenSaleInstance.tokenPrice();
    }).then(function (price) {
      assert.equal(price, tokenPrice, 'token price is correct');
    });
  });

  it('initializes the contract with the correct values', async () => {
    tokenSaleInstance = await DappTokenSale.deployed();
    tokenInstance = await HotelToken.deployed();
    await tokenInstance.makeSaleLive(true);
    let transffered = await tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, 1, { from: admin });
    await tokenSaleInstance.buyTokens(5, 1, { from: buyer });
    let balance = await tokenInstance.balanceOfPerDates(buyer, 1);
    assert.equal(balance.toNumber(), 5, 'Tokens transffered succsfully');
    balance = await tokenInstance.balanceOfPerDates(tokenSaleInstance.address, 1);
    assert.equal(balance.toNumber(), 5, 'Tokens deducted succsfully');

    /**transfer ownership of token from one place to another palce  */

    let transaction = await tokenInstance.transfer(accounts[2], 3, 1, { from: buyer })
    balance = await tokenInstance.balanceOfPerDates(accounts[2], 1);
    assert.equal(balance.toNumber(), 3, 'check whether transfer ownership is working or not');
  });

  //   it('facilitates token buying', function() {
  //     return HotelToken.deployed().then(function(instance) {
  //       // Grab token instance first
  //       tokenInstance = instance;
  //       return DappTokenSale.deployed();
  //     }).then(function(instance) {
  //       // Then grab token sale instance
  //       tokenSaleInstance = instance;
  //       // Provision 75% of all tokens to the token sale
  //       return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin })
  //     }).then(function(receipt) {
  //       numberOfTokens = 10;
  //       return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice })
  //     }).then(function(receipt) {
  //       assert.equal(receipt.logs.length, 1, 'triggers one event');
  //       assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
  //       assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
  //       assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
  //       return tokenSaleInstance.tokensSold();
  //     }).then(function(amount) {
  //       assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
  //       return tokenInstance.balanceOf(buyer);
  //     }).then(function(balance) {
  //       assert.equal(balance.toNumber(), numberOfTokens);
  //       return tokenInstance.balanceOf(tokenSaleInstance.address);
  //     }).then(function(balance) {
  //       assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
  //       // Try to buy tokens different from the ether value
  //       return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
  //     }).then(assert.fail).catch(function(error) {
  //       assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
  //       return tokenSaleInstance.buyTokens(800000, { from: buyer, value: numberOfTokens * tokenPrice })
  //     }).then(assert.fail).catch(function(error) {
  //       assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
  //     });
  //   });

  //   it('ends token sale', function() {
  //     return HotelToken.deployed().then(function(instance) {
  //       // Grab token instance first
  //       tokenInstance = instance;
  //       return DappTokenSale.deployed();
  //     }).then(function(instance) {
  //       // Then grab token sale instance
  //       tokenSaleInstance = instance;
  //       // Try to end sale from account other than the admin
  //       return tokenSaleInstance.endSale({ from: buyer });
  //     }).then(assert.fail).catch(function(error) {
  //       assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
  //       // End sale as admin
  //       return tokenSaleInstance.endSale({ from: admin });
  //     }).then(function(receipt) {
  //       return tokenInstance.balanceOf(admin);
  //     }).then(function(balance) {
  //       assert.equal(balance.toNumber(), 999990, 'returns all unsold dapp tokens to admin');
  //       // Check that the contract has no balance
  //       return web3.eth.getBalance(tokenSaleInstance.address);
  //     }).then((balance)=>{
  //       assert.equal(balance.toNumber(), 0);
  //     });
  //   });
});
