require('dotenv').config();
const { ethers } = require("ethers");

// 🔑 환경 변수 가져오기
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, PREDICTION_MARKET_ADDRESS } = process.env;

if (!INFURA_KEY || !DEPLOYER_PRIVATE_KEY || !PREDICTION_MARKET_ADDRESS) {
    throw new Error("❌ Missing environment variables! Check your .env file.");
}

// 🌐 Sepolia 네트워크 설정
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// 🧠 ABI 정의
const predictionMarketABI = [
    "function getContractBalance() external view returns (uint256)"
];

// 🎯 컨트랙트 인스턴스 생성
const predictionMarket = new ethers.Contract(PREDICTION_MARKET_ADDRESS, predictionMarketABI, wallet);

// 🚀 컨트랙트 잔액 조회 함수
async function checkContractBalance() {
    try {
        console.log("💰 Checking contract balance...");
        const balance = await predictionMarket.getContractBalance();
        const formattedBalance = ethers.utils.formatEther(balance);
        console.log(`💼 Contract balance: ${formattedBalance} ETH`);
    } catch (error) {
        console.error("❌ Error fetching contract balance:", error.reason || error.message);
    }
}

// 🚀 실행
checkContractBalance();

/**
 * node scripts/market/deploy-gasless-erc20.js
 *
 * 💰 Checking contract balance...
 * 💼 Contract balance: 0.0 ETH
 */
