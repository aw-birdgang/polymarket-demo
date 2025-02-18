require('dotenv').config();
const { ethers } = require("ethers");

// 🔑 환경 변수 가져오기
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, ORACLE_MANAGER_ADDRESS } = process.env;

if (!INFURA_KEY || !DEPLOYER_PRIVATE_KEY || !ORACLE_MANAGER_ADDRESS) {
    throw new Error("❌ Missing required environment variables! Check your .env file.");
}

// 🌐 Sepolia 네트워크 설정
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// 🧠 OracleManager ABI 정의
const oracleManagerABI = [
    "function isRequestPending(uint256 marketId) external view returns (bool)"
];

// 🎯 OracleManager 인스턴스 생성
const oracleManager = new ethers.Contract(ORACLE_MANAGER_ADDRESS, oracleManagerABI, wallet);

// 🔍 Oracle 상태 확인 함수
async function checkOracleStatus(marketId) {
    try {
        console.log(`🔍 Checking Oracle status for marketId: ${marketId}`);
        const isPending = await oracleManager.isRequestPending(marketId);
        console.log(`🔍 Oracle request status for marketId ${marketId}: ${isPending ? "🟢 Pending" : "🔴 Not Pending"}`);
    } catch (error) {
        console.error(`❌ Error checking Oracle status: ${error.message}`);
    }
}

// 📦 커맨드 라인 인자 처리
const [,, marketId] = process.argv;
if (!marketId) {
    console.error("❌ Usage: node scripts/check-oracle-status.js <marketId>");
    process.exit(1);
}

checkOracleStatus(parseInt(marketId));

/**
 * $ node scripts/oracle/check-oracle-status.js 0
 *
 * 🔍 Checking Oracle status for marketId: 0
 * 🔍 Oracle request status for marketId 0: 🔴 Not Pending
 */
