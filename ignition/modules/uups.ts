import { ethers, upgrades } from "hardhat";

async function main() {
  const UupsProxyPatternV1 = await ethers.getContractFactory(
    "UupsProxyPatternV1"
  );
  const uupsProxyPatternV1 = await upgrades.deployProxy(
    UupsProxyPatternV1,
    [],
    { kind: "uups", unsafeAllow: ["constructor"] }
  );
  await uupsProxyPatternV1.deployed();

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
  const upgraded = await upgrades.upgradeProxy(
    uupsProxyPatternV1Address,
    UupsProxyPatternV2,
    { kind: "uups", unsafeAllow: ["constructor"], call: "initialize" }
  );
  await upgraded.deployed();

  const upgradedAddress = await upgraded.getAddress();
  console.log(
    `UUPS Proxy Pattern V2 is upgraded in proxy address: ${upgradedAddress}`
  );

  versionAwareContractName = await upgraded.getContractNameWithVersion();
  console.log(`UUPS Pattern and Version: ${versionAwareContractName}`);
}

main().catch;
