import {EditionMetadataOwner} from "@thirdweb-dev/sdk/dist/schema/tokens/edition";
import {Col} from "react-bootstrap";

interface NFTDisplayProps {
    nftData: EditionMetadataOwner
}

const NFTDisplay = (props: NFTDisplayProps) => {
    const displayElement = ((nftData: EditionMetadataOwner) => {
        if (nftData.metadata.animation_url) {
            return <iframe src={nftData.metadata.animation_url}/>
        } else if (nftData.metadata.image) {
            return <img src={nftData.metadata.image}/>
        }
    })(props.nftData)
    return (
        <Col>
            {displayElement}
        </Col>
    )
}

export default NFTDisplay;