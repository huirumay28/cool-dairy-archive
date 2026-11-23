import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMomentById, getAllMoments } from '@/lib/data';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import InstagramEmbed from '@/components/InstagramEmbed';
import ThreadsEmbed from '@/components/ThreadsEmbed';

export async function generateStaticParams() {
  const moments = getAllMoments();
  
  return moments.map((moment) => ({
    id: moment.id,
  }));
}

export default function MomentPage({ params }: { params: { id: string } }) {
  const moment = getMomentById(params.id);
  
  if (!moment) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link href="/moments" className="text-gray-500 hover:text-gray-700">
          ← Back to all moments
        </Link>
      </nav>
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-wide text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-full">
            {moment.category}
          </span>
          {moment.asian && (
            <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
              Asian
            </span>
          )}
          {moment.strength === 5 && (
            <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
              ★★★★★ Featured
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {moment.who}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {moment.date}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {moment.place}
          </div>
        </div>
        
        {/* Flags Warning */}
        {moment.flags && moment.flags.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Content Note</p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {moment.flags.map((flag, i) => (
                    <li key={i}>• {flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <div className="space-y-12">
        {/* What She Wore */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">What She Wore</h2>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
            {moment.outfit}
          </p>
        </section>
        
        {/* Designer / Label */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Designer / Label</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {moment.label}
          </p>
        </section>
        
        {/* Why This Moment */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why This Moment Matters</h2>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
            {moment.why}
          </p>
        </section>
        
        {/* Where It Lives Now */}
        {moment.where && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Where the Garment Lives Now</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              {moment.where}
            </p>
          </section>
        )}
        
        {/* Media */}
        {moment.media && moment.media.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Images & Media</h2>
            <div className="space-y-6">
              {moment.media.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <div className="mb-3">
                    <span className="inline-block text-xs uppercase tracking-wide font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded">
                      {item.kind}
                    </span>
                  </div>
                  
                  {item.kind.toLowerCase().includes('pd') || item.kind.toLowerCase().includes('cc') ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Public domain / Creative Commons image available</p>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm break-words"
                      >
                        {item.url}
                      </a>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Copyrighted image — view at source (credited)
                      </p>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm break-words"
                      >
                        {item.url}
                      </a>
                    </div>
                  )}
                  
                  <div className="mt-3 text-xs text-gray-500">
                    <p><strong>Credit:</strong> {item.credit}</p>
                    <p><strong>Rights:</strong> {item.rights}</p>
                    {item.note && <p className="mt-1 italic">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Embeds */}
        {moment.embeds && moment.embeds.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Video & Social Media</h2>
            <div className="space-y-6">
              {moment.embeds.map((embed, i) => (
                <div key={i}>
                  {embed.platform === 'YouTube' && (
                    <YouTubeEmbed url={embed.url} channel={embed.channel} />
                  )}
                  {embed.platform === 'Instagram' && (
                    <InstagramEmbed url={embed.url} note={embed.note} />
                  )}
                  {embed.platform === 'Threads' && (
                    <ThreadsEmbed url={embed.url} note={embed.note} />
                  )}
                  {embed.note && embed.platform !== 'Instagram' && embed.platform !== 'Threads' && (
                    <p className="text-xs text-gray-500 mt-2 italic">{embed.note}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Sources */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sources</h2>
          <ol className="space-y-2">
            {moment.sources.map((source, i) => (
              <li key={i} className="text-sm">
                <a 
                  href={source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {i + 1}. {source}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
      
      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <Link 
          href="/moments"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          ← Back to all moments
        </Link>
      </div>
    </div>
  );
}
