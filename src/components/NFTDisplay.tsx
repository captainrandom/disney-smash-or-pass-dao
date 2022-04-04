import {EditionMetadataOwner} from "@thirdweb-dev/sdk/dist/schema/tokens/edition";
import {Col, Figure} from "react-bootstrap";

interface NFTDisplayProps {
    nftData: EditionMetadataOwner
}

const NFTDisplay = (props: NFTDisplayProps) => {
    const displayElement = ((nftData: EditionMetadataOwner) => {
        // if (nftData.metadata.animation_url) {
        //     return <iframe src={nftData.metadata.animation_url}/>
        // }
        if (nftData.metadata.image) {
            return <Figure><img src={nftData.metadata.image}/></Figure>
        }
    })(props.nftData)
    return (
        <div>{displayElement}</div>
    )
}

export default NFTDisplay;