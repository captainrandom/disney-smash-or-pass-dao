// deploy/00_deploy_your_contract.js

const {ethers} = require("hardhat");

module.exports = async ({getNamedAccounts, getChainId, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await getChainId();

    let proxyRegistryAddress;
    if (chainId === 'rinkeby') {
        proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    } else {
        proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    }


    await deploy("DisneySmashOrPass", {
        // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
        args: [
            proxyRegistryAddress,
            "https://gateway.pinata.cloud/ipfs/QmUi6PqRnQKAN6cYpqFTUeEr8F3UXT2p35W8MPBDwCWUnH/index.html?tokenId=",
            "1267650600228229401496703205375",
        ],
        from: deployer,
        log: true,
    });
};
module.exports.tags = ["DisneySmashOrPass"];
