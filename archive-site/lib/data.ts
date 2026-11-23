import momentsData from '../data/moments.json';
import commonsCredits from '../data/commons-credits.json';

export interface Moment {
  id: string;
  who: string;
  category: 'writer' | 'activist' | 'politician' | 'actress' | 'musician' | 'existing icon';
  region: string;
  country: string;
  asian: boolean;
  date: string;
  place: string;
  outfit: string;
  label: string;
  why: string;
  sources: string[];
  where?: string | null;
  media: MediaItem[];
  embeds: EmbedItem[];
  strength: number;
  flags?: string[];
  existing?: string;
  source_status?: Record<string, string>;
  rookie_tie_in?: Array<{
    title: string;
    url: string;
    why: string;
  }>;
}

export interface MediaItem {
  kind: string;
  url: string;
  credit: string;
  rights: string;
  note?: string;
  link_status?: string;
}

export interface EmbedItem {
  platform: 'YouTube' | 'Instagram' | 'Threads';
  url: string;
  official: boolean;
  channel?: string;
  note?: string;
  link_status?: string;
}

export interface IconData {
  name: string;
  slug: string;
  sort?: number;
  born?: string;
  years_active?: string;
  who_line?: string;
  card_image?: string;
  card_sub?: string;
  who?: string[];
  work?: string[];
  quotes?: Array<{
    text: string;
    said_to?: string;
    year?: string | null;
    url?: string;
  }>;
  beliefs?: string;
  why_the_look?: string;
  moments?: Array<{
    title: string;
    year?: string;
    garments?: string;
    designer_season?: string;
    where_it_lives?: string;
    why_iconic?: string;
    sources?: string[];
    media?: Array<{
      type: string;
      src?: string;
      caption?: string;
      credit?: string;
      source_url?: string;
    }>;
  }>;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

// Get all moments (new + existing icon moments)
export function getAllMoments(): Moment[] {
  const data = momentsData as any;
  const newMoments = data.new_moments || [];
  const existingMoments = data.existing_icon_moments || [];
  
  return deepClean([...newMoments, ...existingMoments]) as Moment[];
}

// Get moments by category
export function getMomentsByCategory(category: string): Moment[] {
  const moments = getAllMoments();
  return moments.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
}

// Get moments by region
export function getMomentsByRegion(region: string): Moment[] {
  const moments = getAllMoments();
  return moments.filter(m => m.region === region);
}

// Get all categories
export function getAllCategories(): string[] {
  const moments = getAllMoments();
  const categories = new Set(moments.map(m => {
    // Normalize category
    if (m.category.includes('existing icon')) return 'musician';
    return m.category;
  }));
  return Array.from(categories);
}

// Get all regions - normalize duplicates
export function getAllRegions(): string[] {
  const moments = getAllMoments();
  const regions = new Set(moments.map(m => {
    // Normalize region labels
    if (m.region.includes(' / ')) {
      const parts = m.region.split(' / ').map(p => p.trim()).sort();
      return parts.join(' / ');
    }
    return m.region;
  }));
  return Array.from(regions);
}

// Get single moment
export function getMomentById(id: string): Moment | null {
  const moments = getAllMoments();
  return moments.find(m => m.id === id) || null;
}

// Extract YouTube ID from URL
export function getYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Icon functions are now in server-data.ts

// Clean text: remove Chinese/Japanese/Korean runs (the site is English-only)
// and tidy the punctuation they leave behind, so no sentence ends up broken.
const CJK = '\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\uff00-\uffef';
const RUN = `[${CJK}][${CJK}0-9\\s]*`;

export function cleanText(text: string): string {
  if (!text || typeof text !== 'string') return text;
  if (!new RegExp(`[${CJK}]`).test(text)) return stripNotes(text);
  let t = text;
  // "Title / 中文" or "中文 / Title": drop the run together with its slash
  t = t.replace(new RegExp(`\\s*/\\s*${RUN}`, 'g'), ' ');
  t = t.replace(new RegExp(`${RUN}\\s*/\\s*`, 'g'), '');
  // a run glued to Latin letters (e.g. a Korean channel name + "TV")
  t = t.replace(new RegExp(`${RUN}[A-Za-z]*`, 'g'), ' ');
  // tidy leftovers: empty brackets, dangling separators inside brackets
  t = t.replace(/\(\s*\)/g, '');
  t = t.replace(/\(\s*[,/;:]\s*/g, '(');
  t = t.replace(/\s*[,/;:]\s*\)/g, ')');
  t = t.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  t = t.replace(/\s+([,.;:])/g, '$1');
  t = t.replace(/\s+\b(in|of|from)\s*:/g, ':');
  t = t.replace(/\s+/g, ' ').trim();
  const whole = t.match(/^\((.*)\)$/);
  if (whole) t = whole[1];
  return stripNotes(t);
}

// Remove internal editorial notes ("do not invent…", "FLAG: …") from public text.
export function stripNotes(text: string): string {
  if (!text) return text;
  let t = text;
  t = t.replace(/\s*FLAG:[^.]*(\([^)]*\))?[^.]*\.(\s*(It may not fit the brand|Present with care)\.)?/g, '');
  t = t.replace(/\s*[;—–]\s*do not (invent|use)\b[^.)]*/gi, '');
  t = t.replace(/(^|(?<=[.!?)]\s))(Do not (invent|use)|Don't (invent|use))\b[^.]*\.\s*/g, '');
  t = t.replace(/\s*\([Aa]dded [^)]*\)/g, '');
  t = t.replace(/,?\s*\b[Aa]dded \d{1,2} \w+ \d{4} (digest|pulse)\.?/g, '');
  t = t.replace(/\(\s*(era file)\s*\)/g, '').replace(/\(\s*\)/g, '');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

