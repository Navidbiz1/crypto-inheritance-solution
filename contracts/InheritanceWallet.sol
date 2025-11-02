// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract InheritanceWallet {
    address public owner;
    address public heir;
    uint256 public lastActiveBlock;
    uint256 public constant INACTIVITY_THRESHOLD = 5760; // ~24 hours in blocks
    
    event InheritanceClaimed(address indexed heir, uint256 amount);
    event ProofOfLife(address indexed owner);
    event HeirChanged(address indexed newHeir);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyHeir() {
        require(msg.sender == heir, "Only heir can call this function");
        _;
    }
    
    constructor(address _heir) payable {
        require(_heir != address(0), "Heir cannot be zero address");
        owner = msg.sender;
        heir = _heir;
        lastActiveBlock = block.number;
    }
    
    function proveAlive() external onlyOwner {
        lastActiveBlock = block.number;
        emit ProofOfLife(owner);
    }
    
    function claimInheritance() external onlyHeir {
        require(
            block.number > lastActiveBlock + INACTIVITY_THRESHOLD, 
            "Owner still active or threshold not reached"
        );
        
        uint256 inheritance = address(this).balance;
        require(inheritance > 0, "No funds to inherit");
        
        // Transfer all ETH to heir
        (bool success, ) = payable(heir).call{value: inheritance}("");
        require(success, "Transfer failed");
        
        emit InheritanceClaimed(heir, inheritance);
    }
    
    function changeHeir(address newHeir) external onlyOwner {
        require(newHeir != address(0), "New heir cannot be zero address");
        heir = newHeir;
        emit HeirChanged(newHeir);
    }
    
    function getTimeUntilInheritance() external view returns (uint256) {
        if (block.number <= lastActiveBlock + INACTIVITY_THRESHOLD) {
            return (lastActiveBlock + INACTIVITY_THRESHOLD) - block.number;
        }
        return 0;
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
    
    fallback() external payable {}
}
