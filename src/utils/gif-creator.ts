import {ImageUrl} from "../models/imageUrl";
import gifshot from "gifshot";

export class GifCreator {
    static createGif(images: ImageUrl[]): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            gifshot.createGIF({
                'images': images.map((img) => img.imageUrl),
                'sampleInterval': 1,
                'frameDuration': 15,
                'gifWidth': 350,
                'gifHeight': 350,
            },function(obj: { error: any; image: string; }) {
                if(!obj.error) {
                    resolve(obj.image)
                } else {
                    reject(obj.error)
                }
            });
        })
    }
}