import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working.
if (!process.env.MEMBERSHIP_CONTRACT_ADDR || process.env.MEMBERSHIP_CONTRACT_ADDR === "") {
  console.log("🛑 MEMBERSHIP_CONTRACT_ADDR not found.");
}

const editionDrop = sdk.getEditionDrop(process.env.MEMBERSHIP_CONTRACT_ADDR);

(async () => {
  try {
    const claimConditions = [{
      startTime: new Date(),
      // maxQuantity: 50_000,
      price: 0,
      quantityLimitPerTransaction: 1,
      waitInSecons: MaxUint256,
    }];
    
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();