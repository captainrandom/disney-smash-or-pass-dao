import {ImageUrl} from "../models/imageUrl";

export class TokenConverter {
    getTokenId(chosenImages: ImageUrl[], fullImageArr: ImageUrl[]): string {
        let binaryStr = TokenConverter.createBinaryStr(chosenImages, fullImageArr);
        return this.bin2hex(binaryStr).toUpperCase();
    }

    private static createBinaryStr(chosenImages: ImageUrl[], fullImageArr: ImageUrl[]) {
        const includedImgIndexes = new Set(chosenImages.map((img) => img.arrIndex));
        let binaryStr = ""
        while((fullImageArr.length + binaryStr.length) % 4 != 0) { binaryStr += "0" }
        for (let i = fullImageArr.length - 1; i >= 0; i--) {
            binaryStr += includedImgIndexes.has(i) ? "1" : "0"
        }
        return binaryStr;
    }

    private bin2hex(b: string): string {
        return b.match(/.{4}/g)!?.reduce(function (acc, i) {
            return acc + parseInt(i, 2).toString(16);
        }, '')
    }

    getDisplayImages(tokenId: string, fullImageArr: ImageUrl[]): ImageUrl[] {
        let binaryStr = this.hex2bin(tokenId);
        for (let i = fullImageArr.length; i < binaryStr.length; i++) {
            if (binaryStr.at(i) === "1") {
                throw new Error("Don't have enough images to display this value");
            }
        }

        const chosenImages = []
        for (let i = 0; i < fullImageArr.length; i++) {
            if (binaryStr.at(i) === "1") {
                chosenImages.push(fullImageArr[i])
            }
        }
        return chosenImages;
    }

    private hex2bin(h: string): string {
        return h.split('').reduce(function (acc, i) {
            return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
        }, '').split("").reverse().join("")
    }
}
