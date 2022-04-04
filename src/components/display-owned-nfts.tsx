import {Col, Row} from "react-bootstrap";
import {EditionDrop} from "@thirdweb-dev/sdk";
import {useEffect, useState} from "react";

interface DisplayOnedNFTs {
    contract: EditionDrop | undefined
    address: string
}

const DisplayOwnedNfts = (props: DisplayOnedNFTs) => {
    const [nftImgs, setNftImgs] = useState(new Array<Element>())
    useEffect(() => {
        (async () => {
            const metadataArr = await props.contract?.getOwned(props.address)
            console.log('metadataArr', metadataArr)
            if(metadataArr) {
                const newImgElements = metadataArr.map((nftData) => {
                    return <Col>
                        <img src={nftData.metadata?.image}/>
                    </Col>
                })
                setNftImgs(newImgElements)
            }
        })()
    }, [props.contract, props.address]);

    return (
        <div>
            {nftImgs}
        </div>
    );
}

export default DisplayOwnedNfts;