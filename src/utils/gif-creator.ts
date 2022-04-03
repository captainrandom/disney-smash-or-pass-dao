import {ImageUrl} from "../models/imageUrl";
import gifshot from "gifshot";
import {Buffer} from 'buffer';

export class GifCreator {
    static createGif(images: ImageUrl[]): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            gifshot.createGIF({
                'images': images.map((img) => img.imageUrl),
                'sampleInterval': 1,
                'frameDuration': 15,
                'gifWidth': 350,
                'gifHeight': 350,
            }, function (obj: { error: any; image: string; }) {
                if (!obj.error) {
                    resolve(obj.image)
                    // const buffer = GifCreator.convertToBuffer(obj, reject);
                    // if (buffer) {
                    //     console.log("parsed gif")
                    //     resolve(buffer)
                    // } else {
                    //     console.error("failed to parse gif")
                    //     reject("didn't match data")
                    // }
                } else {
                    reject(obj.error)
                }
            });
        })
    }

    // private static convertToBuffer(obj: { error: any; image: string }, reject: (reason?: any) => void): Buffer | undefined {
        // const regex = /^data:.+\/(.+);base64,(.*)$/;
        // const matches = obj.image.match(regex);
        // const dataArr = obj.image.split("data:image/gif;base64,")
        // console.log('finished matching')
        // if (dataArr.length !== 2) {
        //     return;
        // }
        // if (!matches) {
        //     return;
        // }
        // return Buffer.from(, 'base64');
    // }
}