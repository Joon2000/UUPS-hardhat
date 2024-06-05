import { ethers, upgrades } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  const UupsProxyPatternV1 = await ethers.getContractFactory(
    "UupsProxyPatternV1"
  );
  console.log("Contract factory for V1 obtained.");

  const uupsProxyPatternV1 = await upgrades.deployProxy(
    UupsProxyPatternV1,
    [],
    { kind: "uups", unsafeAllow: ["constructor"] }
  );
  console.log("Deploying Proxy for UUPS Proxy Pattern V1...");
  await uupsProxyPatternV1.waitForDeployment();
  console.log("UUPS Proxy Pattern V1 deployed.");

  const uupsProxyPatternV1Address = await uupsProxyPatternV1.getAddress();
  console.log(
    `UUPS Proxy Pattern V1 is deployed to proxy address: ${uupsProxyPatternV1Address}`
  );

  let versionAwareContractName =
    await uupsProxyPatternV1.getContractNameWithVersion();
  console.log(`UUPS Pattern and Version: ${versionAwareContractName}`);

  const UupsProxyPatternV2 = await ethers.getContractFactory(
    "UupsProxyPatternV2"
  );
  console.log("Contract factory for V2 obtained.");

  const upgraded = await upgrades.upgradeProxy(
    uupsProxyPatternV1Address,
    UupsProxyPatternV2,
    { kind: "uups", unsafeAllow: ["constructor"], call: "initialize" }
  );
  console.log("Upgrading Proxy to UUPS Proxy Pattern V2...");
  await upgraded.waitForDeployment();
  console.log("UUPS Proxy Pattern V2 deployed.");

  const upgradedAddress = await upgraded.getAddress();
  console.log(
    `UUPS Proxy Pattern V2 is upgraded in proxy address: ${upgradedAddress}`
  );

  versionAwareContractName = await upgraded.getContractNameWithVersion();
  console.log(`UUPS Pattern and Version: ${versionAwareContractName}`);
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
  console.error("Error in script execution:", error);
  process.exitCode = 1;
});
