
## 1️⃣ 🔒 Security Enhancements
```bash
1. Oracle Authorization
- The receiveOutcome() function now requires that only the official Oracle address can call it.

2. Reentrancy Protection
- Added ReentrancyGuard to prevent reentrant attacks when handling oracle interactions.

3. Oracle Address Update
- Introduced updateOracleAddress() to allow the owner to update the Oracle's address if compromised.

4. Input Validation
- Ensured that questions are not empty and oracle addresses are valid (!= address(0)).


🛡️ Before:
function receiveOutcome(uint256 marketId, bool result) external {
    emit OracleResponseReceived(marketId, result);
}

Problem: Anyone could call this function and spoof oracle results. 😱

🔑 After:
function receiveOutcome(uint256 marketId, bool result) external {
    require(msg.sender == optimisticOracle, "Unauthorized oracle address");
    require(oracleRequests[marketId], "Oracle outcome not requested");

    oracleRequests[marketId] = false;
    emit OracleResponseReceived(marketId, result);
}

Fix:
Restricts access to the authorized Oracle only.
Ensures that an oracle request was actually made for the given market.

```


## 2️⃣ ⚙️ Usability Improvements
```bash
1. isRequestPending()
- Added a view function to check oracle request status without needing events.

2. updateOracleAddress()
- Allows the contract owner to update the oracle address if needed (e.g., Oracle migration).

3. Indexed Events
- marketId and addresses are indexed for easier filtering and tracking on-chain.


📡 New Utility Functions
function isRequestPending(uint256 marketId) external view returns (bool) {
    return oracleRequests[marketId];
}

Purpose: Frontend applications can easily check pending requests via this read-only function.

🛠️ Oracle Address Update
function updateOracleAddress(address newOracle) external onlyOwner {
    require(newOracle != address(0), "Invalid oracle address");
    address oldOracle = optimisticOracle;
    optimisticOracle = newOracle;
    emit OracleAddressUpdated(oldOracle, newOracle);
}

Use Case: If the Oracle contract is upgraded or compromised, the owner can switch to a new one.

```


## 3️⃣ 📉 Gas Optimization
```bash
1. calldata over memory
- Used calldata for immutable strings like the question in requestOutcome().

2. Mapping Booleans
- Reduced gas costs by using mapping(uint256 => bool) for request tracking.

3. Events with Indexes
- Indexed marketId and addresses in events to speed up on-chain querying.


🧠 Calldata Optimization
Before:
function requestOutcome(uint256 marketId, string memory question) external onlyOwner
After:
function requestOutcome(uint256 marketId, string calldata question) external onlyOwner

Why? :
calldata is cheaper than memory for function parameters that aren't modified


```


## 설치 및 실행
```bash
```
