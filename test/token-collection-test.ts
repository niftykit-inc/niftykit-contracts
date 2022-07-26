import { ethers } from "hardhat";
import { Signer, ContractTransaction } from "ethers";
import { expect } from "chai";
import { solidityKeccak256 } from "ethers/lib/utils";
import { NiftyKitV2 } from "../typechain-types";
import { getMerkleTreeBasic } from "./utils/merkle-tree";
import { createTokenCollection, createNiftyKit } from "./utils/collections";

async function getCount(contract: ContractTransaction) {
  const tx = await contract.wait();
  const createdEvent = tx.events?.find(
    (event) => event.event === "RedeemableCreated"
  );
  return createdEvent?.args?.redeemableId;
}

describe("TokenCollection (Redeemables)", function () {
  let accounts: Signer[];
  let niftyKit: NiftyKitV2;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    niftyKit = await createNiftyKit(accounts[0]);
  });

  it("should be able to create a TokenCollection", async function () {
    await createTokenCollection(niftyKit, accounts[0]);
  });

  it("should be able to mint", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const txMint = await tokenCollection.mint(
      await accounts[0].getAddress(),
      1,
      "foo"
    );
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to mint sequentially", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const txMint = await tokenCollection.mint(
      await accounts[0].getAddress(),
      1,
      "foo"
    );
    const txMintReceipt = await txMint.wait();
    const transferEvent = txMintReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent?.args?.tokenId.toNumber()).to.equals(1);

    const txMint2 = await tokenCollection.mint(
      await accounts[0].getAddress(),
      1,
      "foo"
    );
    const txMintReceipt2 = await txMint2.wait();
    const transferEvent2 = txMintReceipt2.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent2?.args?.tokenId.toNumber()).to.equals(2);

    // let's burn 1
    await tokenCollection.burn(1);

    const txMint3 = await tokenCollection.mint(
      await accounts[0].getAddress(),
      1,
      "foo"
    );
    const txMintReceipt3 = await txMint3.wait();
    const transferEvent3 = txMintReceipt3.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent3?.args?.tokenId.toNumber()).to.equals(3);
  });

  it("should be able to create a redeemable", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      0,
      1,
      1,
      1
    );
    expect(redeemable.value.toString()).to.be.string("0");
  });

  it("should be able to create a few redeemables", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      0,
      1,
      1,
      1
    );
    const redeemableId = await getCount(redeemable);
    expect(redeemableId.toString()).to.be.string("0");

    const redeemable2 = await tokenCollection.createRedeemable(
      "foo",
      0,
      1,
      1,
      1
    );
    const redeemableId2 = await getCount(redeemable2);
    expect(redeemableId2.toString()).to.be.string("1");

    const redeemable3 = await tokenCollection.createRedeemable(
      "foo",
      0,
      1,
      1,
      1
    );
    const redeemableId3 = await getCount(redeemable3);
    expect(redeemableId3.toString()).to.be.string("2");
  });

  it("should be able to redeem a redeemable", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      0,
      1,
      1,
      1
    );
    const redeemableId = await getCount(redeemable);
    expect(redeemableId.toString()).to.be.string("0");
    expect((await tokenCollection.totalRedeemables()).toNumber()).to.be.eq(1);
    const redeemableObject = await tokenCollection.redeemableAt(0);

    // generate signature to be stored off chain
    const signature = await accounts[0].signMessage(
      ethers.utils.arrayify(
        solidityKeccak256(
          ["uint256"],
          [redeemableObject.nonce.add(redeemableId).toString()]
        )
      )
    );

    // redeem
    const txRedeem = await tokenCollection.redeem(
      redeemableId,
      1,
      signature,
      []
    );

    const txRedeemReceipt = await txRedeem.wait();
    const transferEvent = txRedeemReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to redeem a redeemable with presale", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      0,
      1,
      1,
      1
    );
    const redeemableId = await getCount(redeemable);
    expect(redeemableId.toString()).to.be.string("0");
    expect((await tokenCollection.totalRedeemables()).toNumber()).to.be.eq(1);
    const redeemableObject = await tokenCollection.redeemableAt(0);

    // generate signature to be stored off chain
    const signature = await accounts[0].signMessage(
      ethers.utils.arrayify(
        solidityKeccak256(
          ["uint256"],
          [redeemableObject.nonce.add(redeemableId).toString()]
        )
      )
    );

    const presaleList = [];
    for (const account of accounts) {
      // max per each wallet is 0
      presaleList.push(await account.getAddress());
    }

    const [merkleRoot, hexProof] = getMerkleTreeBasic(
      presaleList,
      presaleList[0] as string
    );

    await tokenCollection.setMerkleRoot(redeemableId, merkleRoot);

    // redeem
    const txRedeem = await tokenCollection.redeem(
      redeemableId,
      1,
      signature,
      hexProof
    );

    const txRedeemReceipt = await txRedeem.wait();
    const transferEvent = txRedeemReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to pay for a redeemable", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      ethers.utils.parseEther("0.01"),
      3,
      1,
      1
    );
    const redeemableId = await getCount(redeemable);
    expect(redeemableId.toString()).to.be.string("0");
    expect((await tokenCollection.totalRedeemables()).toNumber()).to.be.eq(1);
    const redeemableObject = await tokenCollection.redeemableAt(0);

    // generate signature
    const signature = await accounts[0].signMessage(
      ethers.utils.arrayify(
        solidityKeccak256(
          ["uint256"],
          [redeemableObject.nonce.add(redeemableId).toString()]
        )
      )
    );

    // redeem with wrong amount
    await expect(
      tokenCollection.redeem(redeemableId, 1, signature, [], {
        value: ethers.utils.parseEther("0.005"),
      })
    ).to.be.revertedWith("Value incorrect");

    // exceed max per mint
    await expect(
      tokenCollection.redeem(redeemableId, 3, signature, [], {
        value: ethers.utils.parseEther("0.03"),
      })
    ).to.be.revertedWith("Exceeded max per mint");

    // redeem
    const txRedeem = await tokenCollection.redeem(
      redeemableId,
      1,
      signature,
      [],
      {
        value: ethers.utils.parseEther("0.01"),
      }
    );

    // exceed max per wallet
    await expect(
      tokenCollection.redeem(redeemableId, 1, signature, [], {
        value: ethers.utils.parseEther("0.01"),
      })
    ).to.be.revertedWith("Exceeded max per wallet");

    const txRedeemReceipt = await txRedeem.wait();
    const transferEvent = txRedeemReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");
  });

  it("should be able to invalidate a redeemable", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      ethers.utils.parseEther("0.01"),
      2,
      2,
      2
    );
    const redeemableId = await getCount(redeemable);
    expect(redeemableId.toString()).to.be.string("0");
    expect((await tokenCollection.totalRedeemables()).toNumber()).to.be.eq(1);
    const redeemableObject = await tokenCollection.redeemableAt(0);

    // generate signature
    const signature = await accounts[0].signMessage(
      ethers.utils.arrayify(
        solidityKeccak256(
          ["uint256"],
          [redeemableObject.nonce.add(redeemableId).toString()]
        )
      )
    );

    // redeem
    const txRedeem = await tokenCollection.redeem(
      redeemableId,
      1,
      signature,
      [],
      {
        value: ethers.utils.parseEther("0.01"),
      }
    );

    // exceed max amount
    await expect(
      tokenCollection.redeem(redeemableId, 2, signature, [], {
        value: ethers.utils.parseEther("0.02"),
      })
    ).to.be.revertedWith("Exceeded max amount");

    const txRedeemReceipt = await txRedeem.wait();
    const transferEvent = txRedeemReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    // invalidate
    await tokenCollection.invalidate(redeemableId);

    await expect(
      tokenCollection.redeem(redeemableId, 1, signature, [], {
        value: ethers.utils.parseEther("0.01"),
      })
    ).to.be.revertedWith("Invalid signature");
  });

  it("should be able to revoke a redeemable", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    const redeemable = await tokenCollection.createRedeemable(
      "foo",
      ethers.utils.parseEther("0.01"),
      2,
      2,
      2
    );
    const redeemableId = await getCount(redeemable);
    expect(redeemableId.toString()).to.be.string("0");
    expect((await tokenCollection.totalRedeemables()).toNumber()).to.be.eq(1);
    const redeemableObject = await tokenCollection.redeemableAt(0);

    // generate signature
    const signature = await accounts[0].signMessage(
      ethers.utils.arrayify(
        solidityKeccak256(
          ["uint256"],
          [redeemableObject.nonce.add(redeemableId).toString()]
        )
      )
    );

    // redeem
    const txRedeem = await tokenCollection.redeem(
      redeemableId,
      1,
      signature,
      [],
      {
        value: ethers.utils.parseEther("0.01"),
      }
    );

    const txRedeemReceipt = await txRedeem.wait();
    const transferEvent = txRedeemReceipt.events?.find(
      (event) => event.event === "Transfer"
    );

    expect(transferEvent).to.be.a("object");

    // invalidate
    await tokenCollection.revoke(redeemableId);

    // already invalidated cannot be revoked again
    await expect(tokenCollection.revoke(redeemableId)).to.be.revertedWith(
      "Not active"
    );

    await expect(tokenCollection.invalidate(redeemableId)).to.be.revertedWith(
      "Not active"
    );

    await expect(
      tokenCollection.redeem(redeemableId, 1, signature, [], {
        value: ethers.utils.parseEther("0.01"),
      })
    ).to.be.revertedWith("Not active");
  });
});
