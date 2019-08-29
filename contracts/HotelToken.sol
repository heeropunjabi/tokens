pragma solidity ^0.5.0;

contract HotelToken {
    string  public name = "Hotel Taj";
    string  public symbol = "Taj";
    uint256 public totalSupply = 40;
    uint256 public start;
    uint256 public end;
    bool public sale = false;

    address admin;


    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Redeem(
        address indexed _redeemer,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(uint256 => uint256)) public balanceOfPerDates;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor (uint256 _initialSupply, uint256 _start, uint256 _end) public {
        

        
        for(uint256 i=_start;i<_end;i++) {
            balanceOfPerDates[msg.sender][i] = _initialSupply;
        }
        
        totalSupply = _initialSupply * (_end - _start + 1);

        balanceOf[msg.sender] = totalSupply;
        start = _start;
        end = _end;
        admin = msg.sender;
        
        
    }

    
    function makeSaleLive(bool _status) public  {
        sale = _status;
    }
    function saleActiveStatus() public view returns (bool success) {
        return sale;
        // if(start <= block.timestamp){
        //     if(block.timestamp >= end){
        //         return true;
        //     }
        // }else {
        //     return false;
        // }
    }

    function saleEndStatus() public view returns (bool success) {
        // if(end > block.timestamp){
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    }

    function transfer(address _to, uint256 _value, uint256 _date) public returns (bool success) {
        require(saleActiveStatus(), "Sale Not Active");

        require(balanceOfPerDates[msg.sender][_date] >= _value, "Insufficient sender balance");

        balanceOfPerDates[msg.sender][_date] -= _value;
        balanceOfPerDates[_to][_date] += _value;

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(saleActiveStatus(), "Sale Not Active");
        require(_value <= balanceOf[_from], 'Amount should not exceed balance');
        require(_value <= allowance[_from][msg.sender], 'Amount should not exceed allowance');

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function buyBack(uint256 _value) public returns (bool success) {
        //require to check time
        require(saleActiveStatus(), "Sale Not Active");
        require(_value <= balanceOf[msg.sender], 'Amount should not exceed in user accounct balance');
        // require(_value <= allowance[msg.sender][admin], 'Amount should not exceed allowance');
        balanceOf[msg.sender] -= _value;
        balanceOf[admin] += _value;
        // allowance[msg.sender][admin] -= _value;
        emit Transfer(msg.sender, admin, _value);
        return true;
    }

    function redeem(uint256 _value, uint256 _date) public returns (bool success) {
        //require to check time
        require(saleEndStatus(), "Sale Active");
        require(_value <= balanceOfPerDates[msg.sender][_date], 'Amount should not exceed balance');
        balanceOfPerDates[msg.sender][_date] -= _value;

        balanceOf[msg.sender] -= _value;
        emit Redeem(msg.sender, _value);
        return true;
    }
}