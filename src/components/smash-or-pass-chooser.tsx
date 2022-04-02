import {Col, Row} from "react-bootstrap";
import {MouseEvent, useState} from "react";

interface SmashOrPassChooserProps {
    images: string[]
}

const SmashOrPassChooser = (props: SmashOrPassChooserProps) => {

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const currentImages = [...props.images];
    const [currentImgIndex, setCurrentImgIndex] = useState(getRandomInt(0, currentImages.length));
    const smashImages = [];

    const makeChoice = (choice: string, index: number) => {
        switch (choice) {
            case "smash":
                smashImages.push(currentImages[index]);
        }

        currentImages.splice(index, 1);
        setCurrentImgIndex(getRandomInt(0, currentImages.length));
    }
    return (<Row>
        <Col>
            <Row><Col><img src={currentImages[currentImgIndex]}/></Col></Row>
            <Row>
                <Col>
                    <button onClick={() => makeChoice("smash", currentImgIndex)}>Smash</button>
                </Col>
                <Col>
                    <button onClick={() => makeChoice("pass", currentImgIndex)}>Pass</button>
                </Col>
            </Row>
        </Col>
    </Row>);
}

export default SmashOrPassChooser;