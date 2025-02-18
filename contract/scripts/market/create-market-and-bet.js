require('dotenv').config();
const { ethers } = require("ethers");

// 환경 변수 설정
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, PREDICTION_MARKET_ADDRESS } = process.env;

// 프로바이더 및 월렛 생성
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// ABI 설정
const predictionMarketABI = [
    "function createMarket(string calldata _question, uint256 _endTime) external",
    "function placeBet(uint256 _marketId, bool _betOnYes) external payable",
    "function getMarketInfo(uint256 _marketId) external view returns (string, uint256, uint8, uint256, uint256, uint256, bool)"
];

// 컨트랙트 인스턴스 생성
const predictionMarket = new ethers.Contract(PREDICTION_MARKET_ADDRESS, predictionMarketABI, wallet);

// 🚀 마켓 생성 및 베팅 실행
async function createMarketAndBet() {
    const question = "Will BTC hit $100k by 2025?";
    const endTime = Math.floor(Date.now() / 1000) + 7200; // 2시간 후

    try {
        // 1️⃣ 마켓 생성
        console.log(`🛠️ Creating market: "${question}" (Ends: ${new Date(endTime * 1000).toISOString()})`);
        const txCreate = await predictionMarket.createMarket(question, endTime);
        console.log(`✅ Market created! TX: ${txCreate.hash}`);
        await txCreate.wait();

        // 2️⃣ 베팅 실행
        const marketId = 0;
        const betAmount = ethers.utils.parseEther("0.05");
        console.log(`💸 Placing bet of ${ethers.utils.formatEther(betAmount)} ETH on YES`);
        const txBet = await predictionMarket.placeBet(marketId, true, { value: betAmount });
        console.log(`✅ Bet placed! TX: ${txBet.hash}`);
        await txBet.wait();

        console.log(`🎯 Market created & bet placed successfully! Now wait until the market ends.`);
    } catch (error) {
        console.error("❌ Error during market creation or betting:", error.reason || error.message);
    }
}

// 스크립트 실행
createMarketAndBet();
