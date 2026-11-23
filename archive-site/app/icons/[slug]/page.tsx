import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getIconBySlug, getExistingIcons } from '@/lib/server-data';
import { cleanText } from '@/lib/data';

export async function generateStaticParams() {
  const icons = getExistingIcons();
  
  return icons.map((icon) => ({
    slug: icon.slug,
  }));
}

export default async function IconPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icon = getIconBySlug(slug);
  
  if (!icon) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm font-mono">
        <Link href="/icons" className="text-gray-600 hover:text-black border-b border-gray-400 hover:border-black transition-colors">
          ← All icons
        </Link>
      </nav>
      
      {/* Header */}
      <header className="mb-12 border-b border-black pb-8">
        <div className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-4">Icon</div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {icon.name}
        </h1>
        
        {icon.who_line && (
          <p className="text-xl mb-4 leading-relaxed text-gray-800">{cleanText(icon.who_line)}</p>
        )}
        
        <div className="font-mono text-sm space-y-1 text-gray-700">
          {icon.born && <div>Born {icon.born}</div>}
          {icon.years_active && <div>Active {icon.years_active}</div>}
        </div>
      </header>
      
      {/* Main Content */}
      <div className="space-y-12">
        {/* The Person */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-black pb-2">The Person</h2>
          <div className="prose prose-sm max-w-none space-y-4">
            {icon.who && icon.who.map((p, i) => (
              <p key={i} className="leading-relaxed">{cleanText(p)}</p>
            ))}
          </div>
          
          {icon.work && icon.work.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">The Work</h3>
              <div className="prose prose-sm max-w-none space-y-4">
                {icon.work.map((p, i) => (
                  <p key={i} className="leading-relaxed">{cleanText(p)}</p>
                ))}
              </div>
            </div>
          )}
          
          {icon.why_the_look && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Why the Look</h3>
              <p className="leading-relaxed">{cleanText(icon.why_the_look)}</p>
            </div>
          )}
          
          {icon.beliefs && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Influences</h3>
              <p className="leading-relaxed text-gray-700">{cleanText(icon.beliefs)}</p>
            </div>
          )}
        </section>
        
        {/* Quotes */}
        {icon.quotes && icon.quotes.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-black pb-2">In Her Words</h2>
            <div className="space-y-6">
              {icon.quotes.map((q, i) => (
                <blockquote key={i} className="border-l-4 border-black pl-6 py-2">
                  <p className="text-base leading-relaxed mb-3">"{cleanText(q.text)}"</p>
                  <cite className="font-mono text-xs text-gray-600 not-italic">
                    {q.said_to && <span>{q.said_to}</span>}
                    {q.year && <span>, {q.year}</span>}
                    {q.url && (
                      <span>
                        {' '}—{' '}
                        <a href={q.url} target="_blank" rel="noopener noreferrer" className="border-b border-gray-400 hover:border-black">
                          source
                        </a>
                      </span>
                    )}
                  </cite>
                </blockquote>
              ))}
            </div>
          </section>
        )}
        
        {/* Moments */}
        {icon.moments && icon.moments.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8 border-b border-black pb-2">The Clothes</h2>
            <div className="space-y-12">
              {icon.moments.map((moment, i) => (
                <article key={i} className="border-t border-gray-300 pt-8" id={`m${i+1}`}>
                  <div className="font-mono text-xs uppercase text-gray-600 mb-2">{moment.year}</div>
                  <h3 className="text-xl font-bold mb-4">{moment.title}</h3>
                  
                  {moment.garments && (
                    <div className="mb-4">
                      <p className="font-bold text-sm mb-1">Garments</p>
                      <p className="text-sm leading-relaxed">{cleanText(moment.garments)}</p>
                    </div>
                  )}
                  
                  {moment.designer_season && (
                    <div className="mb-4">
                      <p className="font-bold text-sm mb-1">Designer / Season</p>
                      <p className="text-sm leading-relaxed">{cleanText(moment.designer_season)}</p>
                    </div>
                  )}
                  
                  {moment.why_iconic && (
                    <div className="mb-4">
                      <p className="text-sm leading-relaxed">{cleanText(moment.why_iconic)}</p>
                    </div>
                  )}
                  
                  {moment.where_it_lives && (
                    <div className="mb-4">
                      <p className="font-bold text-sm mb-1">Where It Lives</p>
                      <p className="text-sm text-gray-700">{cleanText(moment.where_it_lives)}</p>
                    </div>
                  )}
                  
                  {moment.media && moment.media.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                      {moment.media.map((media, j) => {
                        if (media.type === 'pair') {
                          if (!media.source_url) return null;
                          let host = media.source_url;
                          try { host = new URL(media.source_url).hostname.replace('www.', ''); } catch {}
                          return (
                            <p key={j} className="font-mono text-xs text-gray-600 sm:col-span-2">
                              Photo (rights-held):{' '}
                              <a href={media.source_url} target="_blank" rel="noopener noreferrer" className="border-b border-gray-400 hover:border-black">
                                view at {host} ↗
                              </a>
                            </p>
                          );
                        }
                        
                        if (media.type === 'youtube' && media.src) {
                          return (
                            <div key={j} className="aspect-video sm:col-span-2">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube-nocookie.com/embed/${media.src}`}
                                title={media.caption || 'YouTube video'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="border-0"
                              />
                            </div>
                          );
                        }
                        
                        if (media.type === 'image' && media.src) {
                          const src = media.src.startsWith('http') ? media.src : '/' + media.src.replace(/^\/+/, '');
                          return (
                            <figure key={j}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={src} alt={media.caption || icon.name} loading="lazy" className="w-full max-h-[720px] object-contain bg-[#efebe3]" />
                              <figcaption className="font-mono text-xs text-gray-600 mt-2 space-y-1">
                                {media.caption && <p>{media.caption}</p>}
                                {media.credit && (
                                  <p>
                                    {media.credit}
                                    {media.source_url && (
                                      <>
                                        {' · '}
                                        <a href={media.source_url} target="_blank" rel="noopener noreferrer" className="border-b border-gray-400 hover:border-black">source</a>
                                      </>
                                    )}
                                  </p>
                                )}
                              </figcaption>
                            </figure>
                          );
                        }
                        
                        return null;
                      })}
                    </div>
                  )}
                  
                  {moment.sources && moment.sources.length > 0 && (
                    <div className="mt-4">
                      <p className="font-mono text-xs uppercase text-gray-600 mb-2">Sources</p>
                      <ul className="space-y-1">
                        {moment.sources.map((src, j) => (
                          <li key={j}>
                            <a href={src} target="_blank" rel="noopener noreferrer" className="text-xs border-b border-gray-400 hover:border-black">
                              {src.includes('//') ? new URL(src).hostname.replace('www.', '') : src}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
        
        {/* Sources */}
        {icon.sources && icon.sources.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Sources</h2>
            <ol className="space-y-2 font-mono text-sm">
              {icon.sources.map((source, i) => (
                <li key={i}>
                  {i + 1}.{' '}
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border-b border-gray-400 hover:border-black hover:bg-black hover:text-white transition-colors"
                  >
                    {source.title || source.url}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
      
      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-black">
        <Link 
          href="/icons"
          className="inline-block font-mono text-sm border-b border-black hover:bg-black hover:text-white transition-colors px-1"
        >
          ← All icons
        </Link>
      </div>
    </div>
  );
}
