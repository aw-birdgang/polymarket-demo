const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying MyTrustedForwarder with account:", deployer.address);

    const MyTrustedForwarder = await ethers.getContractFactory("MyTrustedForwarder");
    const forwarder = await MyTrustedForwarder.deploy(); // ✅ 인수 없이 배포

    await forwarder.deployed();

    console.log("✅ MyTrustedForwarder deployed to:", forwarder.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
