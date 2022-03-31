import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "DisneySmashOrPassDAO Membership",
      description: "A DAO that generates an nft when 'voting' for who you'd smash or pass, disney characters edition",
      image: readFileSync("scripts/assets/jasmine_membership.gif"),
      primary_sale_recipient: AddressZero,
    });

    const editionDrop = sdk.getEditionDrop(editionDropAddress);
    const metadata = await editionDrop.metadata.get();

    console.log(
      "Successfully deployed editionDrop contract, address:",
      editionDropAddress,
    );
    console.log("editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();