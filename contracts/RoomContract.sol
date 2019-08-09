pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract RoomContract {
    string  public name;
    string  public symbol;
    mapping(string => address) public orderBook; // HashMap 
    string[] public roomsNumbers; 
    address admin;

    mapping(address => uint256) public balanceOf;
    // mapping(address => string[]) public allocatedRooms;

    // mapping(address => mapping(address => string[])) public allowance;


  constructor(string memory _hotelName, string memory _symbol,string[] memory _roomsNumbers) public {
    admin = msg.sender;
    name = _hotelName;
    symbol = _symbol;
    for(uint256 i=0;i< _roomsNumbers.length;i++) {
      // orderBook[_roomsNumbers[i]] = address(0x0);
      orderBook[_roomsNumbers[i]] = admin;
    }
    balanceOf[admin] = _roomsNumbers.length;

  }
  event Transfer(
        address indexed _from,
        address indexed _to,
        string _roomNo
    );
  event Approval(
        address indexed _owner,
        address indexed _spender,
        string _roomNo
    );


  function transfer(address _to, string memory _roomNo) public returns (bool success) {

    require(orderBook[_roomNo] == admin,'room already allocated ');
    orderBook[_roomNo] = _to; // ['101'] -> '0xcccbc'

    balanceOf[msg.sender] -= 1;
    balanceOf[_to] +=1;
    // allocatedRooms[_to].push(_roomNo);
    emit Transfer(msg.sender, _to, _roomNo);
    return true;
  }

  // function approve(address _spender, string memory _roomNo) public returns (bool success) {
  //       allowance[msg.sender][_spender] = _roomNo;

  //       emit Approval(msg.sender, _spender, _roomNo);

  //       return true;
  // }

  function transferFrom(address _from, address _to, string memory _roomNo) public returns (bool success) {
        require(orderBook[_roomNo] == _from, 'room is not allocated on your name');
        // require(allowance[_from][msg.sender] == _roomNo, 'Room is not allocated on your name');

        balanceOf[_from] -= 1;
        balanceOf[_to] += 1;

        orderBook[_roomNo] = _to;
        // allowance[_from][msg.sender] = '';

        emit Transfer(_from, _to, _roomNo);

        return true;
    }
}