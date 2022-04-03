import {Carousel} from "react-bootstrap";
import {ImageUrl} from "../models/imageUrl";

interface SlideshowProps {
    images: ImageUrl[];
}
const Slideshow = (props: SlideshowProps) => {
    const carouselItems = []
    for(let imgSrc of props.images) {
        carouselItems.push(<Carousel.Item key={`carouselItem-${imgSrc.arrIndex}`}>
            <img
                className="d-block w-100"
                src={imgSrc.imageUrl}
            />
        </Carousel.Item>)
    }
    return (
        <Carousel>
            {carouselItems}
        </Carousel>
    )
}

export default Slideshow;