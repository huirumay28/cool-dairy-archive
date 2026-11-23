// Copy the original archive's local images (repo-root /images) into public/
// so icon pages can show them. Runs before `next build`.
import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const src = path.resolve(process.cwd(), '..', 'images', 'icons');
const dest = path.resolve(process.cwd(), 'public', 'images', 'icons');
if (existsSync(src)) {
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  console.log(`copied images: ${src} -> ${dest}`);
} else {
  console.warn(`no images at ${src}; icon photos will be missing`);
}
