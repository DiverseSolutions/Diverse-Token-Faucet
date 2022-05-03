// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract CoinFaucetController {
  address private _owner;
  uint public _amountCap;

  event OwnerUpdated(address indexed oldOwner, address indexed newOwner);
  event CoinRedeemed(address indexed user, uint amount);

  constructor(uint _cap) {
    _owner = msg.sender;
    _amountCap = _cap;
    emit OwnerUpdated(address(0),msg.sender);
  }

  function owner() public view returns(address){
    return _owner;
  }

  modifier onlyOwner() {
    require(owner() == msg.sender, "Not Faucet Owner");
    _;
  }

  function getFaucetBalance() external view returns(uint){
    return address(this).balance;
  }

  function redeemCoin(address _userAddress,uint _amount) external{
    require(_amount < address(this).balance,"Faucet don't have enough coins");
    require(_amount <= _amountCap,"Amount exceeds amount cap");

    (bool sent,) = payable(_userAddress).call{value:_amount}("");
    require(sent,"Coin transfer failed");

    emit CoinRedeemed(_userAddress,_amount);
  }

  function masterWithdraw() external onlyOwner {
    uint _amount = address(this).balance;
    (bool sent,) = payable(msg.sender).call{value: _amount}('');
    require(sent,"Coin transfer failed");

    emit CoinRedeemed(msg.sender,_amount);
  }

  function setOwner(address _newOwner) public onlyOwner returns(address){
    require(_newOwner != address(0),"Address Must Not Be Empty");

    address _oldOwner = owner();
    _owner = _newOwner;
    emit OwnerUpdated(_oldOwner,_newOwner);

    return owner();
  }

  function setAmountCap(uint _newAmountCap) public onlyOwner {
    require(_newAmountCap != _amountCap,"New amount cap same as old amount cap");
    _amountCap = _newAmountCap;
  }

  function deposit() external payable {}

  receive() external payable {}
  fallback() external payable {}
}
