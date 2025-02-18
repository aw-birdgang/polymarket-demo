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
    "function resetOracleRequest(uint256 marketId) external"
];

// 🎯 OracleManager 인스턴스 생성
const oracleManager = new ethers.Contract(ORACLE_MANAGER_ADDRESS, oracleManagerABI, wallet);

// 🔧 Oracle 요청 리셋 함수
async function resetOracleRequest(marketId) {
    try {
        console.log(`🔍 Resetting Oracle request for marketId: ${marketId}`);
        const tx = await oracleManager.resetOracleRequest(marketId);
        await tx.wait();
        console.log(`✅ Oracle request reset! Tx hash: ${tx.hash}`);
    } catch (error) {
        console.error(`❌ Error resetting Oracle request: ${error.message}`);
    }
}

// 📦 커맨드 라인 인자 처리
const [,, marketId] = process.argv;
if (!marketId) {
    console.error("❌ Usage: node scripts/reset-oracle-request.js <marketId>");
    process.exit(1);
}

resetOracleRequest(parseInt(marketId));