const URL_KEYS = new Set(['url', 'src', 'source_url', 'sources', 'card_image', 'id', 'slug', 'search']);

export function deepClean<T>(value: T, key = ''): T {
  if (URL_KEYS.has(key)) return value;
  if (typeof value === 'string') return cleanText(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => deepClean(v, key)) as unknown as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = k === 'flags' ? v : deepClean(v, k);
    }
    return out as T;
  }
  return value;
}

// Direct image URL for a Wikimedia Commons file page (PD/CC images only)
export function commonsImage(pageUrl: string): { thumb: string; artist: string; license: string; license_url?: string } | null {
  const m = pageUrl.match(/commons\.wikimedia\.org\/wiki\/(File:[^?#]+)/);
  if (!m) return null;
  let key = m[1];
  try { key = decodeURIComponent(key); } catch {}
  const hit = (commonsCredits as Record<string, any>)[key];
  return hit && hit.thumb ? hit : null;
}

// Get user-facing sensitivity warning
export function getSensitivityWarning(moment: Moment): string | null {
  if (!moment.flags || moment.flags.length === 0) return null;
  
  // Convert editorial flags to user-facing warnings
  const id = moment.id;
  
  if (id === 'virginia-woolf-dreadnought-1910') {
    return 'This 1910 photograph documents the Dreadnought hoax, in which Virginia Woolf and others wore blackface and posed as Abyssinian royalty to board HMS Dreadnought. The National Portrait Gallery labels this image as offensive. It is included here with that historical context.';
  }
  
  if (id === 'phoolan-devi-surrender-1983') {
    return 'Phoolan Devi is a contested figure in Indian history. She was accused in the 1981 Behmai killings and her story remains debated.';
  }
  
  // Don't show editorial notes
  return null;
}

// Check if URL is valid (not a placeholder)
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('http://') || url.startsWith('https://')) return true;
  if (url.includes('check @') || url.includes('search ')) return false;
  return false;
}

// Extract display name from URL
export function getUrlDisplayName(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    
    // Map common domains to display names
    const nameMap: Record<string, string> = {
      'vogue.com': 'Vogue',
      'nytimes.com': 'The New York Times',
      'theguardian.com': 'The Guardian',
      'vanityfair.com': 'Vanity Fair',
      'harpersbazaar.com': "Harper's Bazaar",
      'teenvogue.com': 'Teen Vogue',
      'elle.com': 'ELLE',
      'wmagazine.com': 'W Magazine',
      'newyorker.com': 'The New Yorker',
      'businessinsider.com': 'Business Insider',
      'independent.co.uk': 'The Independent',
      'bbc.com': 'BBC',
      'cnn.com': 'CNN',
      'rookiemag.com': 'Rookie',
    };
    
    return nameMap[hostname] || hostname;
  } catch {
    return url;
  }
}

// First four-digit year in a free-text date ("Campaign revealed 6 Jan 2015" -> "2015")
export function getYear(date: string): string {
  const m = (date || '').match(/\b(1[5-9]|20)\d{2}\b/);
  return m ? m[0] : '';
}
