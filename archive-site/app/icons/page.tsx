import Link from 'next/link';
import { getExistingIcons } from '@/lib/data';

export default function IconsPage() {
  const icons = getExistingIcons();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">Archive</p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Iconic Women</h1>
        <p className="text-lg text-gray-600 mb-6">
          The existing archive of musicians and artists from the original cool dairy collection.
        </p>
        <p className="text-sm text-gray-500">
          {icons.length} icons
        </p>
      </div>
      
      {/* Icons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {icons.map((icon) => (
          <div
            key={icon.slug}
            className="border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            {icon.card_image && (
              <div className="mb-4 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {/* Placeholder for image */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {icon.name}
                </div>
              </div>
            )}
            
            <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
              Icon
            </span>
            
            <h3 className="text-lg font-semibold mt-2 mb-2">
              {icon.name}
            </h3>
            
            {icon.who_line && (
              <p className="text-sm text-gray-600 mb-3">
                {icon.who_line}
              </p>
            )}
            
            {icon.card_sub && (
              <p className="text-xs text-gray-500">
                {icon.card_sub}
              </p>
            )}
            
            {icon.years_active && (
              <p className="text-xs text-gray-500 mt-2">
                Active: {icon.years_active}
              </p>
            )}
          </div>
        ))}
      </div>
      
      {icons.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No icons found in the archive.</p>
        </div>
      )}
    </div>
  );
}
