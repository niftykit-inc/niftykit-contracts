import { upgrades } from "hardhat";

async function main() {
  const gnosisSafe = "0x9e90CeAA29B97d5705aF9Df1Fe7863f8fF7bA70b";

  console.log("Transferring ownership of ProxyAdmin...");

  // The owner of the ProxyAdmin can upgrade our contracts
  await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);

  // 0x7bE941FbF8C1B2acA38818EcBBef6cCBB5c975D9
  console.log("Transferred ownership of ProxyAdmin to:", gnosisSafe);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
