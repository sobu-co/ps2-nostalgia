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

export const saveImage = async (imageUri: string) => {
    try {
        // Check if the device is iPhone/iPad
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            // If it's an iPhone/iPad, create an anchor element to trigger the download
            const anchor = document.createElement('a');
            anchor.href = imageUri;
            anchor.download = 'generated_image.jpg';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        } else {
            // For desktop, use the HTMLCanvasElement.toBlob method to convert the image to a blob
            const response = await fetch(imageUri);
            const blob = await response.blob();

            // Use the FileSystem API to save the image to the file system
            if (window.showSaveFilePicker) {
                const handle = await window.showSaveFilePicker({
                    types: [
                        {
                            description: 'JPEG Image',
                            accept: {
                                'image/jpeg': ['.jpg', '.jpeg']
                            }
                        }
                    ]
                });
                await handle.createWritable().then((writer: any) => writer.write(blob));
            } else {
                // Fallback for browsers that do not support showSaveFilePicker
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = generateFilename();
                anchor.click();
                URL.revokeObjectURL(url);
            }
        }
    } catch (error) {
        console.error('Error saving image:', error);
    }
};

const generateFilename = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 6; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return `PS2_${randomString}`;
};