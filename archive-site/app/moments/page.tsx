'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllMoments, getAllCategories, getAllRegions } from '@/lib/data';

export default function MomentsPage() {
  const allMoments = useMemo(() => getAllMoments(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const regions = useMemo(() => getAllRegions(), []);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [asianOnly, setAsianOnly] = useState(false);
  
  const filteredMoments = useMemo(() => {
    return allMoments.filter(moment => {
      const categoryMatch = selectedCategory === 'all' || 
        moment.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (moment.category.includes('existing icon') && selectedCategory === 'musician');
      
      const regionMatch = selectedRegion === 'all' || (() => {
        if (moment.region.includes(' / ')) {
          const parts = moment.region.split(' / ').map(p => p.trim()).sort();
          return parts.join(' / ') === selectedRegion;
        }
        return moment.region === selectedRegion;
      })();
      
      const asianMatch = !asianOnly || moment.asian;
      
      return categoryMatch && regionMatch && asianMatch;
    });
  }, [allMoments, selectedCategory, selectedRegion, asianOnly]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 border-b-2 border-black pb-8">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-3">Archive</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">All Moments</h1>
        <p className="text-lg text-gray-700">
          {filteredMoments.length} {filteredMoments.length === 1 ? 'moment' : 'moments'}
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-12 space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-gray-600 mb-3">Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-black text-white border-black'
                  : 'border-gray-400 hover:border-black'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white border-black'
                    : 'border-gray-400 hover:border-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Region Filter */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-gray-600 mb-3">Region</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 font-mono text-xs border transition-all ${
                selectedRegion === 'all'
                  ? 'bg-black text-white border-black'
                  : 'border-gray-400 hover:border-black'
              }`}
            >
              All Regions
            </button>
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 font-mono text-xs border transition-all ${
                  selectedRegion === region
                    ? 'bg-black text-white border-black'
                    : 'border-gray-400 hover:border-black'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        
        {/* Asian Women Filter */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="asian-only"
            checked={asianOnly}
            onChange={(e) => setAsianOnly(e.target.checked)}
            className="w-4 h-4 border-2 border-black focus:ring-0 focus:ring-offset-0"
          />
          <label htmlFor="asian-only" className="ml-2 font-mono text-sm">
            Asian women only
          </label>
        </div>
      </div>
      
      {/* Moments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoments.map((moment) => (
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
                <div className="flex items-center gap-2">
                  {moment.asian && (
                    <span className="font-mono text-xs px-2 py-0.5 border border-black">
                      Asian
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:underline">
                {moment.who}
              </h3>
              
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {moment.outfit}
              </p>
              
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>{moment.date.split(' ')[0] || moment.date}</span>
                <span>{moment.region}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredMoments.length === 0 && (
        <div className="text-center py-16 border border-gray-300">
          <p className="text-gray-500 font-mono text-sm">No moments match your filters.</p>
        </div>
      )}
    </div>
  );
}
