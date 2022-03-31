import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";
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
    const amount = 420_000;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          "mintTo", [
            vote.getAddress(),
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
      }
    ];
    
    await vote.propose(description, executions);
    console.log("Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 6_900;
    const description = "Should the DAO transfer " + amount + " tokens from the treasury to " + process.env.WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          "transfer", [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
      }
    ];

    await vote.propose(description, executions);
    console.log("Successsfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
  } catch (error) {
    console.error("failed to create the second proposal", error);
  }
})();