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
      
      const regionMatch = selectedRegion === 'all' || moment.region === selectedRegion;
      const asianMatch = !asianOnly || moment.asian;
      
      return categoryMatch && regionMatch && asianMatch;
    });
  }, [allMoments, selectedCategory, selectedRegion, asianOnly]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">Archive</p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Moments</h1>
        <p className="text-lg text-gray-600">
          {filteredMoments.length} {filteredMoments.length === 1 ? 'moment' : 'moments'}
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-12 space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Region</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedRegion === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Regions
            </button>
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRegion === region
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
          />
          <label htmlFor="asian-only" className="ml-2 text-sm text-gray-700">
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
            className="group border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                  {moment.category}
                </span>
                <div className="flex items-center gap-2">
                  {moment.asian && (
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                      Asian
                    </span>
                  )}
                  {moment.flags && moment.flags.length > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                      ⚠
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                {moment.who}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {moment.outfit}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{moment.date.split(' ')[0] || moment.date}</span>
                <span>{moment.region}</span>
              </div>
              
              {moment.strength === 5 && (
                <div className="mt-3 flex items-center text-xs text-yellow-600">
                  <span>★★★★★</span>
                  <span className="ml-2">Featured</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {filteredMoments.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No moments match your filters.</p>
        </div>
      )}
    </div>
  );
}
