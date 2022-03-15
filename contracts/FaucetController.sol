// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./IERC20.sol";

contract FaucetController {
  address private _owner;

  event OwnerUpdated(address indexed oldOwner, address indexed newOwner);
  event TokenRedeemed(address indexed user, uint amount,bool result);

  constructor() {
    _owner = msg.sender;
    emit OwnerUpdated(address(0),msg.sender);
  }

  function owner() public view returns(address){
    return _owner;
  }

  modifier onlyOwner() {
    require(owner() == msg.sender, "Not Faucet Owner");
    _;
  }

  function getTokenFund(address _tokenAddress) external view returns(uint) {
    return IERC20(_tokenAddress).balanceOf(address(this));
  }

  function getFaucetEthBalance() external view returns(uint){
    return address(this).balance;
  }

  function redeemToken(address _tokenAddress,address _userAddress,uint _amount) external returns(bool){
    require(IERC20(_tokenAddress).balanceOf(address(this)) > 0,"No Fund Detected For Token");

    bool result = IERC20(_tokenAddress).transfer(_userAddress,_amount);
    emit TokenRedeemed(_userAddress,_amount,result);

    return result;
  }

  function setOwner(address _newOwner) public onlyOwner returns(address){
    require(_newOwner != address(0),"Address Must Not Be Empty");

    address _oldOwner = owner();
    _owner = _newOwner;
    emit OwnerUpdated(_oldOwner,_newOwner);

    return owner();
  }

}
