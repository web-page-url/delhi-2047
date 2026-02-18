const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = 'c:/Users/anubh/OneDrive/Desktop/2026/Feb-2026/delhi-2047/public/images/delhi.jpg';
const outputDir = 'c:/Users/anubh/OneDrive/Desktop/2026/Feb-2026/delhi-2047/public/icons';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'og-image.jpg', width: 1200, height: 630, fit: 'cover' },
    { name: 'twitter-image.jpg', width: 800, height: 418, fit: 'cover' },
    { name: 'thumbnail-sm.jpg', size: 200 },
    { name: 'thumbnail-md.jpg', size: 400 },
    { name: 'thumbnail-lg.jpg', size: 800 }
];

async function generateIcons() {
    console.log('Generating icons...');
    for (const config of sizes) {
        const outputPath = path.join(outputDir, config.name);
        let pipeline = sharp(inputImage);

        if (config.width && config.height) {
            pipeline = pipeline.resize(config.width, config.height, { fit: config.fit });
        } else {
            pipeline = pipeline.resize(config.size, config.size);
        }

        if (config.name.endsWith('.jpg')) {
            pipeline = pipeline.jpeg({ quality: 80 });
        } else {
            pipeline = pipeline.png();
        }

        await pipeline.toFile(outputPath);
        console.log(`Created: ${config.name}`);
    }

    // Also copy to root public for favicon.ico (using 32x32 as base)
    await sharp(inputImage)
        .resize(32, 32)
        .toFile('c:/Users/anubh/OneDrive/Desktop/2026/Feb-2026/delhi-2047/public/favicon.ico');

    console.log('Done!');
}

generateIcons().catch(console.error);
