
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const imagesDir = path.join(srcDir, 'assets', 'images');

const EDITORS = [
    "Prof. Simranjit Singh",
    "Dr. Tornike Shurgulaia",
    "Prof. Rabbi Victor Gross",
    "Prof. Ceasar Dubor",
    "Dr. Sumit Kumar Pandey",
    "Prof. Kirandeep Singh",
    "Fedra Ferro",
    "A. F. Syeda",
    "Chamitha Ranneththi",
    "Mehul Bansal",
    "Thiloththama Jayasinghe",
    "Dr. jaime Geronimo Vela",
    "Dr. Ehi Iden",
    "Dr. Antony Mbithi",
    "Dr. Keith Nester A. Lavin",
    "Dr. Francois Phopho",
    "Dr. Rachel Wolford",
    "Dr Amresh Kumar Gauda",
    "Dr Anand Joshi",
    "Dr. Rekha",
    "Dr. Rajan Miglani",
    "Dr Sugandha Shekhar"
];

function normalizeName(name) {
    return name.toLowerCase()
        .replace(/^(prof\.|dr\.|mr\.|mrs\.|ms\.)\s*/g, "")
        .trim();
}

const NORMALIZED_EDITORS = EDITORS.map(normalizeName);

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

function deleteUnused() {
    if (!fs.existsSync(imagesDir)) {
        console.log("Images directory not found.");
        return;
    }

    const imageFiles = fs.readdirSync(imagesDir).filter(file => file.endsWith('.webp'));
    const sourceFiles = getAllFiles(srcDir).filter(file =>
        !file.includes('assets\\images') &&
        !file.includes('assets/images') &&
        (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json'))
    );

    console.log(`Checking ${imageFiles.length} images...`);

    const unusedImages = [];

    imageFiles.forEach(image => {
        let isUsed = false;
        const imageNameLower = image.toLowerCase();

        // 1. Explicit textual usage in source files
        for (const srcFile of sourceFiles) {
            const content = fs.readFileSync(srcFile, 'utf8');
            if (content.includes(image)) {
                isUsed = true;
                break;
            }
        }

        // 2. Used by JournalEditors logic?
        if (!isUsed) {
            // Is this image file related to an editor?
            // Logic from JournalEditors.jsx:
            // Filename contains clean name OR fuzzy match parts

            for (const editorName of NORMALIZED_EDITORS) {
                if (imageNameLower.includes(editorName)) {
                    isUsed = true;
                    break;
                }
                // Fuzzy check
                const parts = editorName.split(/\s+/).filter(p => p.length > 2);
                if (parts.length > 0 && parts.every(p => imageNameLower.includes(p))) {
                    isUsed = true;
                    break;
                }
            }
        }

        if (!isUsed) {
            // Kingzang Thinley check - is he in the list? No, he is not in the HARDCODED local list I just pasted above.
            // But what if he should be? The list I copied is from JournalEditors.jsx. 
            // If he's not in JournalEditors.jsx, he is not shown on the site (unless there's another page).
            // Safest is to rely on what code uses.

            console.log(`Deleting unused image: ${image}`);
            try {
                fs.unlinkSync(path.join(imagesDir, image));
            } catch (e) {
                console.error(`Failed to delete ${image}: ${e.message}`);
            }
        }
    });
}

deleteUnused();
