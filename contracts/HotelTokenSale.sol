pragma solidity ^0.5.0;

import "./HotelToken.sol";

contract HotelTokenSale {
    address payable admin;
    HotelToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);
    event EndSale(uint256 _totalAmountSold);

    constructor(HotelToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        _tokenContract.makeSaleLive(true);
    }

    // function multiply(uint x, uint y) internal pure returns (uint z) {
    //     require(y == 0 || (z = x * y) / y == x);
    // }

    function buyTokens(uint256 _numberOfTokens, uint256 _date) public payable {
        // require(msg.value == multiply(_numberOfTokens, tokenPrice), 'msg.value must equal number of tokens in wei');
        require(tokenContract.balanceOfPerDates(address(this), _date) >= _numberOfTokens, 'cannot purchase more tokens than available');
        require(tokenContract.transfer(msg.sender, _numberOfTokens, _date), 'Unable to send tokens');
        // emit Balance(address(this), _numberOfTokens);

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin,"sender is not admin");
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this)),1),"error in end sale");
        // require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        // UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
        admin.transfer(address(this).balance);

        emit EndSale(tokensSold);
    }
}