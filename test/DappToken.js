var HotelToken = artifacts.require("./HotelToken.sol");

contract('HotelToken', function (accounts) {
  var tokenInstance;

  it('initializes the contract with the correct values', function () {
    return HotelToken.deployed().then(function (instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function (name) {
      assert.equal(name, 'Hotel Taj', 'has the correct name');
      return tokenInstance.symbol();
    }).then(function (symbol) {
      assert.equal(symbol, 'Taj', 'has the correct symbol');
      return tokenInstance.saleEndStatus();
    }).then(async (symbol) => {
      let balanceOfAdmin = await tokenInstance.balanceOfPerDates(accounts[0], 1);
      assert.equal(balanceOfAdmin.toNumber(), 10, 'validate the number of rooms on the first day of sale is correct ');
      
      let totalSupply = await tokenInstance.totalSupply();
      assert.equal(totalSupply.toNumber(), 200, 'total numer of rooms avaiable for whole sale is correct');
      await tokenInstance.makeSaleLive(true);
      let saleStatus = await tokenInstance.saleActiveStatus();
      assert.equal(saleStatus, true, 'after turning on the sale it should be live.');
    });
  });

   it('transfer funds functionality is working or not',  () => {
    return HotelToken.deployed().then(async (instance) => {
      tokenInstance = instance;
      let success = await tokenInstance.transfer.call(accounts[1], 10, 1,  {from:accounts[0]})
      assert.equal(success, true, 'funds transffered succesfully.');

      success = await tokenInstance.transfer(accounts[1], 10, 1,  {from:accounts[0]})
      let balance = await tokenInstance.balanceOfPerDates(accounts[1], 1);

      assert.equal(balance.toNumber(), 10, 'check wheter the receipt got the funds or not.');

    })
   });

    it('Reedem functionality ',  () => {
    return HotelToken.deployed().then(async (instance) => {
      tokenInstance = instance;
      let output = await tokenInstance.redeem.call(5, 1, {from: accounts[1]});
      assert.equal(output, true, 'redeem done succesfully.');
      output = await tokenInstance.redeem(5, 1, {from: accounts[1]});
      let balance = await tokenInstance.balanceOfPerDates(accounts[1], 1);
      assert.equal(balance.toNumber(), 5, 'check the funds after redeem');

    })
   });

  // it('allocates the initial supply upon deployment', function () {
  //   return HotelToken.deployed().then(function (instance) {
  //     tokenInstance = instance;
  //     return tokenInstance.totalSupply();
  //   }).then(function (totalSupply) {
  //     assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
  //     return tokenInstance.balanceOf(accounts[0]);
  //   }).then(function (adminBalance) {
  //     assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account');
  //   });
  // });

  // it('transfers token ownership', function () {
  //   return HotelToken.deployed().then(function (instance) {
  //     tokenInstance = instance;
  //     // Test `require` statement first by transferring something larger than the sender's balance
  //     return tokenInstance.transfer.call(accounts[1], 999999999999999);
  //   }).then(assert.fail).catch(function (error) {
  //     assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
  //     return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
  //   }).then(function (success) {
  //     assert.equal(success, true, 'it returns true');
  //     return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
  //   }).then(function (receipt) {
  //     assert.equal(receipt.logs.length, 1, 'triggers one event');
  //     assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
  //     assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
  //     assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
  //     assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
  //     return tokenInstance.balanceOf(accounts[1]);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
  //     return tokenInstance.balanceOf(accounts[0]);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
  //   });
  // });

  // it('approves tokens for delegated transfer', function () {
  //   return HotelToken.deployed().then(function (instance) {
  //     tokenInstance = instance;
  //     return tokenInstance.approve.call(accounts[1], 100);
  //   }).then(function (success) {
  //     assert.equal(success, true, 'it returns true');
  //     return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
  //   }).then(function (receipt) {
  //     assert.equal(receipt.logs.length, 1, 'triggers one event');
  //     assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
  //     assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by');
  //     assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
  //     assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');
  //     return tokenInstance.allowance(accounts[0], accounts[1]);
  //   }).then(function (allowance) {
  //     assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated trasnfer');
  //   });
  // });

  // it('handles delegated token transfers', function () {
  //   return HotelToken.deployed().then(function (instance) {
  //     tokenInstance = instance;
  //     fromAccount = accounts[2];
  //     toAccount = accounts[3];
  //     spendingAccount = accounts[4];
  //     // Transfer some tokens to fromAccount
  //     return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
  //   }).then(function (receipt) {
  //     // Approve spendingAccount to spend 10 tokens form fromAccount
  //     return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
  //   }).then(function (receipt) {
  //     // Try transferring something larger than the sender's balance
  //     return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
  //   }).then(assert.fail).catch(function (error) {
  //     assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than balance');
  //     // Try transferring something larger than the approved amount
  //     return tokenInstance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount });
  //   }).then(assert.fail).catch(function (error) {
  //     assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than approved amount');
  //     return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
  //   }).then(function (success) {
  //     assert.equal(success, true);
  //     return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
  //   }).then(function (receipt) {
  //     assert.equal(receipt.logs.length, 1, 'triggers one event');
  //     assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
  //     assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
  //     assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
  //     assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount');
  //     return tokenInstance.balanceOf(fromAccount);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 90, 'deducts the amount from the sending account');
  //     return tokenInstance.balanceOf(toAccount);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 10, 'adds the amount from the receiving account');
  //     return tokenInstance.allowance(fromAccount, spendingAccount);
  //   }).then(function (allowance) {
  //     assert.equal(allowance.toNumber(), 0, 'deducts the amount from the allowance');
  //   });
  // });

  // it('buyBack', function () {
  //   return HotelToken.deployed().then(function (instance) {
  //     tokenInstance = instance;
  //     fromAccount = accounts[2];
  //     toAccount = accounts[3];
  //     spendingAccount = accounts[4];
  //     // Transfer some tokens to fromAccount
  //     return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
  //   }).then(function (receipt) {
  //     // Approve spendingAccount to spend 10 tokens form fromAccount
  //     return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
  //   }).then(function (receipt) {
  //     // Try transferring something larger than the sender's balance
  //     return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
  //   }).then(assert.fail).catch(function (error) {
  //     assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than balance');
  //     // Try transferring something larger than the approved amount
  //     return tokenInstance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount });
  //   }).then(assert.fail).catch(function (error) {
  //     assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than approved amount');
  //     return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
  //   }).then(function (success) {
  //     assert.equal(success, true);
  //     return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
  //   }).then(function (receipt) {
  //     assert.equal(receipt.logs.length, 1, 'triggers one event');
  //     assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
  //     assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
  //     assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
  //     assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount');
  //     return tokenInstance.balanceOf(fromAccount);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 180, 'deducts the amount from the sending account');
  //     return tokenInstance.approve(accounts[0], 180, { from: fromAccount });
  //   }).then(function (balance) {
  //     return tokenInstance.buyBack(180, { from: fromAccount });
  //   }).then(function (balance) {
  //     return tokenInstance.balanceOf(fromAccount);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 0, 'deducts the amount from the sending account');
  //     return tokenInstance.balanceOf(accounts[0]);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 749980, 'adds the amount from the receiving account');
  //     return tokenInstance.redeem(20 , {from : toAccount})
  //   }).then(function (balance) {
  //     return tokenInstance.balanceOf(toAccount);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 0, 'deducts the amount from the sending account');
  //     return tokenInstance.balanceOf(accounts[0]);
  //   }).then(function (balance) {
  //     assert.equal(balance.toNumber(), 749980, 'adds the amount from the receiving account');
  //   });
  // });
});
