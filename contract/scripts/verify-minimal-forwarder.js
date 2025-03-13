const hre = require("hardhat");
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const forwarderAddress = process.env.MINIMAL_FORWARDER;
    if (!forwarderAddress || !ethers.utils.isAddress(forwarderAddress)) {
        throw new Error(`Invalid MINIMAL_FORWARDER address: ${forwarderAddress}`);
    }

    console.log(`Verifying MinimalForwarder at address: ${forwarderAddress}`);

    await hre.run("verify:verify", {
        address: forwarderAddress,
        constructorArguments: [],
    });

    console.log("✅ MinimalForwarder verified successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
