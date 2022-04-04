import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";
import {ImageUrl} from "../models/imageUrl";
import * as gifshot from 'gifshot';

interface SmashOrPassChooserProps {
    images: ImageUrl[];
    doneCallback: Function;
}

const SmashOrPassChooser = (props: SmashOrPassChooserProps) => {

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const [currentImages, setCurrentImages] = useState(props.images);
    const [currentImgIndex, setCurrentImgIndex] = useState(getRandomInt(0, currentImages.length));
    const [smashImages, setSmashImages] = useState(new Array<ImageUrl>());

    const makeChoice = (choice: string, index: number) => {
        if (choice === "smash") {
            setSmashImages([...smashImages, currentImages[index]]);
            console.log('smashImages', smashImages);
        }
        currentImages.splice(index, 1);
        setCurrentImgIndex(getRandomInt(0, currentImages.length));
        setCurrentImages(currentImages);
    }

    const onDoneCallback = () => {
        const success = props.doneCallback(smashImages);
        if (success) {
            // want to clear state here!
            setCurrentImages(props.images)
            setCurrentImgIndex(getRandomInt(0, currentImages.length))
            setSmashImages([])
        }
    }
    return (<div>
        <Row><Col><img src={currentImages[currentImgIndex].imageUrl}/></Col></Row>
        <Row>
            <Col xs={3}>
                <Button variant="success" className="mr-1" onClick={() => makeChoice("smash", currentImgIndex)}>Smash</Button>
            </Col>
            <Col xs={3}>
                <Button variant="danger" onClick={() => makeChoice("pass", currentImgIndex)}>Pass</Button>
            </Col>
        </Row>
        <Row>
            <Button onClick={onDoneCallback}>Create NFT</Button>
        </Row>
    </div>);
}

export default SmashOrPassChooser;