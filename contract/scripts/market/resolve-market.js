require('dotenv').config();
const { ethers } = require("ethers");

// 환경 변수 설정
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, PREDICTION_MARKET_ADDRESS } = process.env;

// 프로바이더 및 월렛 생성
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// ABI 설정
const predictionMarketABI = [
    "function resolveMarket(uint256 _marketId, bool outcomeYes) external",
    "function getMarketInfo(uint256 _marketId) external view returns (string, uint256, uint8, uint256, uint256, uint256, bool)"
];

// 컨트랙트 인스턴스 생성
const predictionMarket = new ethers.Contract(PREDICTION_MARKET_ADDRESS, predictionMarketABI, wallet);

// 🚀 마켓 해제 실행
async function resolveMarket(marketId) {
    try {
        // 1️⃣ 마켓 종료 여부 확인
        const marketInfo = await predictionMarket.getMarketInfo(marketId);
        const endTime = marketInfo[1];
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime < endTime) {
            const waitTime = endTime - currentTime + 5; // 안전하게 5초 추가
            console.log(`⏳ Waiting ${waitTime} seconds until the market ends...`);
            await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        }

        // 2️⃣ 마켓 해제
        console.log(`⚖️ Resolving market ID: ${marketId}`);
        const txResolve = await predictionMarket.resolveMarket(marketId, true);
        console.log(`✅ Market resolved! TX: ${txResolve.hash}`);
        await txResolve.wait();

        console.log(`🎯 Market resolved successfully!`);
    } catch (error) {
        console.error("❌ Error during market resolution:", error.reason || error.message);
    }
}

// 스크립트 실행
resolveMarket(0);

/**
 * node scripts/market/resolve-market.js
 *
 * ⚖️ Resolving market ID: 0
 * ✅ Market resolved! TX: 0xe181252bbd09391ae28df53d197d91124799c852deb2bd0354091c1df22bf44d
 * 🎯 Market resolved successfully!
 */
