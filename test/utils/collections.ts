import { upgrades } from "hardhat";
import { ethers, Signer } from "ethers";
import { expect } from "chai";
import { NiftyKitV2, NiftyKitV2__factory } from "../../typechain-types";
import { TokenCollection__factory as TokenCollection_factory } from "../../typechain-types/factories/contracts/erc721";
import { DropCollection__factory as DropCollection721_factory } from "../../typechain-types/factories/contracts/erc721";
import { DropCollection__factory as DropCollection721a_factory } from "../../typechain-types/factories/contracts/erc721a";

const collectionParam = ["Foo", "FOO"] as const;

const IMPLEMENTATIONS = {
  1: TokenCollection_factory,
  2: DropCollection721_factory,
  3: DropCollection721a_factory,
};

export const hashAccount = (address: string, allowed: number) => {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [address, allowed])
      .slice(2),
    "hex"
  );
};

export async function createNiftyKit(signer: Signer) {
  const niftyKitFactory = new NiftyKitV2__factory(signer);
  const proxy = await upgrades.deployProxy(niftyKitFactory, {
    initializer: "initialize",
  });
  const niftyKit = proxy as NiftyKitV2;

  for await (const [implementationId, CollectionFactory] of Object.entries(
    IMPLEMENTATIONS
  )) {
    const factory = new CollectionFactory(signer);
    const collection = await factory.deploy();
    await collection.initialize(
      "foo",
      "bar",
      await signer.getAddress(),
      await signer.getAddress(),
      500
    );
    await niftyKit.setImplementation(implementationId, collection.address);
  }

  return niftyKit;
}

export async function createTokenCollection(
  niftyKit: NiftyKitV2,
  signer: Signer
) {
  const txCollection = await niftyKit.createCollection(
    1,
    ...collectionParam,
    await signer.getAddress(),
    await signer.getAddress(),
    500 // 5%
  );
  const txCollectionReceipt = await txCollection.wait();
  const createdEvent = txCollectionReceipt.events?.find(
    (event) => event.event === "CollectionCreated"
  );
  const collectionAddress = createdEvent?.args?.collectionAddress;
  expect(collectionAddress).to.be.a("string");

  return new TokenCollection_factory(signer).attach(collectionAddress);
}

export async function createDropCollection721(
  niftyKit: NiftyKitV2,
  signer: Signer
) {
  const txCollection = await niftyKit.createCollection(
    2,
    ...collectionParam,
    await signer.getAddress(),
    await signer.getAddress(),
    500 // 5%
  );
  const txCollectionReceipt = await txCollection.wait();
  const createdEvent = txCollectionReceipt.events?.find(
    (event) => event.event === "CollectionCreated"
  );
  const collectionAddress = createdEvent?.args?.collectionAddress;
  expect(collectionAddress).to.be.a("string");

  return new DropCollection721_factory(signer).attach(collectionAddress);
}

export async function createDropCollection721a(
  niftyKit: NiftyKitV2,
  signer: Signer
) {
  const txCollection = await niftyKit.createCollection(
    3,
    ...collectionParam,
    await signer.getAddress(),
    await signer.getAddress(),
    500 // 5%
  );
  const txCollectionReceipt = await txCollection.wait();
  const createdEvent = txCollectionReceipt.events?.find(
    (event) => event.event === "CollectionCreated"
  );
  const collectionAddress = createdEvent?.args?.collectionAddress;
  expect(collectionAddress).to.be.a("string");

  return new DropCollection721a_factory(signer).attach(collectionAddress);
}
