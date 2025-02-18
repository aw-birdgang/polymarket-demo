const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PredictionMarket", function () {
    let predictionMarket, owner, user;

    before(async () => {
        [owner, user] = await ethers.getSigners();
        const Market = await ethers.getContractFactory("PredictionMarket");
        predictionMarket = await Market.deploy();
        await predictionMarket.deployed();
    });

    it("Should create a new market", async () => {
        const question = "Will Ethereum hit $5000 by 2025?";
        const endTime = Math.floor(Date.now() / 1000) + 3600;
        await predictionMarket.createMarket(question, endTime);
        const market = await predictionMarket.markets(0);
        expect(market.question).to.equal(question);
    });

    it("Should allow users to place bets", async () => {
        await predictionMarket.connect(user).placeBet(0, true, { value: ethers.utils.parseEther("1") });
        const contractBalance = await predictionMarket.getContractBalance();
        expect(contractBalance).to.equal(ethers.utils.parseEther("1"));
    });
});
