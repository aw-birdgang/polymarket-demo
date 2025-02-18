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
    "function receiveOutcome(uint256 marketId, bool result) external"
];

// 🎯 OracleManager 인스턴스 생성
const oracleManager = new ethers.Contract(ORACLE_MANAGER_ADDRESS, oracleManagerABI, wallet);

// 🚀 Oracle 응답 수동 처리 함수
async function forceOracleResponse(marketId, result) {
    try {
        console.log(`🔍 Forcing Oracle response for marketId: ${marketId}`);
        const tx = await oracleManager.receiveOutcome(marketId, result);
        await tx.wait();
        console.log(`✅ Oracle response forced! Tx hash: ${tx.hash}`);
    } catch (error) {
        console.error(`❌ Error forcing Oracle response: ${error.message}`);
    }
}

// 📦 커맨드 라인 인자 처리
const [,, marketId, result] = process.argv;
if (!marketId || result === undefined) {
    console.error("❌ Usage: node scripts/force-oracle-response.js <marketId> <true/false>");
    process.exit(1);
}

forceOracleResponse(parseInt(marketId), result === 'true');


/**
 * $ node scripts/force-oracle-response.js 0 true
 * 🔍 Forcing Oracle response for marketId: 0
 * ✅ Oracle response forced! Tx hash: 0x8f43a1a52ce77f48766b5f0f65535d8392ab0cd61f5adef670a298caa7d91115
 */
