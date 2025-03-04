# build & deploy & verify
````
> npx hardhat compile
> npx hardhat run scripts/deploy.js --network sepolia
> npx hardhat run scripts/verify-deploy.js --network sepolia
> npx hardhat verify --network sepolia --show-stack-traces --verbose 0xD5266514E1F3cDE7C596eDc33936c6e8009D4728
> npx hardhat run scripts/interact.js --network sepolia
> DEBUG=ethers* npx hardhat run scripts/interact.js --network sepolia

Deploying contracts with account: 0x43EAAAaE78B6CA996A6f9eCF04d021e8af17db43
PredictionMarket deployed to: 0xD5266514E1F3cDE7C596eDc33936c6e8009D4728
OracleManager deployed to: 0xE9D51C21d674032613AE0f2ee39B25E5eee55D89
Migrations deployed to: 0xD8ceCaF99Ff8971703A39Da95Ea825D8A6d66a09

https://sepolia.etherscan.io/address/0xD5266514E1F3cDE7C596eDc33936c6e8009D4728
https://sepolia.etherscan.io/address/0xE9D51C21d674032613AE0f2ee39B25E5eee55D89
https://sepolia.etherscan.io/address/0xD8ceCaF99Ff8971703A39Da95Ea825D8A6d66a09
https://sepolia.etherscan.io/address/0xD5266514E1F3cDE7C596eDc33936c6e8009D4728#code
https://sepolia.etherscan.io/address/0xE9D51C21d674032613AE0f2ee39B25E5eee55D89#code
https://sepolia.etherscan.io/address/0xD8ceCaF99Ff8971703A39Da95Ea825D8A6d66a09#code

# 지원 네트워크 목록
npx hardhat verify --list-networks
````


# debug
````
> npx hardhat console --network sepolia
> const contract = await ethers.getContractAt("PredictionMarket", "0xD5266514E1F3cDE7C596eDc33936c6e8009D4728");
> await contract.createMarket("Test", Math.floor(Date.now()/1000) + 3600);

````

# test
````
npx hardhat run scripts/transaction-details.js --network sepolia --txhash 0x9b0ad49e608776b758b9552d775fbee196a2e6f5c14c7d682b3b11ef14084ddf

node scripts/transaction-details.js 0x9b0ad49e608776b758b9552d775fbee196a2e6f5c14c7d682b3b11ef14084ddf

node scripts/oracle-interaction.js 0

````


#
````
Then proceed through these steps:
Comment Creation → 2. Event Placement → 3. Oracle Request → 4. Comment Resolution → 5. Claim Winnings → 6. Check Balance → 7. Mark Migration Complete → 8. Pause Contract.


1️⃣ Create Comment (createMarket) 🛠️
🛎️ Admin Only

🎯 Function Call
predictionMarket.createMarket("Will BTC hit $100k by 2025?", endTime);

🧠 Explanation
The question must be 5–200 characters long.
The end time must be at least 1 hour in the future.
On success, the MarketCreated event is emitted.


2️⃣ Place Event (placeBet) 💸
🛎️ Any User

🎯 Function Call
predictionMarket.placeBet(marketId, true/false, { value: ethers.utils.parseEther("0.05") });

🧠 Explanation
Place a YES or NO bet on a specific marketId.
Must be called before the end time.
On success, the BetPlaced event is emitted.


3️⃣ Request Oracle Outcome (requestOutcome) 🔍
🛎️ Admin Only

🎯 Function Call
oracleManager.requestOutcome(marketId, "Will BTC hit $100k by 2025?");

🧠 Explanation
Requests the oracle to provide the market outcome.
Cannot be called more than once per market.
On success, the OracleRequestSent event is emitted.


4️⃣ Resolve Comment (resolveMarket) ⚖️
🛎️ Admin Only

🎯 Function Call
predictionMarket.resolveMarket(marketId, true/false);

🧠 Explanation
Can only be called after the end time.
Must have received the oracle's response before resolving.
On success, the MarketResolved event is emitted.


5️⃣ Claim Winnings (claimWinnings) 🏆
🛎️ Only Winning Users

🎯 Function Call
predictionMarket.claimWinnings(marketId);

🧠 Explanation
Only users who bet on the correct outcome can claim winnings.
On success, the WinningsClaimed event is emitted.


6️⃣ Check Contract Balance (getContractBalance) 💰
🎯 Function Call
predictionMarket.getContractBalance();

🧠 Explanation
View the total ETH balance in the contract.


7️⃣ Set Migration Complete (setCompleted) 🧩
🛎️ Admin Only

🎯 Function Call
migrations.setCompleted(1);

🧠 Explanation
Marks the migration process as completed.


8️⃣ Pause Contract (togglePause) 🛑
🛎️ Admin Only

🎯 Function Call
migrations.togglePause(true);

🧠 Explanation
Pauses contract interactions for security or maintenance.

````
