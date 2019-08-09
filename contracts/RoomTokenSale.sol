pragma solidity ^0.5.0;

import "./RoomContract.sol";

contract RoomTokenSale {
    address admin;
    RoomContract public roomContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, string _roomNumber);

    constructor(RoomContract _roomContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        roomContract = _roomContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(string memory _roomNumber) public payable {

        // require(msg.value == multiply(_numberOfTokens, tokenPrice));

        // require(roomContract.balanceOf(address(this)) >= _numberOfTokens);

        require(roomContract.transfer(msg.sender, _roomNumber),'not able to buy your token');

        tokensSold += 1;

        emit Sell(msg.sender, _roomNumber);
    }

}
