// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Migrations
/// @dev Contract to manage deployment steps of a smart contract system.
contract Migrations is Ownable(msg.sender), ReentrancyGuard {
    // Tracks the last completed migration step
    uint256 public lastCompletedMigration;

    // Emergency pause state
    bool public paused = false;

    // Events
    event MigrationCompleted(uint256 indexed step, address indexed by);
    event EmergencyPaused(address indexed admin, bool paused);
    event OwnershipTransferredCustom(address indexed previousOwner, address indexed newOwner, address indexed executor);

    // Modifier to prevent execution if paused
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    /**
     * @notice Sets the last completed migration step.
     * @dev Only the contract owner can call this function.
     * @param _completed The step number of the completed migration.
     */
    function setCompleted(uint256 _completed) external onlyOwner whenNotPaused {
        require(_completed > lastCompletedMigration, "Migration step already completed");
        require(_completed <= type(uint256).max, "Invalid migration step"); // Prevent overflow
        lastCompletedMigration = _completed;
        emit MigrationCompleted(_completed, msg.sender);
    }

    /**
     * @notice Transfers contract ownership to a new address.
     * @dev Only the contract owner can call this function.
     * @param newOwner The address of the new owner.
     */
    function transferOwnership(address newOwner) public override onlyOwner whenNotPaused {
        require(newOwner != address(0), "Invalid address");
        address oldOwner = owner();
        _transferOwnership(newOwner);
        emit OwnershipTransferredCustom(oldOwner, newOwner, msg.sender);
    }

    /**
     * @notice Pauses or unpauses the contract in case of emergencies.
     * @param _paused Boolean indicating whether to pause (true) or unpause (false) the contract.
     */
    function togglePause(bool _paused) external onlyOwner {
        require(paused != _paused, "State already set");
        paused = _paused;
        emit EmergencyPaused(msg.sender, _paused);
    }

    /**
     * @notice Returns the current contract pause state.
     * @return True if paused, false otherwise.
     */
    function isPaused() external view returns (bool) {
        return paused;
    }

    /**
     * @notice Returns the current migration status.
     * @return step Last completed migration step.
     * @return isPausedState Whether the contract is paused.
     */
    function getMigrationStatus() external view returns (uint256 step, bool isPausedState) {
        return (lastCompletedMigration, paused);
    }
}
