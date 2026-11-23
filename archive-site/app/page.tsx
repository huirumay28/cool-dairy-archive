import Link from 'next/link';
import { getAllMoments, getAllCategories, getAllRegions } from '@/lib/data';

export default function Home() {
  const moments = getAllMoments();
  const categories = getAllCategories();
  const regions = getAllRegions();
  
  // Get featured moments (strength 5)
  const featured = moments.filter(m => m.strength === 5).slice(0, 6);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-20 border-b-2 border-black pb-12">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-4">A shop archive</p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-none">
          cool dairy archive
        </h1>
        <p className="text-xl leading-relaxed mb-6">
          Moments where what she wore was a cultural moment (especially in feminist history), 
          carried a feminist message, or is undeniably iconic.
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Writers, activists, politicians, actresses, and musicians. Each outfit shown clearly, 
          each story told in depth: why this moment, what it means, and the actual garment.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="border border-black p-6">
          <div className="text-4xl font-bold mb-1">{moments.length}</div>
          <div className="font-mono text-xs uppercase tracking-wider text-gray-600">Iconic moments</div>
        </div>
        <div className="border border-black p-6">
          <div className="text-4xl font-bold mb-1">{categories.length}</div>
          <div className="font-mono text-xs uppercase tracking-wider text-gray-600">Categories</div>
        </div>
        <div className="border border-black p-6">
          <div className="text-4xl font-bold mb-1">{regions.length}</div>
          <div className="font-mono text-xs uppercase tracking-wider text-gray-600">Regions</div>
        </div>
      </div>
      
      {/* Featured Moments */}
      <section className="mb-20">
        <div className="flex items-end justify-between mb-8 border-b-2 border-black pb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Moments</h2>
            <p className="font-mono text-xs text-gray-600">The highest-impact moments</p>
          </div>
          <Link 
            href="/moments" 
            className="font-mono text-sm border-b-2 border-black hover:bg-black hover:text-white transition-colors px-1"
          >
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((moment) => (
            <Link 
              key={moment.id} 
              href={`/moments/${moment.id}`}
              className="group border border-gray-300 hover:border-black transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
                    {moment.category}
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    {moment.date.split(' ')[0]}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:underline">
                  {moment.who}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                  {moment.why}
                </p>
                <div className="font-mono text-xs text-gray-500">
                  {moment.region}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Browse by Category */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const count = moments.filter(m => 
              m.category.toLowerCase() === category.toLowerCase() || 
              (m.category.includes('existing icon') && category === 'musician')
            ).length;
            
            return (
              <Link
                key={category}
                href={`/moments?category=${category}`}
                className="border border-black hover:bg-black hover:text-white transition-all group p-6 text-center"
              >
                <div className="text-3xl font-bold mb-1">{count}</div>
                <div className="font-mono text-xs uppercase tracking-wider capitalize">
                  {category}{count !== 1 ? 's' : ''}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      
      {/* Browse by Region */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-4">Browse by Region</h2>
        <div className="flex flex-wrap gap-3">
          {regions.map((region) => {
            const count = moments.filter(m => {
              if (m.region.includes(' / ')) {
                const parts = m.region.split(' / ').map(p => p.trim()).sort();
                return parts.join(' / ') === region;
              }
              return m.region === region;
            }).length;
            
            return (
              <Link
                key={region}
                href={`/moments?region=${encodeURIComponent(region)}`}
                className="inline-flex items-center px-4 py-2 border border-black hover:bg-black hover:text-white transition-all font-mono text-xs"
              >
                {region} <span className="ml-2">({count})</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
