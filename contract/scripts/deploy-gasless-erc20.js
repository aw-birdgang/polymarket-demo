const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    const forwarderAddress = process.env.TRUSTED_FORWARDER;
    if (!forwarderAddress) {
        throw new Error("TRUSTED_FORWARDER address is missing in .env");
    }

    const GaslessERC20 = await hre.ethers.getContractFactory("GaslessERC20");
    const token = await GaslessERC20.deploy("Gasless Token", "GST", forwarderAddress);

    await token.deployed();
    console.log("GaslessERC20 deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
