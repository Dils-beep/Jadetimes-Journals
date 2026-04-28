
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const imagesDir = path.join(srcDir, 'assets', 'images');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

function checkUnused() {
    if (!fs.existsSync(imagesDir)) {
        console.log("Images directory not found.");
        return;
    }

    const imageFiles = fs.readdirSync(imagesDir).filter(file => file.endsWith('.webp'));
    const sourceFiles = getAllFiles(srcDir).filter(file =>
        !file.includes('assets\\images') && // Don't search inside the images folder itself
        !file.includes('assets/images') &&
        (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json'))
    );

    console.log(`Checking ${imageFiles.length} images against ${sourceFiles.length} source files...`);

    const unusedImages = [];

    imageFiles.forEach(image => {
        let isUsed = false;
        const imageName = image; // Exact filename
        // Some dynamic imports might use just the name without extension, but usually imports include extension or rely on bundler.
        // However, in this project we see explicit imports like "foo.webp".

        for (const srcFile of sourceFiles) {
            const content = fs.readFileSync(srcFile, 'utf8');
            if (content.includes(imageName)) {
                isUsed = true;
                break;
            }

            // Also check URL encoded or simple name matches if needed, but sticky to strict filename first.
            // Dynamic imports `import.meta.glob` in JournalEditors.jsx uses the directory, so technically ALL images there are "used" by that glob if they match the pattern.
            // JournalEditors.jsx has: const images = import.meta.glob("../../assets/images/*", { eager: true, as: "url" });
            // This means ALL images in that folder are technically imported by the bundler.

            // However, the `getEditorImage` function filters them by name.
            // So images that don't match an editor might be visually unused, but code-wise they are imported.
        }

        // Special check for JournalEditors.jsx wildcards
        // effectively renders "unused" check moot for this folder unless we check against the editors list data.
        // But let's see which ones are explicitly imported vs implicitly.

        if (!isUsed) {
            // If it's not explicitly imported, it MIGHT be used by JournalEditors.jsx dynamically.
            // But JournalEditors.jsx uses *everything* in that folder.
            // So technically everything is used? 
            // User asked to "delete the unused pictures".
            // Maybe they mean pictures that are not referenced by ANY explicit import AND not matching any editor?

            unusedImages.push(image);
        }
    });

    console.log("Potentially unused images (not explicitly imported textually):");
    unusedImages.forEach(img => console.log(img));
}

checkUnused();
