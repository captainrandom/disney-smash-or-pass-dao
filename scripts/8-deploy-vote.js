import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOVERNANCE_TOKEN_ADDR || process.env.GOVERNANCE_TOKEN_ADDR === "") {
  console.log("🛑 GOVERNANCE_TOKEN_ADDR not found.");
}

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "Disney Smash or Pass Dao",
      voting_token_address: process.env.GOVERNANCE_TOKEN_ADDR,
      voting_delay_in_blocks: 0,
      voting_period_in_blocks: 6570,
      voting_quorum_fraction: 0,
      proposal_token_threshold: 0,
    });

    console.log(
      "Successfully deployed vote contract, address:",
      voteContractAddress
    );
  } catch (err) {
    console.error("Failed to deploy vote contract", err);
  }
})();