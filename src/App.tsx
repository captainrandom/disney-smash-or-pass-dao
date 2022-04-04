import {useAddress, useEditionDrop, useMetamask} from '@thirdweb-dev/react';
import {useEffect, useState} from 'react';
import disneyCharacters from "./constants";
import {Button, Container} from "react-bootstrap";
import {TokenConverter} from "./utils/token-converter";
import {ImageUrl} from "./models/imageUrl";
import {GifCreator} from "./utils/gif-creator";
import SmashOrPassChooser from "./components/smash-or-pass-chooser";
import DisplayOwnedNfts from "./components/display-owned-nfts";
import {Buffer} from 'buffer';
import {BigNumber} from "ethers";
import {MaxUint256} from "@ethersproject/constants";

const App = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    console.log('address:', address);

    const editionDrop = useEditionDrop("0x5881a8beEBf66f8bEbd17Ec56AD831a2B25f15dd");
    const [numNewlyClaimedNFTs, setNumNewlyClaimedNFTs] = useState(0)

    const shortenAddress = (addr: string) => {
        return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
    };

    const claimNFT = async (tokenId: BigNumber): Promise<boolean> => {
        if (!editionDrop) {
            console.error("NFT contract is null!")
            return false;
        }

        try {
            console.log('claiming token id', tokenId)
            await editionDrop.claim(tokenId, 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/${tokenId}`);
            return true;
        } catch (error) {
            console.error("Failed to claim NFT", error);
            return false;
        }
    }

    const mintNft = async (tokenId: string, images: ImageUrl[]): Promise<BigNumber| undefined> => {
        if (!editionDrop) {
            console.error("NFT contract is null!")
            return;
        }

        const gifDataUrl = await GifCreator.createGif(images);
        try {
            const response = await editionDrop.createBatch([{
                name: `DSM#${tokenId}`,
                description: "Disney Smash or Pass containing only smash characters",
                image: gifDataUrl,
                animation_url:`https://gateway.pinata.cloud/ipfs/QmUi6PqRnQKAN6cYpqFTUeEr8F3UXT2p35W8MPBDwCWUnH/index.html?tokenId=${tokenId}`,
            }])

            const claimConditions = [{
                startTime: new Date(),
                // maxQuantity: 50_000,
                price: 0,
                quantityLimitPerTransaction: 1,
                waitInSecons: MaxUint256,
            }];

            await editionDrop.claimConditions.set(response[0].id, claimConditions);

            console.log('sucessfully created batch', response)
            return response[0].id;
        } catch (error) {
            console.error("failed to create the new NFT", error);
        }
    }

    const mintAndOwnNft = async (tokenId: string, images: ImageUrl[]): Promise<boolean> => {
        if (!editionDrop) {
            console.error("NFT contract is null!")
            return false;
        }
        // const claimState = await claimNFT(tokenId)
        const actualTokenId = await mintNft(tokenId, images);
        if (actualTokenId) {
            const state = await claimNFT(actualTokenId)
            if (state) {
                setNumNewlyClaimedNFTs(numNewlyClaimedNFTs+1)
            }
            return state
        } else {
            return false;
        }

        // if(!claimState) {
        //
        // } else {
        //     return claimState;
        // }
    };

    const fullImageList = disneyCharacters.allCharacters;
    const doneCallaback = async (chosenImages: ImageUrl[]): Promise<boolean> => {
        const tokenConverter = new TokenConverter();
        const tokenId = tokenConverter.getTokenId(chosenImages, fullImageList);
        console.log('token id:', tokenId)
        return mintAndOwnNft(tokenId, chosenImages);
    }

    const connectWalletOrNormalDisplay = ((address) => {
        if (address) {
            return (<div>
                <SmashOrPassChooser doneCallback={doneCallaback} images={fullImageList}/>
                <DisplayOwnedNfts contract={editionDrop} address={address} numNewlyClaimedNFTs={numNewlyClaimedNFTs}/>
            </div>)
        } else {
            return <Button variant="dark" onClick={connectWithMetamask}>
                Connect your wallet
            </Button>
        }
    })(address)

    return (
        <Container>
            <div className="landing">
                <h1>Welcome to Disney Smash or Pass</h1>
                {connectWalletOrNormalDisplay}
            </div>
        </Container>
    );
};

export default App;
