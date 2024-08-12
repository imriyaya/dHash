import sharp from 'sharp';

export const dHash = async (filePath: string): Promise<string> => {
    const img = await sharp(filePath)
        .resize(9, 8, {
            fit: "fill"
        })
        .grayscale()
        .raw()
        .toBuffer();

    let hash: string = "";
    for (let x = 0; x < 8; x++) {
        let lastBrightness: number = -1;
        for (let y = 0; y < 9; y++) {
            const brightness = img[(x * 9) + y];
            if (lastBrightness !== -1) hash += (lastBrightness > brightness) ? 1 : 0;
            lastBrightness = brightness;
        }
    }

    return hash;
}