import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.VOTING_CONTRACT_ADDRESS || process.env.VOTING_CONTRACT_ADDRESS === "") {
  console.log("🛑 VOTING_CONTRACT_ADDRESS not found.");
}

if (!process.env.GOVERNANCE_TOKEN_ADDR || process.env.GOVERNANCE_TOKEN_ADDR === "") {
  console.log("🛑 GOVERNANCE_TOKEN_ADDR not found.");
}

// This is our governance contract.
const vote = sdk.getVote(process.env.VOTING_CONTRACT_ADDRESS);

// This is our ERC-20 contract.
const token = sdk.getToken(process.env.GOVERNANCE_TOKEN_ADDR);

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());

    console.log("Successfull gave vote contract permissions to act on token contract");
  } catch (error) {
    console.error("failed to grant vote contract permissions on token contract", error);
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    await token.transfer(
      vote.getAddress(),
      percent90
    );

    console.log("Successfully transferred " + percent90 + " tokens to vote contract");
  } catch (error) {
    console.error("failed to transfer tokens to vote contract", error);
  }
})();