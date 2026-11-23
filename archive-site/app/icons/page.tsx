import Link from 'next/link';
import { getExistingIcons } from '@/lib/server-data';

export default function IconsPage() {
  const icons = getExistingIcons();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 border-b border-black pb-8">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-3">Archive</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Iconic Women</h1>
        <p className="text-lg text-gray-700 mb-4">
          The original archive of musicians and artists from the cool dairy collection.
        </p>
        <p className="font-mono text-sm text-gray-600">
          {icons.length} icons
        </p>
      </div>
      
      {/* Icons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {icons.map((icon) => (
          <Link
            key={icon.slug}
            href={`/icons/${icon.slug}`}
            className="border border-gray-300 hover:border-black transition-all group"
          >
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-gray-500 block mb-2">
                Icon
              </span>
              
              <h3 className="text-xl font-bold mb-2 group-hover:underline">
                {icon.name}
              </h3>
              
              {icon.who_line && (
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  {icon.who_line}
                </p>
              )}
              
              {icon.card_sub && (
                <p className="font-mono text-xs text-gray-600">
                  {icon.card_sub}
                </p>
              )}
              
              {icon.years_active && (
                <p className="font-mono text-xs text-gray-500 mt-2">
                  {icon.years_active}
                </p>
              )}
              
              {icon.moments && icon.moments.length > 0 && (
                <p className="font-mono text-xs text-gray-500 mt-3">
                  {icon.moments.length} moment{icon.moments.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
