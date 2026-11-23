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
      <div className="max-w-3xl mb-20">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">A shop archive</p>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          cool dairy archive
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Moments where what she wore was a cultural moment (especially in feminist history), 
          carried a feminist message, or is undeniably iconic.
        </p>
        <p className="text-base text-gray-500 leading-relaxed">
          Writers, activists, politicians, actresses, and musicians. Each outfit shown clearly, 
          each story told in depth: why this moment, what it means, and the actual garment.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="text-3xl font-bold text-gray-900 mb-1">{moments.length}</div>
          <div className="text-sm text-gray-600">Iconic moments</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="text-3xl font-bold text-gray-900 mb-1">{categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="text-3xl font-bold text-gray-900 mb-1">{regions.length}</div>
          <div className="text-sm text-gray-600">Regions</div>
        </div>
      </div>
      
      {/* Featured Moments */}
      <section className="mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Featured Moments</h2>
            <p className="text-sm text-gray-600">The highest-impact moments (★★★★★ strength)</p>
          </div>
          <Link 
            href="/moments" 
            className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((moment) => (
            <Link 
              key={moment.id} 
              href={`/moments/${moment.id}`}
              className="group border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                  {moment.category}
                </span>
                <span className="text-xs text-gray-400">{moment.date.split(' ')[0]}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                {moment.who}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {moment.why}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {moment.region}
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Browse by Category */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Category</h2>
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
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all group text-center"
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                <div className="text-sm text-gray-600 capitalize group-hover:text-gray-900 transition-colors">
                  {category}{count !== 1 ? 's' : ''}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      
      {/* Browse by Region */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Region</h2>
        <div className="flex flex-wrap gap-3">
          {regions.map((region) => {
            const count = moments.filter(m => m.region === region).length;
            
            return (
              <Link
                key={region}
                href={`/moments?region=${region}`}
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-gray-400 hover:shadow-sm transition-all"
              >
                {region} <span className="ml-2 text-gray-500">({count})</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
