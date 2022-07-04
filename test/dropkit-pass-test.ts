import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { DropKitPass } from "../typechain-types";
import { createDropKitPass } from "./utils/dropkit-pass";

describe("DropKitPass", function () {
  let accounts: Signer[];
  let dropKitPass: DropKitPass;
  let owner: string;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    owner = await accounts[1].getAddress();
    dropKitPass = await createDropKitPass(accounts[0]);
  });

  it("should be able to mint", async function () {
    // mint one token
    const txMint = await dropKitPass.mint(owner, 300);
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to airdrop", async function () {
    const txAirdrop = await dropKitPass.batchAirdrop([owner], [300]);
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to get fee rate", async function () {
    // batch 1 nft
    const txAirdrop = await dropKitPass.batchAirdrop([owner], [300]);
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const feeRate = await dropKitPass.getFeeRate(1);

    expect(feeRate.toNumber()).to.be.equal(300);
  });

  it("should be able to get fee rate of owner of one", async function () {
    // batch 1 nft
    const txAirdrop = await dropKitPass.batchAirdrop([owner], [300]);
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(300);
  });

  it("should be able to get min fee rate of owner of several", async function () {
    // batch 4 nfts
    const feeRates = [300, 200, 500, 0];
    const txAirdrop = await dropKitPass.batchAirdrop(
      [owner, owner, owner, owner],
      feeRates
    );
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(0); // gets min fee
  });

  it("should be able to get fee rate higher than default", async function () {
    // batch 4 nfts
    const feeRates = [750, 800, 1000, 850];
    const txAirdrop = await dropKitPass.batchAirdrop(
      [owner, owner, owner, owner],
      feeRates
    );
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(750);
  });

  it("should be able to get fee rate of several tokens", async function () {
    // batch 4 nfts
    const feeRates = [300, 200, 500, 0];
    const txAirdrop = await dropKitPass.batchAirdrop(
      [owner, owner, owner, owner],
      feeRates
    );
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(0); // gets min fee

    // gets fees per token
    for (let idx = 0; idx < feeRates.length; idx++) {
      const tokenFeeRate = await dropKitPass.getFeeRate(idx + 1);
      expect(tokenFeeRate.toNumber()).to.be.equal(feeRates[idx]);
    }
  });

  it("should not be able to get fee of non minted tokens", async function () {
    await expect(dropKitPass.getFeeRate(1)).to.be.revertedWith(
      "Invalid tokenId"
    );

    // mint one token
    const txMint = await dropKitPass.mint(owner, 300);
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    await expect(dropKitPass.getFeeRate(0)).to.be.revertedWith(
      "Invalid tokenId"
    );

    await expect(dropKitPass.getFeeRate(2)).to.be.revertedWith(
      "Invalid tokenId"
    );
  });

  it("should be able to get fee rate of owner of none", async function () {
    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(500); // default fee rate
  });

  it("should be able to set base uri", async function () {
    await dropKitPass.setBaseURI("https://niftykit.com/");

    // batch 1 nft
    const txAirdrop = await dropKitPass.batchAirdrop([owner], [300]);
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const newUri = await dropKitPass.tokenURI(1);
    expect(newUri).to.be.equal("https://niftykit.com/1");
  });
});
