import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory: src/assets/images
const imagesDir = path.resolve(__dirname, '../src/assets/images');

async function convertImages() {
    if (!fs.existsSync(imagesDir)) {
        console.error(`Directory not found: ${imagesDir}`);
        return;
    }

    const files = fs.readdirSync(imagesDir);
    const extensions = ['.png', '.jpg', '.jpeg'];

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (extensions.includes(ext)) {
            const inputPath = path.join(imagesDir, file);
            const outputName = file.replace(ext, '.webp');
            const outputPath = path.join(imagesDir, outputName);

            try {
                console.log(`Converting ${file} to ${outputName}...`);
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`✓ Created ${outputName}`);

                // Optional: Remove original file? 
                // Let's keep them for now until we update references, but the user asked to convert.
                // usually "convert" implies replacing or at least making available.
                // We will keep originals for safety until code is updated.
            } catch (err) {
                console.error(`✗ Failed to convert ${file}:`, err);
            }
        }
    }
}

convertImages();
