import fs from "fs";
import { getImplementationAddress } from "@openzeppelin/upgrades-core";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { NiftyKitV2__factory } from "../typechain-types";
import { TokenCollection__factory as TokenCollection_factory } from "../typechain-types/factories/contracts/erc721";
import { DropCollection__factory as DropCollection721_factory } from "../typechain-types/factories/contracts/erc721";
import { DropCollection__factory as DropCollection721a_factory } from "../typechain-types/factories/contracts/erc721a";

const IMPLEMENTATIONS = {
  1: TokenCollection_factory,
  2: DropCollection721_factory,
  3: DropCollection721a_factory,
};

function saveArtifacts(
  contractsPath: string,
  contractAddress: string,
  network: string
) {
  if (!fs.existsSync(contractsPath)) {
    fs.mkdirSync(contractsPath);
  }

  fs.writeFileSync(
    `${contractsPath}/NiftyKit-${network}.json`,
    JSON.stringify(
      {
        address: contractAddress,
      },
      undefined,
      2
    )
  );

  fs.copyFileSync(
    `${__dirname}/../artifacts/contracts/erc721/TokenCollection.sol/TokenCollection.json`,
    `${contractsPath}/TokenCollection-erc721.json`
  );

  fs.copyFileSync(
    `${__dirname}/../artifacts/contracts/erc721/DropCollection.sol/DropCollection.json`,
    `${contractsPath}/DropCollection-erc721.json`
  );

  fs.copyFileSync(
    `${__dirname}/../artifacts/contracts/erc721a/DropCollection.sol/DropCollection.json`,
    `${contractsPath}/DropCollection-erc721a.json`
  );
}

const deployFn = async function (hre: HardhatRuntimeEnvironment) {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying the contracts with the account: ", deployerAddress);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  // Deploy NiftyKit
  console.log("Deploying NiftyKit...");
  const NiftyKit = new NiftyKitV2__factory(deployer);
  const proxy = await hre.upgrades.deployProxy(NiftyKit, []);
  console.log("TX: ", proxy.deployTransaction.hash);
  await proxy.deployed();
  const niftyKitResults = await hre.ethers.provider.waitForTransaction(
    proxy.deployTransaction.hash
  );
  console.log("NiftyKit address: ", niftyKitResults.contractAddress);
  console.log("Waiting for verification...");
  const implementation = await getImplementationAddress(
    hre.ethers.provider,
    niftyKitResults.contractAddress
  );
  await proxy.deployTransaction.wait(5);
  try {
    console.log("verifying NiftyKit...");
    await hre.run("verify:verify", {
      address: implementation,
      constructorArguments: [],
    });
  } catch (err) {
    console.log("error while verifying", err);
  }

  saveArtifacts(
    `${__dirname}/../../../app/contracts/v5`,
    niftyKitResults.contractAddress,
    hre.network.name
  );

  const niftyKit = NiftyKitV2__factory.connect(
    niftyKitResults.contractAddress,
    deployer
  );

  console.log("Deploying implementations...");
  for await (const [implementationId, CollectionFactory] of Object.entries(
    IMPLEMENTATIONS
  )) {
    console.log("Deploying... ", implementationId);
    const factory = new CollectionFactory(deployer);
    const collection = await factory.deploy();
    console.log("TX: ", collection.deployTransaction.hash);
    const results = await hre.ethers.provider.waitForTransaction(
      collection.deployTransaction.hash
    );
    console.log("Implementation address: ", results.contractAddress);
    await collection.deployTransaction.wait(5);

    try {
      console.log("verifying Implementation...");
      await hre.run("verify:verify", {
        address: results.contractAddress,
        constructorArguments: [],
      });
    } catch (err) {
      console.log("error while verifying", err);
    }

    console.log("Setting implementation on NiftyKit...");
    const tx = await niftyKit.setImplementation(
      implementationId,
      results.contractAddress
    );
    await tx.wait(1);
    console.log("Implementation set! ID: ", implementationId);
  }
};

export default deployFn;

deployFn.tags = ["NiftyKit"];
