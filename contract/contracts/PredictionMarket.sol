// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title PredictionMarket
/// @dev Decentralized prediction market for binary outcomes (YES/NO).
contract PredictionMarket is Ownable(msg.sender), ReentrancyGuard {

    // Enum representing market outcomes
    enum MarketOutcome { Undecided, Yes, No }

    // Struct for a prediction market
    struct Market {
        string question;
        uint256 endTime;
        MarketOutcome outcome;
        uint256 totalYes;
        uint256 totalNo;
        uint256 totalPool;
        bool resolved;
        mapping(address => uint256) betsYes;
        mapping(address => uint256) betsNo;
    }

    // State variables
    uint256 public marketCount;
    mapping(uint256 => Market) private markets;

    // Events
    event MarketCreated(uint256 indexed marketId, string question, uint256 endTime);
    event BetPlaced(uint256 indexed marketId, address indexed user, bool outcome, uint256 amount);
    event MarketResolved(uint256 indexed marketId, MarketOutcome outcome);
    event WinningsClaimed(uint256 indexed marketId, address indexed user, uint256 amount);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);

    /// @notice Creates a new prediction market.
    /// @param _question The prediction question.
    /// @param _endTime The timestamp indicating when betting ends.
    function createMarket(string calldata _question, uint256 _endTime) external onlyOwner {
        require(bytes(_question).length >= 5 && bytes(_question).length <= 200, "Invalid question length");
        require(_endTime > block.timestamp + 1 hours, "End time must be in the future");

        Market storage market = markets[marketCount];
        market.question = _question;
        market.endTime = _endTime;
        market.outcome = MarketOutcome.Undecided;

        emit MarketCreated(marketCount, _question, _endTime);
        marketCount++;
    }

    /// @notice Place a bet on a market.
    /// @param _marketId The ID of the market.
    /// @param _betOnYes True if betting on "YES", false for "NO".
    function placeBet(uint256 _marketId, bool _betOnYes) external payable nonReentrant {
        require(_marketId < marketCount, "Market does not exist");

        Market storage market = markets[_marketId];
        require(block.timestamp < market.endTime, "Betting has ended");
        require(msg.value > 0, "Bet must be greater than zero");
        require(!market.resolved, "Market already resolved");

        // Record the bet
        if (_betOnYes) {
            market.betsYes[msg.sender] += msg.value;
            market.totalYes += msg.value;
        } else {
            market.betsNo[msg.sender] += msg.value;
            market.totalNo += msg.value;
        }

        // Update total pool
        market.totalPool += msg.value;

        emit BetPlaced(_marketId, msg.sender, _betOnYes, msg.value);
    }

    /// @notice Resolve a market's outcome.
    /// @param _marketId The ID of the market.
    /// @param outcomeYes True for "YES", false for "NO".
    function resolveMarket(uint256 _marketId, bool outcomeYes) external onlyOwner {
        require(_marketId < marketCount, "Market does not exist");

        Market storage market = markets[_marketId];
        require(block.timestamp >= market.endTime, "Market not ended");
        require(!market.resolved, "Market already resolved");

        market.outcome = outcomeYes ? MarketOutcome.Yes : MarketOutcome.No;
        market.resolved = true;

        emit MarketResolved(_marketId, market.outcome);
    }

    /// @notice Claim winnings after a market is resolved.
    /// @param _marketId The ID of the market.
    function claimWinnings(uint256 _marketId) external nonReentrant {
        require(_marketId < marketCount, "Market does not exist");

        Market storage market = markets[_marketId];
        require(market.resolved, "Market not resolved");

        uint256 payout;

        // Calculate payout based on the winning outcome
        if (market.outcome == MarketOutcome.Yes) {
            uint256 userBet = market.betsYes[msg.sender];
            require(userBet > 0, "No YES bet found");
            payout = (userBet * market.totalPool) / market.totalYes;
            market.betsYes[msg.sender] = 0;
        } else if (market.outcome == MarketOutcome.No) {
            uint256 userBet = market.betsNo[msg.sender];
            require(userBet > 0, "No NO bet found");
            payout = (userBet * market.totalPool) / market.totalNo;
            market.betsNo[msg.sender] = 0;
        } else {
            revert("Market outcome undecided");
        }

        require(payout > 0, "No winnings to claim");

        // Transfer winnings
        payable(msg.sender).transfer(payout);
        emit WinningsClaimed(_marketId, msg.sender, payout);
    }

    /// @notice Emergency withdrawal function for the owner.
    /// @dev Should be protected by a multisig or external validation mechanism.
    function emergencyWithdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(owner()).transfer(balance);
        emit EmergencyWithdrawal(owner(), balance);
    }

    /// @notice Get the current balance of the contract.
    /// @return The current ETH balance.
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Get information about a specific market.
    /// @param _marketId ID of the market.
    /// @return question The market's question.
    /// @return endTime When the market ends.
    /// @return outcome The final outcome.
    /// @return totalYes Total ETH bet on "YES".
    /// @return totalNo Total ETH bet on "NO".
    /// @return totalPool Total ETH in the market pool.
    /// @return resolved Whether the market has been resolved.
    function getMarketInfo(uint256 _marketId) external view returns (
        string memory question,
        uint256 endTime,
        MarketOutcome outcome,
        uint256 totalYes,
        uint256 totalNo,
        uint256 totalPool,
        bool resolved
    ) {
        require(_marketId < marketCount, "Market does not exist");

        Market storage market = markets[_marketId];
        return (
        market.question,
        market.endTime,
        market.outcome,
        market.totalYes,
        market.totalNo,
        market.totalPool,
        market.resolved
        );
    }

    /// @notice Check user's bet for a given market.
    /// @param _marketId The market ID.
    /// @param user The user's address.
    /// @return yesBet The amount bet on "YES".
    /// @return noBet The amount bet on "NO".
    function getUserBets(uint256 _marketId, address user) external view returns (uint256 yesBet, uint256 noBet) {
        require(_marketId < marketCount, "Market does not exist");

        Market storage market = markets[_marketId];
        return (market.betsYes[user], market.betsNo[user]);
    }
}
