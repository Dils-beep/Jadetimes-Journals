
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

async function convertImages() {
    if (!fs.existsSync(imagesDir)) {
        console.error(`Directory not found: ${imagesDir}`);
        return;
    }

    const files = fs.readdirSync(imagesDir);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.avif'].includes(ext)) {
            const inputPath = path.join(imagesDir, file);
            const outputFilename = path.basename(file, ext) + '.webp';
            const outputPath = path.join(imagesDir, outputFilename);

            try {
                await sharp(inputPath)
                    .toFormat('webp')
                    .toFile(outputPath);
                console.log(`Converted: ${file} -> ${outputFilename}`);

                // Delete original? The user asked to "remove unused images and convert...". 
                // I will NOT delete the original yet, I will delete them after verifying or user can delete them.
                // Actually user said "remove the un used images and convort all the images".
                // Use logic: if I convert, I replace usage, then I delete original.
                // For safety I will keep originals for a moment or delete them in this script.
                // I'll delete them after successful conversion to keep directory clean as requested.
                fs.unlinkSync(inputPath);
                console.log(`Deleted original: ${file}`);

            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

convertImages();
