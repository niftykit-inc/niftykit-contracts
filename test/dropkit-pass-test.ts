import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { DropKitPass } from "../typechain-types";
import { changeSigner, createDropKitPass } from "./utils/dropkit-pass";

describe("DropKitPass", function () {
  let accounts: Signer[];
  let dropKitPass: DropKitPass;
  let owner: string;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    owner = await accounts[0].getAddress();
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

  it("should be able to set default fee rate", async function () {
    await dropKitPass.setDefaultFeeRate(450);

    // should return default fee rate
    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(450);
  });

  it("should be able to update fee rate of several owners after one transfer", async function () {
    // batch 4 nfts
    // tokens: 1, 2, 3, 4
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

    const newOwner = await accounts[1].getAddress();
    // transfer min token to new owner
    const txTransfer = await dropKitPass.transferFrom(owner, newOwner, 4);

    const txTransferReceipt = await txTransfer.wait();

    const transfer2Event = txTransferReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transfer2Event).to.be.a("object");

    // new owner should have 0 fee rate
    const newOwnerFeeRate = await dropKitPass.getFeeRateOf(newOwner);
    expect(newOwnerFeeRate.toNumber()).to.be.equal(0);

    // old owner should have 200 fee rate (second minimum fee)
    const oldOwnerFeeRate = await dropKitPass.getFeeRateOf(owner);
    expect(oldOwnerFeeRate.toNumber()).to.be.equal(200);
  });

  it("should be able to keep repeated fee rate after one transfer", async function () {
    // batch 5 nfts
    // tokens: 1, 2, 3, 4, 5
    const feeRates = [300, 200, 500, 200, 500];
    const txAirdrop = await dropKitPass.batchAirdrop(
      [owner, owner, owner, owner, owner],
      feeRates
    );
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    const feeRate = await dropKitPass.getFeeRateOf(owner);

    expect(feeRate.toNumber()).to.be.equal(200); // gets min fee

    // gets fees per token
    for (let idx = 0; idx < feeRates.length; idx++) {
      const tokenFeeRate = await dropKitPass.getFeeRate(idx + 1);
      expect(tokenFeeRate.toNumber()).to.be.equal(feeRates[idx]);
    }

    const newOwner = await accounts[1].getAddress();
    // transfer min token to new owner
    const txTransfer = await dropKitPass.transferFrom(owner, newOwner, 2);

    const txTransferReceipt = await txTransfer.wait();

    const transfer2Event = txTransferReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transfer2Event).to.be.a("object");

    // new owner should have 0 fee rate
    const newOwnerFeeRate = await dropKitPass.getFeeRateOf(newOwner);
    expect(newOwnerFeeRate.toNumber()).to.be.equal(200);

    // old owner should have 200 fee rate (second minimum fee)
    const oldOwnerFeeRate = await dropKitPass.getFeeRateOf(owner);
    expect(oldOwnerFeeRate.toNumber()).to.be.equal(200);
  });

  it("should be able to read default fee after transfering all tokens", async function () {
    // batch 8 nfts
    // tokens: 1, 2, 3, 4, 5, 6, 7, 8
    const feeRates = [300, 200, 500, 200, 500, 100, 350, 0];
    const txAirdrop = await dropKitPass.batchAirdrop(
      [owner, owner, owner, owner, owner, owner, owner, owner],
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

    const newOwner = await accounts[1].getAddress();
    let oldMins = [...feeRates];
    let newMins = [];
    // transfer all tokens to new owner
    for (let idx = 0; idx < feeRates.length - 1; idx++) {
      // transfer min token to new owner
      oldMins = oldMins.filter((_, i) => i !== idx);
      newMins.push(feeRates[idx]);

      const txTransfer = await dropKitPass.transferFrom(
        owner,
        newOwner,
        idx + 1
      );
      const txTransferReceipt = await txTransfer.wait();
      const transfer2Event = txTransferReceipt.events?.find(
        (event) => event.event === "Transfer"
      );
      expect(transfer2Event).to.be.a("object");

      const newOwnerFeeRate = await dropKitPass.getFeeRateOf(newOwner);
      expect(newOwnerFeeRate.toNumber()).to.be.equal(Math.min(...newMins));

      const oldOwnerFeeRate = await dropKitPass.getFeeRateOf(owner);
      expect(oldOwnerFeeRate.toNumber()).to.be.equal(Math.min(...oldMins));
    }

    // finally removes the last token
    const txTransfer = await dropKitPass.transferFrom(
      owner,
      newOwner,
      feeRates.length
    );
    const txTransferReceipt = await txTransfer.wait();
    const transferLastEvent = txTransferReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transferLastEvent).to.be.a("object");

    const newOwnerFeeRate = await dropKitPass.getFeeRateOf(newOwner);
    expect(newOwnerFeeRate.toNumber()).to.be.equal(0); // min fee

    const oldOwnerFeeRate = await dropKitPass.getFeeRateOf(owner);
    expect(oldOwnerFeeRate.toNumber()).to.be.equal(500); // default fee
  });

  it("should be able to read right fees after transfering back and forth", async function () {
    const feeRates1 = [250, 100, 250, 300];
    const feeRates2 = [320, 210, 99, 211];
    const feeRates = [...feeRates1, ...feeRates2];
    const newOwner = await accounts[1].getAddress();

    // first airdrop
    let txAirdrop = await dropKitPass.batchAirdrop(
      [owner, owner, owner, owner],
      feeRates1
    );
    let txAirdropReceipt = await txAirdrop.wait();
    let transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transferEvent).to.be.a("object");

    // second airdrop
    txAirdrop = await dropKitPass.batchAirdrop(
      [newOwner, newOwner, newOwner, newOwner],
      feeRates2
    );
    txAirdropReceipt = await txAirdrop.wait();
    transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transferEvent).to.be.a("object");

    let feeRate1 = await dropKitPass.getFeeRateOf(owner);
    expect(feeRate1.toNumber()).to.be.equal(Math.min(...feeRates1));

    let feeRate2 = await dropKitPass.getFeeRateOf(newOwner);
    expect(feeRate2.toNumber()).to.be.equal(Math.min(...feeRates2));

    // gets fees per token
    for (let idx = 0; idx < feeRates.length; idx++) {
      const tokenFeeRate = await dropKitPass.getFeeRate(idx + 1);
      expect(tokenFeeRate.toNumber()).to.be.equal(feeRates[idx]);
    }

    // transfer token with feeRate=100 to newOwner
    // new owner should have 99 fee rate
    // old owner should have 250 fee rate

    let txTransfer = await dropKitPass.transferFrom(owner, newOwner, 2);
    let txTransferReceipt = await txTransfer.wait();
    transferEvent = txTransferReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transferEvent).to.be.a("object");

    feeRate1 = await dropKitPass.getFeeRateOf(owner);
    expect(feeRate1.toNumber()).to.be.equal(250);

    feeRate2 = await dropKitPass.getFeeRateOf(newOwner);
    expect(feeRate2.toNumber()).to.be.equal(99);

    // transfer token with feeRate=211 to oldOwner
    // new owner should have 99 fee rate
    // old owner should have 211 fee rate
    const dropKitPassNewOwner = changeSigner(dropKitPass, accounts[1]);
    txTransfer = await dropKitPassNewOwner.transferFrom(newOwner, owner, 8);
    txTransferReceipt = await txTransfer.wait();
    transferEvent = txTransferReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transferEvent).to.be.a("object");

    feeRate1 = await dropKitPass.getFeeRateOf(owner);
    expect(feeRate1.toNumber()).to.be.equal(211);

    feeRate2 = await dropKitPass.getFeeRateOf(newOwner);
    expect(feeRate2.toNumber()).to.be.equal(99);

    // transfer token with feeRate=99 to oldOwner
    // new owner should have 100 fee rate
    // old owner should have 99 fee rate
    txTransfer = await dropKitPassNewOwner.transferFrom(newOwner, owner, 7);
    txTransferReceipt = await txTransfer.wait();
    transferEvent = txTransferReceipt.events?.find(
      (event) => event.event === "Transfer"
    );
    expect(transferEvent).to.be.a("object");

    feeRate1 = await dropKitPass.getFeeRateOf(owner);
    expect(feeRate1.toNumber()).to.be.equal(99);

    feeRate2 = await dropKitPass.getFeeRateOf(newOwner);
    expect(feeRate2.toNumber()).to.be.equal(100);
  });
});
