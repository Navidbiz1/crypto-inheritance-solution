// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MultiSigInheritance {
    address[] public heirs;
    uint256 public requiredSignatures;
    mapping(address => bool) public isHeir;
    mapping(bytes32 => bool) public executed;
    
    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);
    event HeirAdded(address indexed heir);
    event HeirRemoved(address indexed heir);
    
    constructor(address[] memory _heirs, uint256 _requiredSignatures) {
        require(_heirs.length >= _requiredSignatures, "Invalid required signatures");
        require(_requiredSignatures > 0, "Required signatures must be positive");
        
        heirs = _heirs;
        requiredSignatures = _requiredSignatures;
        
        for (uint i = 0; i < _heirs.length; i++) {
            isHeir[_heirs[i]] = true;
        }
    }
    
    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }
    
    function getHeirs() external view returns (address[] memory) {
        return heirs;
    }
    
    function getRequiredSignatures() external view returns (uint256) {
        return requiredSignatures;
    }
}
