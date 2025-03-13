require("dotenv").config();
const { ethers, run } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("🚀 Deploying MyTrustedForwarder with account:", deployer.address);

    // ✅ MyTrustedForwarder 배포
    const MyTrustedForwarder = await ethers.getContractFactory("MyTrustedForwarder");
    const forwarder = await MyTrustedForwarder.deploy();

    await forwarder.deployed();
    console.log("✅ MyTrustedForwarder deployed to:", forwarder.address);

    // ✅ 블록 5개 이상 대기 (Etherscan이 컨트랙트를 인식할 시간 확보)
    console.log("⌛ Waiting for 5 block confirmations...");
    await forwarder.deployTransaction.wait(5);

    // ✅ Etherscan 검증 실행 전에 추가 대기 시간 (30~60초)
    console.log("⌛ Waiting 60 seconds before verification...");
    await delay(60000); // 1분 대기

    // ✅ 컨트랙트 검증 (Verify)
    try {
        console.log("🔍 Verifying contract on Etherscan...");
        await run("verify:verify", {
            address: forwarder.address,
            constructorArguments: [], // ✅ 생성자가 매개변수를 받지 않음
        });
        console.log("✅ Contract verified on Etherscan!");
    } catch (error) {
        console.error("❌ Verification failed:", error);
    }
}

// ✅ 대기 함수 (ms 단위)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ✅ 실행
main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});
