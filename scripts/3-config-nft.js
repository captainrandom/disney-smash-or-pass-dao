import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working.
if (!process.env.MEMBERSHIP_CONTRACT_ADDR || process.env.MEMBERSHIP_CONTRACT_ADDR === "") {
  console.log("🛑 MEMBERSHIP_CONTRACT_ADDR not found.");
}

const editionDrop = sdk.getEditionDrop(process.env.MEMBERSHIP_CONTRACT_ADDR);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Jasmine putting on the moves",
        description: "This NFT will give you access to DisneySmashOrPassDAO",
        image: readFileSync("scripts/disney_characters/jasmine_membership.gif"),
      },
    ]);
    console.log("Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
