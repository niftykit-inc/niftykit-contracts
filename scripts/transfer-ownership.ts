import { ethers } from "hardhat";
import { NiftyKitV2__factory } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const proxyAddress = "0x775ecEf1c70ed299E37006f6820D6252b0E90BD6";
  const gnosisSafe = "0x9e90CeAA29B97d5705aF9Df1Fe7863f8fF7bA70b";
  const niftyKit = NiftyKitV2__factory.connect(proxyAddress, deployer);

  console.log("Transferring ownership of NiftyKitV2...");

  await niftyKit.transferOwnership(gnosisSafe);
  console.log("Transferred ownership of NiftyKitV2 to: ", gnosisSafe);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
