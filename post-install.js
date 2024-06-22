import { symlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildContentDirectory(source, dest, type) {
    // Define the source and target folders for the symbolic link
    const sourceFolder = __dirname+'/'+source;
    const targetFolder = __dirname +'/content/'+dest;

    // Create a symbolic link
    const symlinkPath = join(targetFolder);
    if (!fs.existsSync(symlinkPath)) {
        await symlink(sourceFolder, symlinkPath, type);
    }
}
buildContentDirectory("legislation/constitution.md", "1.constitution.md", "file")
// buildContentDirectory("legislation/content", "2.legislation", "dir")
