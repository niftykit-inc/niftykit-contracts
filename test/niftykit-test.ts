import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
import { NiftyKitV2 } from "../typechain-types";
import { createNiftyKit } from "./utils/collections";

const collectionParam = ["Foo", "FOO"] as const;

describe("NiftyKit (proxy)", function () {
  let accounts: Signer[];
  let niftyKit: NiftyKitV2;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    niftyKit = await createNiftyKit(accounts[0]);
  });

  it("should be able to initialize", async function () {
    const nkFactory = await ethers.getContractFactory("NiftyKitV2");
    const nkInstance = await nkFactory.deploy();
    nkInstance.initialize();
  });

  it("should be able to create a TokenCollection", async function () {
    const txCollection = await niftyKit.createCollection(
      1,
      ...collectionParam,
      await accounts[0].getAddress(),
      await accounts[0].getAddress(),
      500 // 5%
    );
    const txCollectionReceipt = await txCollection.wait();
    const createdEvent = txCollectionReceipt.events?.find(
      (event) => event.event === "CollectionCreated"
    );
    const collectionAddress = createdEvent?.args?.collectionAddress;
    expect(collectionAddress).to.be.a("string");
  });

  it("should be able to create a DropCollection (721)", async function () {
    const txCollection = await niftyKit.createCollection(
      2,
      ...collectionParam,
      await accounts[0].getAddress(),
      await accounts[0].getAddress(),
      500 // 5%
    );
    const txCollectionReceipt = await txCollection.wait();
    const createdEvent = txCollectionReceipt.events?.find(
      (event) => event.event === "CollectionCreated"
    );
    const collectionAddress = createdEvent?.args?.collectionAddress;
    expect(collectionAddress).to.be.a("string");
  });

  it("should be able to create a DropCollection (721A)", async function () {
    const txCollection = await niftyKit.createCollection(
      3,
      ...collectionParam,
      await accounts[0].getAddress(),
      await accounts[0].getAddress(),
      500 // 5%
    );
    const txCollectionReceipt = await txCollection.wait();
    const createdEvent = txCollectionReceipt.events?.find(
      (event) => event.event === "CollectionCreated"
    );
    const collectionAddress = createdEvent?.args?.collectionAddress;
    expect(collectionAddress).to.be.a("string");
  });
});
