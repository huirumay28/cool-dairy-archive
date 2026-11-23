import momentsData from '../data/moments.json';

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
  
  return [...newMoments, ...existingMoments];
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

// Get all regions
export function getAllRegions(): string[] {
  const moments = getAllMoments();
  const regions = new Set(moments.map(m => m.region));
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

// Stub for icons - will load from JSON files in a real implementation
// For now, return empty array since we don't have fs access
export function getExistingIcons(): IconData[] {
  // In a production build, these would be pre-loaded
  return [];
}

export function getIconBySlug(slug: string): IconData | null {
  return null;
}
