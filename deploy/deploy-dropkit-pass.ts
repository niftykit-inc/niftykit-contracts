import { getImplementationAddress } from "@openzeppelin/upgrades-core";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DropKitPass__factory } from "../typechain-types";

const deployDropKitPassFn = async function (hre: HardhatRuntimeEnvironment) {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying DropKitPass with the account: ", deployerAddress);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  console.log("Deploying DropKitPass...");
  const factory = new DropKitPass__factory(deployer);
  const dropKitPass = await hre.upgrades.deployProxy(factory, [
    "DropKitPass",
    "DKP",
    deployerAddress,
    deployerAddress,
    500,
    500,
  ]);
  console.log("TX: ", dropKitPass.deployTransaction.hash);
  await dropKitPass.deployed();

  const dropKitPassResults = await hre.ethers.provider.waitForTransaction(
    dropKitPass.deployTransaction.hash
  );

  console.log("DropKitPass address: ", dropKitPassResults.contractAddress);
  console.log("Waiting for verification...");

  const implementation = await getImplementationAddress(
    hre.ethers.provider,
    dropKitPassResults.contractAddress
  );
  await dropKitPass.deployTransaction.wait(5);
  try {
    console.log("verifying DropKitPass...");
    await hre.run("verify:verify", {
      address: implementation,
      constructorArguments: [],
    });
  } catch (err) {
    console.log("error while verifying", err);
  }
};

export default deployDropKitPassFn;

deployDropKitPassFn.tags = ["DropKitPass"];
