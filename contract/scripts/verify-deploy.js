const hre = require("hardhat");
require("dotenv").config();

// Helper to verify contract with retries
async function verifyContract(contractName, address, args = [], retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`🔍 [${contractName}] Attempt ${attempt}/${retries} - Verifying contract at: ${address}`);
            await hre.run("verify:verify", {
                address: address,
                constructorArguments: args,
            });
            console.log(`🎯 ✅ [${contractName}] Verified successfully!`);
            return;
        } catch (error) {
            console.error(`❌ [${contractName}] Verification failed (Attempt ${attempt}):`, error.message);
            if (attempt < retries) {
                console.log(`🔄 Retrying in 10 seconds...`);
                await new Promise((resolve) => setTimeout(resolve, 10000)); // 10초 대기 후 재시도
            } else {
                throw new Error(`🚨 [${contractName}] Verification failed after ${retries} attempts.`);
            }
        }
    }
}

async function main() {
    console.log("🚀 Starting contract verification...\n");

    const predictionMarket = process.env.PREDICTION_MARKET_ADDRESS;
    const oracleManager = process.env.ORACLE_MANAGER_ADDRESS;
    const migrations = process.env.MIGRATIONS_ADDRESS;

    if (!predictionMarket || !oracleManager || !migrations) {
        throw new Error("❌ Missing contract addresses! Check your .env file.");
    }

    const deployer = (await hre.ethers.getSigners())[0].address;

    // 병렬로 검증 실행
    await Promise.all([
        verifyContract("PredictionMarket", predictionMarket),
        verifyContract("OracleManager", oracleManager, [deployer]),
        verifyContract("Migrations", migrations)
    ]);

    console.log("\n🎯 🚀 All contracts verified successfully!");
}

main().catch((error) => {
    console.error("🔥 Critical Error during verification:", error);
    process.exit(1);
});
