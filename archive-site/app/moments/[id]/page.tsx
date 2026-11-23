import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMomentById, getAllMoments, cleanText, getSensitivityWarning, isValidUrl, getUrlDisplayName, commonsImage } from '@/lib/data';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import InstagramEmbed from '@/components/InstagramEmbed';
import ThreadsEmbed from '@/components/ThreadsEmbed';

export async function generateStaticParams() {
  const moments = getAllMoments();
  
  return moments.map((moment) => ({
    id: moment.id,
  }));
}

export default async function MomentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const moment = getMomentById(id);
  
  if (!moment) {
    notFound();
  }
  
  const sensitivityWarning = getSensitivityWarning(moment);
  
  // Clean text for display
  const cleanedOutfit = cleanText(moment.outfit);
  const cleanedWhy = cleanText(moment.why);
  const cleanedPlace = cleanText(moment.place);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm font-mono">
        <Link href="/moments" className="text-gray-600 hover:text-black border-b border-gray-400 hover:border-black transition-colors">
          ← All moments
        </Link>
      </nav>
      
      {/* Header */}
      <header className="mb-12 border-b border-black pb-8">
        <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-wider">
          <span className="px-2 py-1 bg-black text-white">
            {moment.category}
          </span>
          {moment.asian && (
            <span className="px-2 py-1 border border-black">
              Asian
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {moment.who}
        </h1>
        
        <div className="font-mono text-sm space-y-1 text-gray-700">
          <div>{moment.date}</div>
          <div>{cleanedPlace}</div>
        </div>
        
        {/* Sensitivity Warning */}
        {sensitivityWarning && (
          <div className="mt-6 p-4 border-2 border-black bg-white">
            <p className="font-mono text-xs uppercase tracking-wider mb-2">Content Note</p>
            <p className="text-sm leading-relaxed">{sensitivityWarning}</p>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <div className="space-y-12">
        {/* What She Wore */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">What She Wore</h2>
          <div className="prose prose-sm max-w-none">
            <p className="leading-relaxed whitespace-pre-wrap">{cleanedOutfit}</p>
          </div>
        </section>
        
        {/* Designer / Label */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Designer / Label</h2>
          <div className="prose prose-sm max-w-none">
            <p className="leading-relaxed">{cleanText(moment.label)}</p>
          </div>
        </section>
        
        {/* Why This Moment */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Why This Moment Matters</h2>
          <div className="prose prose-sm max-w-none">
            <p className="leading-relaxed whitespace-pre-wrap">{cleanedWhy}</p>
          </div>
        </section>
        
        {/* Where It Lives Now */}
        {moment.where && (
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Where the Garment Lives Now</h2>
            <div className="prose prose-sm max-w-none">
              <p className="leading-relaxed">{cleanText(moment.where)}</p>
            </div>
          </section>
        )}
        
        {/* Media */}
        {moment.media && moment.media.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-black pb-2">Images</h2>
            <div className="space-y-6">
              {moment.media.map((item, i) => {
                const isPDCC = item.kind.toLowerCase().includes('pd') || 
                               item.kind.toLowerCase().includes('cc') ||
                               item.rights.toLowerCase().includes('public-domain') ||
                               item.rights.toLowerCase().includes('cc0') ||
                               item.rights.toLowerCase().includes('cc by');
                
                return (
                  <div key={i} className="border border-gray-300 p-4">
                    <div className="mb-3">
                      <span className="font-mono text-xs uppercase px-2 py-1 bg-gray-100">
                        {item.kind}
                      </span>
                    </div>
                    
                    {isPDCC && !item.kind.includes('?') && !sensitivityWarning && commonsImage(item.url) ? (
                      <figure>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block bg-[#efebe3]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={commonsImage(item.url)!.thumb}
                            alt={`${moment.who}: ${item.kind}`}
                            loading="lazy"
                            className="w-full max-h-[640px] object-contain"
                          />
                        </a>
                        <figcaption className="font-mono text-xs text-gray-600 mt-3 space-y-1">
                          <p>Photo: {commonsImage(item.url)!.artist}. {commonsImage(item.url)!.license_url ? (<a href={commonsImage(item.url)!.license_url} target="_blank" rel="noopener noreferrer" className="border-b border-gray-400 hover:border-black">{commonsImage(item.url)!.license}</a>) : commonsImage(item.url)!.license}. Via <a href={item.url} target="_blank" rel="noopener noreferrer" className="border-b border-gray-400 hover:border-black">Wikimedia Commons</a>.</p>
                          {item.note && <p className="italic">{item.note}</p>}
                        </figcaption>
                      </figure>
                    ) : isPDCC ? (
                      <div>
                        <p className="text-sm mb-2">
                          Public domain / Creative Commons image
                        </p>
                        <p className="mb-3">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="border-b-2 border-black hover:bg-black hover:text-white transition-colors font-medium"
                          >
                            {getUrlDisplayName(item.url)}
                          </a>
                        </p>
                        <div className="font-mono text-xs text-gray-600 space-y-1">
                          <p><span className="font-bold">Credit:</span> {item.credit}</p>
                          <p><span className="font-bold">License:</span> {item.rights}</p>
                          {item.note && <p className="italic">{cleanText(item.note)}</p>}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm mb-2">
                          Copyrighted image — view at source
                        </p>
                        <p className="mb-3">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="border-b-2 border-black hover:bg-black hover:text-white transition-colors font-medium"
                          >
                            {getUrlDisplayName(item.url)}
                          </a>
                        </p>
                        <div className="font-mono text-xs text-gray-600 space-y-1">
                          <p><span className="font-bold">Credit:</span> {item.credit}</p>
                          <p><span className="font-bold">Rights:</span> {item.rights}</p>
                          {item.note && <p className="italic">{cleanText(item.note)}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
        
        {/* Embeds */}
        {moment.embeds && moment.embeds.filter(e => isValidUrl(e.url)).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-black pb-2">Video & Social Media</h2>
            <div className="space-y-6">
              {moment.embeds.filter(e => isValidUrl(e.url)).map((embed, i) => (
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
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Rookie Tie-ins */}
        {moment.rookie_tie_in && moment.rookie_tie_in.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Rookie Context</h2>
            <div className="space-y-4">
              {moment.rookie_tie_in.map((item, i) => (
                <div key={i} className="border-l-4 border-black pl-4">
                  <p className="font-bold mb-1">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="border-b border-black hover:bg-black hover:text-white transition-colors">
                      {item.title}
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">{item.why}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Sources */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Sources</h2>
          <ol className="space-y-2 font-mono text-sm">
            {moment.sources.map((source, i) => (
              <li key={i}>
                {i + 1}.{' '}
                <a 
                  href={source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border-b border-gray-400 hover:border-black hover:bg-black hover:text-white transition-colors"
                >
                  {getUrlDisplayName(source)}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
      
      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-black">
        <Link 
          href="/moments"
          className="inline-block font-mono text-sm border-b border-black hover:bg-black hover:text-white transition-colors px-1"
        >
          ← All moments
        </Link>
      </div>
    </div>
  );
}
