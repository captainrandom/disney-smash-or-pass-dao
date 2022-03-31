import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MEMBERSHIP_CONTRACT_ADDR || process.env.MEMBERSHIP_CONTRACT_ADDR === "") {
  console.log("🛑 MEMBERSHIP_CONTRACT_ADDR not found.");
}
if (!process.env.GOVERNANCE_TOKEN_ADDR || process.env.GOVERNANCE_TOKEN_ADDR === "") {
  console.log("🛑 GOVERNANCE_TOKEN_ADDR not found.");
}

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop(process.env.MEMBERSHIP_CONTRACT_ADDR);

// This is the address to our ERC-20 token contract.
console.log("process.env.GOVERNANCE_TOKEN_ADDR", process.env.GOVERNANCE_TOKEN_ADDR);
const token = sdk.getToken(process.env.GOVERNANCE_TOKEN_ADDR);

(async () => {
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length == 0) {
      console.log("no NFTs have been claimed yet, maybe get some friends to claim your free NFTs!");
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
      return airdropTarget;
    });

    console.log("starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("Successfully airdropped tokens to all the holders of the NFT!");
  } catch (error) {
    console.error("Failed to airdrop tokens", error);
  }
})();