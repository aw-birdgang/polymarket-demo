const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying MinimalForwarder with account:", deployer.address);

    const MinimalForwarder = await hre.ethers.getContractFactory("MinimalForwarder");
    const forwarder = await MinimalForwarder.deploy();

    await forwarder.deployed();
    console.log("MinimalForwarder deployed to:", forwarder.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
