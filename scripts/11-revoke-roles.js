import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOVERNANCE_TOKEN_ADDR || process.env.GOVERNANCE_TOKEN_ADDR === "") {
  console.log("🛑 GOVERNANCE_TOKEN_ADDR not found.");
}

const token = sdk.getToken(process.env.GOVERNANCE_TOKEN_ADDR);

(async () => {
  try {
    const allRoles = await token.roles.getAll();
    console.log("Roles that exist right now:", allRoles);

    await token.roles.setAll({ admin: [], minter: ["0x8b20F39D3356c10f678B2b1e1adb07f2D1127B58"] });
    console.log(
      "Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log("Successfully revoked our superpowers from the ERC-20 contract");
  } catch (error) {
    console.error("Failed to revoke oursleve from the DAO treasury", error);
  }
})();