require('dotenv').config();
const ethers = require("ethers");

// 🔑 환경 변수 가져오기
const { INFURA_KEY, DEPLOYER_PRIVATE_KEY, ORACLE_MANAGER_ADDRESS } = process.env;

if (!INFURA_KEY || !DEPLOYER_PRIVATE_KEY || !ORACLE_MANAGER_ADDRESS) {
    console.error("❌ Missing environment variables! Check your .env file.");
    process.exit(1);
}

// 🌐 Sepolia 네트워크 설정
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// 🧠 OracleManager ABI 정의
const oracleManagerABI = [
    "function optimisticOracle() public view returns (address)",
    "function requestOutcome(uint256 marketId, string calldata question) external",
    "function receiveOutcome(uint256 marketId, bool result) external",
    "function updateOracleAddress(address newOracle) external",
    "function isRequestPending(uint256 marketId) external view returns (bool)"
];

// 🎯 컨트랙트 인스턴스 생성
const oracleManager = new ethers.Contract(ORACLE_MANAGER_ADDRESS, oracleManagerABI, wallet);

// 🚀 메인 함수
async function main() {
    const marketId = 0;
    const question = "Will BTC hit $100k by 2025?";
    const newOracle = "0x1234567890123456789012345678901234567890";

    try {
        // 🔍 1️⃣ 현재 Oracle 주소 조회
        const oracleAddress = await oracleManager.optimisticOracle();
        console.log(`\n🏛️ Current Oracle Address: ${oracleAddress}`);

        // 🔍 2️⃣ 요청 중복 확인
        const isPending = await oracleManager.isRequestPending(marketId);
        if (isPending) {
            console.warn(`⚠️ Oracle request for marketId ${marketId} is already pending!`);
            return;
        }

        // 🛠️ 3️⃣ 입력값 유효성 검사
        if (question.length === 0) {
            console.error("❌ Question cannot be empty!");
            return;
        }

        // 🚀 4️⃣ Oracle 요청 전송 (가스 한도 명시)
        console.log(`\n🚀 Sending Oracle request for Market ID: ${marketId}`);
        const estimatedGas = await oracleManager.estimateGas.requestOutcome(marketId, question);
        const gasLimit = estimatedGas.mul(2); // 안전 마진 2배
        const tx1 = await oracleManager.requestOutcome(marketId, question, { gasLimit });
        await tx1.wait();
        console.log(`✅ Oracle request sent! Tx hash: ${tx1.hash}`);

        // 🔍 5️⃣ 요청 상태 재확인
        const isPendingAfter = await oracleManager.isRequestPending(marketId);
        console.log(`🔄 Request pending status: ${isPendingAfter ? '🟢 Yes' : '🔴 No'}`);

        // 🧪 6️⃣ Oracle 응답 시뮬레이션
        console.log(`\n🧪 Simulating Oracle response for Market ID: ${marketId}`);
        const simulatedResult = true;
        const tx2 = await oracleManager.receiveOutcome(marketId, simulatedResult);
        await tx2.wait();
        console.log(`✅ Oracle response received! Tx hash: ${tx2.hash}`);

        // // 🔍 7️⃣ Oracle 주소 변경
        // console.log(`\n🔄 Updating Oracle address to: ${newOracle}`);
        // const tx3 = await oracleManager.updateOracleAddress(newOracle);
        // await tx3.wait();
        // console.log(`✅ Oracle address updated! Tx hash: ${tx3.hash}`);

        const updatedOracle = await oracleManager.optimisticOracle();
        console.log(`🏛️ Updated Oracle Address: ${updatedOracle}`);

    } catch (error) {
        console.error("🔥 Error during Oracle interaction:", error.reason || error.message || error);
    }
}

// 🛠️ 실행
main().then(() => console.log("🎯 Oracle interaction completed!"))
    .catch((error) => {
        console.error("🔥 Critical Error:", error);
        process.exit(1);
    });


/**
 * node scripts/oracle/oracle-interaction.js
 *
 * 🏛️ Current Oracle Address: 0x43EAAAaE78B6CA996A6f9eCF04d021e8af17db43
 *
 * 🚀 Sending Oracle request for Comment ID: 0
 * ✅ Oracle request sent! Tx hash: 0x727112f9f44ce569fb8f297b2841d7312fa5699d15740400d344971bc581fc49
 * 🔄 Request pending status: 🟢 Yes
 *
 * 🧪 Simulating Oracle response for Comment ID: 0
 * ✅ Oracle response received! Tx hash: 0x99577da88d02bb29711be3fdb0e6c3d7e4ac96ccbc86a6caf3771e4cf5861e65
 * 🏛️ Updated Oracle Address: 0x43EAAAaE78B6CA996A6f9eCF04d021e8af17db43
 * 🎯 Oracle interaction completed!
 */
