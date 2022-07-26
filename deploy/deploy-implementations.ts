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

const deployFn = async function (hre: HardhatRuntimeEnvironment) {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying the contracts with the account: ", deployerAddress);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  console.log("Deploying NiftyKit implementation...");
  const NiftyKit = new NiftyKitV2__factory(deployer);
  const niftyKit = await NiftyKit.deploy();
  console.log("TX: ", niftyKit.deployTransaction.hash);
  const results = await hre.ethers.provider.waitForTransaction(
    niftyKit.deployTransaction.hash
  );
  console.log("Implementation address: ", results.contractAddress);
  await niftyKit.deployTransaction.wait(5);

  try {
    console.log("verifying Implementation...");
    await hre.run("verify:verify", {
      address: results.contractAddress,
      constructorArguments: [],
    });
  } catch (err) {
    console.log("error while verifying", err);
  }

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
  }
};

export default deployFn;

deployFn.tags = ["NiftyKitImplementations"];
