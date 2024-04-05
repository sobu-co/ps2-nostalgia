export const resizeAndConvertToJPEG = (img: HTMLImageElement): string => {
    const maxDimension = 800;

    let { width, height } = img;

    // downscaling if necessary
    if (width > maxDimension || height > maxDimension) {
        const widthRatio = maxDimension / width;
        const heightRatio = maxDimension / height;

        const scaleFactor = Math.min(widthRatio, heightRatio);
        width *= scaleFactor;
        height *= scaleFactor;
    }

    // draw the image on a canvas with new dimensions
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    // Adjust JPEG quality to meet file size limit
    let quality = 1.0; // Initial JPEG quality

    let dataUrl = canvas.toDataURL('image/jpeg', quality);

    /**
     * Yikes!
     *
     * Since we are sending this data to the backend we have a
     *   tight restriction of 524288 bytes .... doioioing
     */
    const maxFileSizeBytes = 524288;
    while (dataUrl.length > maxFileSizeBytes) {
        quality -= 0.1; // Decrease quality by 10% each iteration
        dataUrl = canvas.toDataURL('image/jpeg', quality);
    }

    return dataUrl;
};

export const pixelateRawImageData = (imageData: string, pixelSize: number): Promise<string> => {
    const img = new Image();
    img.src = imageData;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject('Canvas context is not supported.');
                return;
            }

            const { width, height } = img;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const pixels = pixelSize * 2;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(canvas, 0, 0, canvas.width / pixels, canvas.height / pixels);
            ctx.drawImage(
                canvas,
                0, 0, canvas.width / pixels, canvas.height / pixels,
                0, 0, canvas.width, canvas.height
            );

            const pixelatedImageData = canvas.toDataURL();
            resolve(pixelatedImageData);
        };

        img.onerror = () => {
            reject('Error loading image.');
        };
    });
};