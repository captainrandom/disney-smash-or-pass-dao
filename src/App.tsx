import {useAddress, useEditionDrop, useMetamask} from '@thirdweb-dev/react';
import {useEffect} from 'react';
import disneyCharacters from "./constants";
import {Container} from "react-bootstrap";
import {TokenConverter} from "./utils/token-converter";
import {ImageUrl} from "./models/imageUrl";
import {GifCreator} from "./utils/gif-creator";
import SmashOrPassChooser from "./components/smash-or-pass-chooser";
import DisplayOwnedNfts from "./components/display-owned-nfts";

const App = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    console.log('address:', address);

    const editionDrop = useEditionDrop("0x5881a8beEBf66f8bEbd17Ec56AD831a2B25f15dd");

    const shortenAddress = (addr: string) => {
        return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
    };

    useEffect(() => {
        if (!address || !editionDrop) {
            return;
        }

        const checkBalance = async () => {
            try {
                const balance = await editionDrop.balanceOf(address, 0);
            } catch (error) {
                console.error("Failed to get balance", error);
            }
        };
        checkBalance();
    }, [address, editionDrop]);

    const mintNft = async (tokenId: string, images: ImageUrl[]) => {
        if (!editionDrop) {
            console.error("NFT contract is null!")
            return;
        }

        try {
            await editionDrop.claim(tokenId, 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/${tokenId}`);
        } catch (error) {
            console.error("Failed to claim NFT", error);

            const gifDataUrl = await GifCreator.createGif(images);
            // if we failed let's try minting the token
            try {
                await editionDrop.createBatch([{
                    name: `DSM#${tokenId}`,
                    description: "Disney Smash or Pass containing only smash characters",
                    image: gifDataUrl,
                }])
            } catch (error) {
                console.error("failed to create the new NFT", error);
            }
        }
    };

    const fullImageList = disneyCharacters.allCharacters;
    const doneCallaback = async (chosenImages: ImageUrl[]) => {
        const tokenConverter = new TokenConverter();
        const tokenId = tokenConverter.getTokenId(chosenImages, fullImageList);
        console.log('token id:', tokenId)
    }

    if (!address) {
        return (
            <div className="landing">
                <h1>Welcome to Disney Smash or Pass DAO</h1>
                <button onClick={connectWithMetamask} className="btn-hero">
                    Connect your wallet
                </button>
            </div>
        );
    }

    return (
        <Container>
            <div className="landing">
                <h1>Welcome to Disney Smash or Pass</h1>
                <SmashOrPassChooser doneCallback={doneCallaback} images={fullImageList}/>
                <DisplayOwnedNfts/>
            </div>
        </Container>
    );
};

export default App;
