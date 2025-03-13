require("dotenv").config();
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying MyTrustedForwarder with account:", deployer.address);

    // Forwarder 컨트랙트 배포
    const MyTrustedForwarder = await hre.ethers.getContractFactory("MyTrustedForwarder");
    const forwarder = await MyTrustedForwarder.deploy();

    await forwarder.deployed();
    console.log("MyTrustedForwarder deployed to:", forwarder.address);

    // .env 파일 업데이트 (필요하면 자동 업데이트 가능)
    console.log(`\n⚡ Update .env file with:\nTRUSTED_FORWARDER=${forwarder.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
