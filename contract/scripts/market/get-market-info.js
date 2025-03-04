require('dotenv').config();
const ethers = require("ethers");
const { formatEther } = require("ethers/lib/utils");

// 🔑 환경 변수 가져오기
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, PREDICTION_MARKET_ADDRESS } = process.env;

if (!INFURA_KEY || !DEPLOYER_PRIVATE_KEY || !PREDICTION_MARKET_ADDRESS) {
    console.error("❌ Missing required environment variables! Check your .env file.");
    process.exit(1);
}

// 🌐 Sepolia 네트워크 설정
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// 🎯 PredictionMarket ABI
const predictionMarketABI = [
    "function getMarketInfo(uint256 _marketId) external view returns (string, uint256, uint8, uint256, uint256, uint256, bool)"
];

// 🎯 컨트랙트 인스턴스 생성
const predictionMarket = new ethers.Contract(PREDICTION_MARKET_ADDRESS, predictionMarketABI, wallet);

// 🔍 market info 가져오기
async function fetchMarketInfo(marketId) {
    console.log(`🔍 Fetching info for Market ID: ${marketId}`);

    try {
        // 📡 getMarketInfo 호출
        const marketInfo = await predictionMarket.getMarketInfo(marketId);

        // 📊 출력
        console.log("\n📊 Comment Info:");
        console.log(`- ❓ Question: ${marketInfo[0]}`);
        console.log(`- 🕒 End Time: ${new Date(Number(marketInfo[1]) * 1000).toLocaleString()}`);
        console.log(`- 🎯 Outcome: ${getOutcomeName(marketInfo[2])}`);
        console.log(`- ✅ Total YES: ${formatEther(marketInfo[3])} ETH`);
        console.log(`- ❌ Total NO: ${formatEther(marketInfo[4])} ETH`);
        console.log(`- 🏦 Total Pool: ${formatEther(marketInfo[5])} ETH`);
        console.log(`- 🔍 Resolved: ${marketInfo[6] ? '✅ Yes' : '❌ No'}`);

    } catch (error) {
        console.error("🔥 Error fetching market info:", error.reason || error.message || error);
    }
}

// 🔍 MarketOutcome 매핑
function getOutcomeName(outcome) {
    const outcomes = ["Undecided", "Yes", "No"];
    return outcomes[outcome] ?? "Unknown";
}

// 🌐 실행
const marketId = process.argv[2];
if (marketId === undefined) {
    console.error("❌ Please provide a market ID.");
    process.exit(1);
}

fetchMarketInfo(marketId);


/**
 * $ node scripts/get-market-info.js 0
 *
 * 🔍 Fetching info for Comment ID: 0
 *
 * 📊 Comment Info:
 * - ❓ Question: Will BTC hit $100k by 2025?
 * - 🕒 End Time: 2/18/2025, 9:16:32 PM
 * - 🎯 Outcome: Undecided
 * - ✅ Total YES: 0.01 ETH
 * - ❌ Total NO: 0.0 ETH
 * - 🏦 Total Pool: 0.01 ETH
 * - 🔍 Resolved: ❌ No
 */
