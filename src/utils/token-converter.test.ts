import {TokenConverter} from "./token-converter";
import {ImageUrl} from "../models/imageUrl";

let subject: TokenConverter
beforeEach(() => {
    subject = new TokenConverter();
})

describe("Test getTokenId()", () => {
    it("With simple example", () => {
        const chosenImages = [
            new ImageUrl('abcd.png', 1),
            new ImageUrl('abcd.png', 3)
        ]

        const allImages = [
            new ImageUrl('abcd.png', 0),
            new ImageUrl('abcd.png', 1),
            new ImageUrl('xyz.png', 2),
            new ImageUrl('abcd.png', 3),
        ]
        const tokenId = subject.getTokenId(chosenImages, allImages)
        expect(tokenId).toBe("A")
    })

    it("Test Odd number of total images", () => {
        const chosenImages = [
            new ImageUrl('abcd.png', 0),
        ]

        const allImages = [
            new ImageUrl('abcd.png', 0),
            new ImageUrl('abcd.png', 1),
            new ImageUrl('xyz.png', 2),
        ]
        const tokenId = subject.getTokenId(chosenImages, allImages)
        expect(tokenId).toBe("1")
    })
})

describe("Test getDisplayImages()", () => {
    it("when all images is larger than binary string", () => {
        const allImages = [
            new ImageUrl('abcd.png', 0),
            new ImageUrl('lmnop.png', 1),
            new ImageUrl('xyz.png', 2),
            new ImageUrl('nioa.png', 3),
            new ImageUrl('abcd.png', 4),
        ]
        const chosenImages = subject.getDisplayImages("9", allImages)
        expect(chosenImages).toEqual([
            new ImageUrl('abcd.png', 0),
            new ImageUrl('nioa.png', 3),
        ])
    })

    it("when not enough images", () => {
        const allImages = [
            new ImageUrl('abcd.png', 0),
            new ImageUrl('lmnop.png', 1),
            new ImageUrl('xyz.png', 2),
            new ImageUrl('nioa.png', 3),
            new ImageUrl('abcd.png', 4),
        ]
        const chosenImages =
        expect(()=> subject.getDisplayImages("FF", allImages)).toThrow(Error)
    })
})