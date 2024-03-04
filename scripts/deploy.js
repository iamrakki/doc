const hre = require("hardhat");
async function main() {
  const Institutes = await hre.ethers.getContractFactory("Institutes");
  const institutes = await Institutes.deploy();

  await institutes.waitForDeployment();

  const address = institutes.address;

  console.log("Institutes deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});