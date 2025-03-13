const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const forwarderAddress = "0xYourDeployedForwarderAddress"; // 배포된 Forwarder 주소

    // MyTrustedForwarder 인스턴스 생성
    const MyTrustedForwarder = await hre.ethers.getContractFactory("MyTrustedForwarder");
    const forwarder = await MyTrustedForwarder.attach(forwarderAddress);

    // 대행자(리레이어) 주소 추가
    const relayerAddress = "0xRelayerWalletAddress"; // 트랜잭션을 실행할 지갑 주소
    const tx = await forwarder.setCallerWhitelist(relayerAddress, true);
    await tx.wait();

    console.log(`Relayer ${relayerAddress} added to whitelist!`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
