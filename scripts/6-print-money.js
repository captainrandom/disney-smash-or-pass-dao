import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOVERNANCE_TOKEN_ADDR || process.env.GOVERNANCE_TOKEN_ADDR === "") {
  console.log("🛑 GOVERNANCE_TOKEN_ADDR not found.");
}
const token = sdk.getToken(process.env.GOVERNANCE_TOKEN_ADDR);

(async () => {
  try {
    const amount = 1_000_000;
    await token.mint(amount);
    const totalSupply = await token.totalSupply();
    console.log("there now is", totalSupply.displayValue, "$DSmash in circulation");
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();