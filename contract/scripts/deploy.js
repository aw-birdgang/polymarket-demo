const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // PredictionMarket 배포
    const PredictionMarket = await hre.ethers.getContractFactory("PredictionMarket");
    const predictionMarket = await PredictionMarket.deploy();
    await predictionMarket.deployed();
    console.log("PredictionMarket deployed to:", predictionMarket.address);

    // OracleManager 배포
    const OracleManager = await hre.ethers.getContractFactory("OracleManager");
    const oracleManager = await OracleManager.deploy(deployer.address);
    await oracleManager.deployed();
    console.log("OracleManager deployed to:", oracleManager.address);

    // Migrations 배포
    const Migrations = await hre.ethers.getContractFactory("Migrations");
    const migrations = await Migrations.deploy();
    await migrations.deployed();
    console.log("Migrations deployed to:", migrations.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
