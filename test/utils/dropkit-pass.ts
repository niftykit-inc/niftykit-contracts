import { upgrades } from "hardhat";
import { Signer } from "ethers";
import { DropKitPass } from "../../typechain-types";
import { DropKitPass__factory } from "../../typechain-types";

export async function createDropKitPass(signer: Signer) {
  const factory = new DropKitPass__factory(signer);
  const dropKitPass = await upgrades.deployProxy(factory, [
    "DropKitPass",
    "DKP",
    await signer.getAddress(),
    await signer.getAddress(),
    500,
  ]);
  await dropKitPass.deployed();
  return dropKitPass as DropKitPass;
}
