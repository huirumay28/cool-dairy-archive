import 'server-only';
import fs from 'fs';
import path from 'path';
import { deepClean, type IconData } from './data';

// Get existing icons - read from filesystem (server-side only)
export function getExistingIcons(): IconData[] {
  const iconsDir = path.join(process.cwd(), 'data', 'content', 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.json'));
  const icons: IconData[] = [];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
    const data = JSON.parse(content);
    icons.push(deepClean(data));
  }
  
  return icons.sort((a, b) => (a.sort || 9999) - (b.sort || 9999));
}

// Get single icon (server-side only)
export function getIconBySlug(slug: string): IconData | null {
  const iconsDir = path.join(process.cwd(), 'data', 'content', 'icons');
  const filePath = path.join(iconsDir, `${slug}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return deepClean(JSON.parse(content));
}
