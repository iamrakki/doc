require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "^0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: "https://rpc.ankr.com/eth_sepolia",
      accounts: ["0xaae6757d640c565936fef7fb0aa53e9be9e397428406a35ec0008401d7a70c8d"],
    }
  },
  paths: {
    artifacts: "./artifacts",
  },
};
