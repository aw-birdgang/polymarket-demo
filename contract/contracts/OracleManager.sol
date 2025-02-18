// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title OracleManager
/// @dev Manages interaction with UMA Oracle for market outcome resolution.
contract OracleManager is Ownable, ReentrancyGuard {
    // UMA Optimistic Oracle address
    address public optimisticOracle;

    // Track oracle request status: marketId => requested
    mapping(uint256 => bool) private oracleRequests;

    // Events
    event OracleRequestSent(uint256 indexed marketId, string question, address requester);
    event OracleResponseReceived(uint256 indexed marketId, bool result);
    event OracleAddressUpdated(address indexed oldOracle, address indexed newOracle, address indexed updater);

    // Modifier to allow only the oracle contract
    modifier onlyOracle() {
        require(msg.sender == optimisticOracle, "Unauthorized: Only oracle can call");
        _;
    }

    // Constructor to set the initial oracle address
    constructor(address _optimisticOracle) Ownable(msg.sender) {
        require(_optimisticOracle != address(0), "Invalid oracle address");
        optimisticOracle = _optimisticOracle;
    }

    /**
     * @notice Sends a request to the oracle for market outcome.
     * @dev Only the owner can request an oracle outcome.
     * @param marketId The ID of the market to resolve.
     * @param question The prediction question related to the market.
     */
    function requestOutcome(uint256 marketId, string calldata question) external onlyOwner {
        require(!oracleRequests[marketId], "Oracle outcome already requested");
        require(bytes(question).length > 0, "Question cannot be empty");

        oracleRequests[marketId] = true;
        emit OracleRequestSent(marketId, question, msg.sender);
    }

    /**
     * @notice Receives the outcome from the oracle and emits an event.
     * @dev Only the oracle can call this function.
     * @param marketId The ID of the market being resolved.
     * @param result The outcome of the market: true (YES), false (NO).
     */
    function receiveOutcome(uint256 marketId, bool result) external onlyOracle {
        require(oracleRequests[marketId], "Oracle outcome not requested");

        // Delete mapping entry to save gas
        delete oracleRequests[marketId];
        emit OracleResponseReceived(marketId, result);
    }

    /**
     * @notice Updates the oracle address.
     * @dev Only the owner can update the oracle address.
     * @param newOracle The new oracle address.
     */
    function updateOracleAddress(address newOracle) external onlyOwner {
        require(newOracle != address(0), "Invalid oracle address");
        require(newOracle != optimisticOracle, "New oracle address is the same as the current one");

        address oldOracle = optimisticOracle;
        optimisticOracle = newOracle;
        emit OracleAddressUpdated(oldOracle, newOracle, msg.sender);
    }

    /**
     * @notice Checks if an oracle request is pending for a given market ID.
     * @param marketId The ID of the market to check.
     * @return True if an oracle request is pending, otherwise false.
     */
    function isRequestPending(uint256 marketId) external view returns (bool) {
        return oracleRequests[marketId];
    }

    /**
     * @dev **TESTING ONLY:** Resets Oracle request manually.
     * @param marketId Market ID to reset.
     */
    function resetOracleRequest(uint256 marketId) external onlyOwner {
        require(oracleRequests[marketId], "No request to reset");
        delete oracleRequests[marketId];
    }

}
