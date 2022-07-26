import { ethers } from "hardhat";
import { Signer, ContractTransaction } from "ethers";
import { expect } from "chai";
import { solidityKeccak256 } from "ethers/lib/utils";
import { NiftyKitV2 } from "../typechain-types";
import { createTokenCollection, createNiftyKit } from "./utils/collections";

async function getCount(contract: ContractTransaction) {
  const tx = await contract.wait();
  const createdEvent = tx.events?.find(
    (event) => event.event === "RedeemableCreated"
  );
  return createdEvent?.args?.redeemableId;
}

describe("BaseCollection", function () {
  let accounts: Signer[];
  let niftyKit: NiftyKitV2;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    niftyKit = await createNiftyKit(accounts[0]);
  });

  it("should be able set a new treasury", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    expect(await tokenCollection.treasury()).to.be.equal(
      await accounts[0].getAddress(),
      "Invalid treasury address"
    );
    await tokenCollection.setTreasury(await accounts[1].getAddress());
    expect(await tokenCollection.treasury()).to.be.equal(
      await accounts[1].getAddress(),
      "Invalid treasury address"
    );
  });

  it("should be able set default royalty registry", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    await tokenCollection.setDefaultRoyalty(
      await accounts[1].getAddress(),
      500
    );
  });

  it("should be able set token royalty registry", async function () {
    const tokenCollection = await createTokenCollection(niftyKit, accounts[0]);

    await tokenCollection.setTokenRoyalty(
      1,
      await accounts[1].getAddress(),
      500
    );
  });

  it("should be able to withdraw", async function () {
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

    // try to withdraw with no money in it
    await expect(tokenCollection.withdraw()).to.be.revertedWith("0 balance");

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

    expect(
      await tokenCollection.provider.getBalance(tokenCollection.address)
    ).to.be.eq(ethers.utils.parseEther("0.01"));

    await tokenCollection.withdraw();

    expect(
      await tokenCollection.provider.getBalance(tokenCollection.address)
    ).to.be.eq(0);

    const commissionAmount = await niftyKit.commission(
      tokenCollection.address,
      ethers.utils.parseEther("0.01")
    );
    expect(await niftyKit.provider.getBalance(niftyKit.address)).to.be.eq(
      commissionAmount
    );

    await niftyKit.withdraw(commissionAmount);

    expect(await niftyKit.provider.getBalance(niftyKit.address)).to.be.eq(0);

    expect(await tokenCollection.totalRevenue()).to.equal(
      ethers.utils.parseEther("0.01")
    );
  });
});
