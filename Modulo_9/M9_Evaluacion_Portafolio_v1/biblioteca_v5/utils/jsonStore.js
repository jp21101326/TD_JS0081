import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));


export async function readJson(filePath) {
try {
const raw = await fs.readFile(`${__dirname}/../${filePath}`, 'utf8');
return JSON.parse(raw || '[]');
} catch (err) {
if (err.code === 'ENOENT') return [];
throw err;
}
}


export async function writeJson(filePath, data) {
await fs.writeFile(`${__dirname}/../${filePath}`, JSON.stringify(data, null, 2), 'utf8');
}