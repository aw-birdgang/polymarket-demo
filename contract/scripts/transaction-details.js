require('dotenv').config();
const ethers = require("ethers");
const { formatEther, formatUnits } = require("ethers/lib/utils");

// 🌐 환경 변수 가져오기
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY } = process.env;

if (!INFURA_KEY || !DEPLOYER_PRIVATE_KEY) {
    console.error("❌ Missing required environment variables! Check your .env file.");
    process.exit(1);
}

// 🚀 Sepolia 네트워크 설정
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// 🔍 트랜잭션 정보 조회 함수
async function getTransactionDetails(txHash) {
    console.log(`\n🔍 Fetching details for transaction: ${txHash}`);

    // 🛠️ 트랜잭션 해시 유효성 검사
    if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
        console.error("⚠️ Invalid transaction hash format!");
        return;
    }

    // 🔍 트랜잭션 정보 조회
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
        console.warn(`❌ Transaction not found: ${txHash}`);
        return;
    }

    // 🧠 트랜잭션 기본 정보 출력
    console.log("\n🔎 Transaction Info:");
    console.log(`- 📜 Hash: ${tx.hash}`);
    console.log(`- 🧑 From: ${tx.from}`);
    console.log(`- 🎯 To: ${tx.to ?? "🛠️ Contract Creation"}`);
    console.log(`- 💸 Value: ${formatEther(tx.value)} ETH`);
    console.log(`- ⏳ Nonce: ${tx.nonce}`);
    console.log(`- ⛽ Gas Limit: ${tx.gasLimit.toString()}`);
    console.log(`- 💰 Gas Price: ${formatUnits(tx.gasPrice, 'gwei')} Gwei`);
    console.log(`- 🔍 Data (input): ${tx.data.slice(0, 100)}...`);
    console.log(`- ⛓️ Block Number: ${tx.blockNumber ?? 'Pending'}`);
    console.log(`- 🔑 Chain ID: ${tx.chainId}`);

    // 🔍 영수증 조회
    const receipt = await provider.getTransactionReceipt(txHash);
    if (receipt) {
        console.log("\n🧾 Transaction Receipt:");
        console.log(`- ⛓️ Block Hash: ${receipt.blockHash}`);
        console.log(`- 🔢 Block Number: ${receipt.blockNumber}`);
        console.log(`- ⚙️ Gas Used: ${receipt.gasUsed.toString()}`);
        console.log(`- 🧱 Status: ${receipt.status === 1 ? '✅ Success' : '❌ Failed'}`);
        console.log(`- 📜 Logs Count: ${receipt.logs.length}`);

        if (receipt.logs.length > 0) {
            console.log("\n📑 Event Logs:");
            for (const log of receipt.logs) {
                console.log(`- 🆔 Log Index: ${log.logIndex}`);
                console.log(`  🔹 Address: ${log.address}`);
                console.log(`  🔹 Data: ${log.data}`);
                console.log(`  🔹 Topics: ${log.topics.join(', ')}`);
            }
        }
    } else {
        console.log("⏳ Transaction is still pending...");
    }

    console.log("\n🎯 Done!");
}

// 🌐 실행
const txHash = process.argv[2]; // 커맨드라인 인자로 트랜잭션 해시 전달
if (!txHash) {
    console.error("❌ Please provide a transaction hash.");
    console.log("💡 Usage: node scripts/transaction-details.js <txHash>");
    process.exit(1);
}

getTransactionDetails(txHash).catch((error) => {
    console.error("🔥 Unexpected Error:", error);
});
