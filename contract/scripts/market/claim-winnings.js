require('dotenv').config();
const { ethers } = require("ethers");

// 환경 변수 설정
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, PREDICTION_MARKET_ADDRESS } = process.env;

// 프로바이더 및 월렛 생성
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// ABI 설정
const predictionMarketABI = [
    "function claimWinnings(uint256 _marketId) external",
    "function getMarketInfo(uint256 _marketId) external view returns (string, uint256, uint8, uint256, uint256, uint256, bool)"
];

// 컨트랙트 인스턴스 생성
const predictionMarket = new ethers.Contract(PREDICTION_MARKET_ADDRESS, predictionMarketABI, wallet);

// 🚀 당첨금 수령 실행
async function claimWinnings(marketId) {
    try {
        // 1️⃣ 마켓이 해제되었는지 확인
        const marketInfo = await predictionMarket.getMarketInfo(marketId);
        const resolved = marketInfo[6]; // 7번째 반환 값이 'resolved'

        if (!resolved) {
            console.log(`⏳ Market not resolved yet. Run resolveMarket.js first.`);
            return;
        }

        // 2️⃣ 당첨금 수령
        console.log(`🏆 Claiming winnings for market ID: ${marketId}`);
        const txClaim = await predictionMarket.claimWinnings(marketId);
        console.log(`✅ Winnings claimed! TX: ${txClaim.hash}`);
        await txClaim.wait();

        console.log(`🎯 Winnings claimed successfully!`);
    } catch (error) {
        console.error("❌ Error during claiming winnings:", error.reason || error.message);
    }
}

// 스크립트 실행
claimWinnings(0);

/**
 * node scripts/market/claim-winnings.js
 *
 * 🏆 Claiming winnings for market ID: 0
 * ✅ Winnings claimed! TX: 0xeb2aae072b5e932e2732ee65c773b414bd033a061e32f51d878cc75a6f2c8473
 * 🎯 Winnings claimed successfully!
 *
 */
