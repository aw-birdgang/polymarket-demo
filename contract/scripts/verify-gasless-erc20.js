const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const gaslessTokenAddress = process.env.GASLESS_ERC20;
    const trustedForwarderAddress = process.env.TRUSTED_FORWARDER;

    if (!gaslessTokenAddress || !trustedForwarderAddress) {
        throw new Error("Missing environment variables for contract verification.");
    }

    console.log(`Verifying GaslessERC20 at address: ${gaslessTokenAddress}`);

    await hre.run("verify:verify", {
        address: gaslessTokenAddress,
        constructorArguments: ["Gasless Token", "GST", trustedForwarderAddress],
    });

    console.log("✅ GaslessERC20 verified successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
