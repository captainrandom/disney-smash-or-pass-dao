import Slideshow from "./components/slideshow";
import disneyCharacters from "./constants";
import {Container} from "react-bootstrap";
import {TokenConverter} from "./utils/token-converter";
import { useSearchParams } from "react-router-dom";

const NFTAnimationApp = () => {
    const [searchParams, _] = useSearchParams();
    const tokenId = searchParams.get('tokenId');
    const tokenConverter = new TokenConverter();
    const images = tokenId ? tokenConverter.getDisplayImages(tokenId, disneyCharacters.allCharacters) : [];

    return (
        <Container>
            <Slideshow images={images}/>
        </Container>
    )
}
export default NFTAnimationApp