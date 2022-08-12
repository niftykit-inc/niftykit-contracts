import { ethers } from "hardhat";
import { NiftyKitV2__factory } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const proxyAddress = "0xc11c2EefD856a2A18eB9Aaa9a3C5A359e4d49184";
  const gnosisSafe = "0x7139eE4CF8e055E7466dbb27B3669aeDBe713ADe";
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
