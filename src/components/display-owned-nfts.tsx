import {Col, Row} from "react-bootstrap";
import {EditionDrop} from "@thirdweb-dev/sdk";
import {ReactElement, useEffect, useState} from "react";
import {EditionMetadataOwner} from "@thirdweb-dev/sdk/dist/schema/tokens/edition";
import NFTDisplay from "./NFTDisplay";

interface DisplayOnedNFTs {
    contract: EditionDrop | undefined
    address: string
}

const DisplayOwnedNfts = (props: DisplayOnedNFTs) => {
    const [nftImgs, setNftImgs] = useState(new Array<ReactElement>())
    useEffect(() => {
        (async () => {
            const metadataArr = await props.contract?.getOwned(props.address)
            console.log('metadataArr', metadataArr)
            if (metadataArr) {
                const newImgElements = metadataArr.map((nftData) => {
                    return <NFTDisplay nftData={nftData}/>
                })
                setNftImgs(newImgElements)
            }
        })()
    }, [props.contract, props.address]);

    return (
        <div>
            <Row><h2>Owned NFTs</h2></Row>
            {nftImgs}
        </div>
    );
}

export default DisplayOwnedNfts;