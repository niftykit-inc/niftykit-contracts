import { expect } from "chai";
import { BigNumber, Signer } from "ethers";
import { ethers } from "hardhat";
import { NiftyKitV2 } from "../typechain-types";
import { createDropCollection721, createNiftyKit } from "./utils/collections";
import { getMerkleTree } from "./utils/merkle-tree";

const salesParam = [200, 150, 100, ethers.utils.parseEther("0.01")] as const;

describe("DropCollection (721)", function () {
  let accounts: Signer[];
  let niftyKit: NiftyKitV2;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    niftyKit = await createNiftyKit(accounts[0]);
  });

  it("should be able to create a DropCollection (721)", async function () {
    await createDropCollection721(niftyKit, accounts[0]);
  });

  it("should be able to start the drop", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, false);

    expect(await dropCollection.saleActive()).to.be.true;
  });

  it("should be able to mint", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, false);

    expect(await dropCollection.saleActive()).to.be.true;

    const txMint = await dropCollection.connect(accounts[1]).mint(2, {
      value: salesParam[3].mul(2),
    });
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to presale mint", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    expect(await dropCollection.presaleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, true);

    expect(await dropCollection.saleActive()).to.be.true;

    expect(await dropCollection.presaleActive()).to.be.true;

    const presaleList = [];
    for (const account of accounts) {
      presaleList.push([await account.getAddress(), 1]);
    }

    const [merkleRoot, hexProof] = getMerkleTree(
      presaleList,
      presaleList[1][0] as string,
      1
    );

    const txRoot = await dropCollection.setMerkleRoot(merkleRoot);
    await txRoot.wait();

    const txMint = await dropCollection
      .connect(accounts[1])
      .presaleMint(1, 1, hexProof, {
        value: salesParam[3].mul(2),
      });
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to presale mint for a given wallet with allowed greater than max", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    expect(await dropCollection.presaleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, true);

    expect(await dropCollection.saleActive()).to.be.true;

    expect(await dropCollection.presaleActive()).to.be.true;

    const presaleList = [];
    for (const account of accounts) {
      // max per each wallet is 101
      presaleList.push([await account.getAddress(), 101]);
    }

    const [merkleRoot, hexProof] = getMerkleTree(
      presaleList,
      presaleList[1][0] as string,
      101
    );
    const txRoot = await dropCollection.setMerkleRoot(merkleRoot);
    await txRoot.wait();

    // mint 1 NFT (should succeed)
    const txMint = await dropCollection
      .connect(accounts[1])
      .presaleMint(1, 101, hexProof, {
        value: salesParam[3].mul(2),
      });
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should not be able to presale mint for a given wallet with allowed greater than max", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    expect(await dropCollection.presaleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, true);

    expect(await dropCollection.saleActive()).to.be.true;

    expect(await dropCollection.presaleActive()).to.be.true;

    const presaleList = [];
    for (const account of accounts) {
      // max per each wallet is 101
      presaleList.push([await account.getAddress(), 101]);
    }

    const [merkleRoot, hexProof] = getMerkleTree(
      presaleList,
      presaleList[1][0] as string,
      101
    );

    const txRoot = await dropCollection.setMerkleRoot(merkleRoot);
    await txRoot.wait();

    // mint 101 NFT (should fail)
    await expect(
      dropCollection.connect(accounts[1]).presaleMint(101, 101, hexProof, {
        value: salesParam[3].mul(2),
      })
    ).to.be.revertedWith("Exceeded max per wallet");
  });

  it("should not be able to presale mint for a given wallet with zero allowed", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    expect(await dropCollection.presaleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, true);

    expect(await dropCollection.saleActive()).to.be.true;

    expect(await dropCollection.presaleActive()).to.be.true;

    const presaleList = [];
    for (const account of accounts) {
      // max per each wallet is 0
      presaleList.push([await account.getAddress(), 0]);
    }

    const [merkleRoot, hexProof] = getMerkleTree(
      presaleList,
      presaleList[1][0] as string,
      101
    );

    const txRoot = await dropCollection.setMerkleRoot(merkleRoot);
    await txRoot.wait();

    // mint 1 NFT (should fail)
    await expect(
      dropCollection.connect(accounts[1]).presaleMint(1, 0, hexProof, {
        value: salesParam[3].mul(2),
      })
    ).to.be.revertedWith("Exceeded max per wallet");
  });

  it("should not be able to presale mint for a given wallet and one mint attempt", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    expect(await dropCollection.presaleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, true);

    expect(await dropCollection.saleActive()).to.be.true;

    expect(await dropCollection.presaleActive()).to.be.true;

    const presaleList = [];
    for (const account of accounts) {
      // max per each wallet is 1
      presaleList.push([await account.getAddress(), 1]);
    }

    const [merkleRoot, hexProof] = getMerkleTree(
      presaleList,
      presaleList[1][0] as string,
      101
    );

    const txRoot = await dropCollection.setMerkleRoot(merkleRoot);
    await txRoot.wait();

    // mint 2 NFT (should fail)
    await expect(
      dropCollection.connect(accounts[1]).presaleMint(2, 1, hexProof, {
        value: salesParam[3].mul(2),
      })
    ).to.be.revertedWith("Exceeded max per wallet");
  });

  it("should not be able to presale mint for a given wallet and two mint attempts", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    expect(await dropCollection.presaleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, true);

    expect(await dropCollection.saleActive()).to.be.true;

    expect(await dropCollection.presaleActive()).to.be.true;

    const presaleList = [];
    for (const account of accounts) {
      // max per each wallet is 1
      presaleList.push([await account.getAddress(), 1]);
    }

    const [merkleRoot, hexProof] = getMerkleTree(
      presaleList,
      presaleList[1][0] as string,
      1
    );

    const txRoot = await dropCollection.setMerkleRoot(merkleRoot);
    await txRoot.wait();

    // mint the first NFT (should be successful)
    let txMint = await dropCollection
      .connect(accounts[1])
      .presaleMint(1, 1, hexProof, {
        value: salesParam[3].mul(2),
      });
    let txMintReceipt = await txMint.wait();
    let transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    // mint the second NFT (should fail)
    await expect(
      dropCollection.connect(accounts[1]).presaleMint(1, 1, hexProof, {
        value: salesParam[3].mul(2),
      })
    ).to.be.revertedWith("Exceeded max per wallet");
  });

  it("should be able to airdrop", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    const txAirdrop = await dropCollection.batchAirdrop(
      [1],
      [await accounts[1].getAddress()]
    );
    const txAirdropReceipt = await txAirdrop.wait();
    const transferEvent = txAirdropReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to withdraw", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, false);

    expect(await dropCollection.saleActive()).to.be.true;

    const txMint = await dropCollection.connect(accounts[1]).mint(1, {
      value: salesParam[3],
    });
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    expect(
      await dropCollection.provider.getBalance(dropCollection.address)
    ).to.be.eq(salesParam[3]);

    await dropCollection.withdraw();

    expect(
      await dropCollection.provider.getBalance(dropCollection.address)
    ).to.be.eq(0);

    const commissionAmount = await niftyKit.commission(
      dropCollection.address,
      salesParam[3]
    );
    expect(await niftyKit.provider.getBalance(niftyKit.address)).to.be.eq(
      commissionAmount
    );

    await niftyKit.withdraw(commissionAmount);

    expect(await niftyKit.provider.getBalance(niftyKit.address)).to.be.eq(0);
  });

  it("should tokenId start at 1", async function () {
    const dropCollection = await createDropCollection721(niftyKit, accounts[0]);

    expect(await dropCollection.saleActive()).to.be.false;

    await dropCollection.startSale(...salesParam, false);

    expect(await dropCollection.saleActive()).to.be.true;

    const txMint = await dropCollection.connect(accounts[1]).mint(1, {
      value: salesParam[3],
    });
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    expect(
      await dropCollection.provider.getBalance(dropCollection.address)
    ).to.be.eq(salesParam[3]);

    const tokenId = (transferEvent!.args![2] as BigNumber).toNumber();

    expect(tokenId).to.be.equal(1);
  });
});
