import { HardhatRuntimeEnvironment } from "hardhat/types";
import { NiftyKitV2__factory } from "../typechain-types";

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
};

export default deployFn;

deployFn.tags = ["NiftyKitNiftyKitImplementation"];
