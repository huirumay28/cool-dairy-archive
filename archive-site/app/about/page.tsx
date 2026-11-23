export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">About</p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">The Archive</h1>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Cool Dairy is Huiru Huang's vintage shop. This is the archive that sits beside it — 
          research, not merch.
        </p>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What This Is</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The archive tells the stories of iconic women's OUTFITS: moments where what she wore 
            was a cultural moment (especially in feminist history), carried a feminist message, 
            or is undeniably iconic.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Each moment is documented with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>Who she was and when it happened</li>
            <li>What she wore — the actual garments, described in detail</li>
            <li>Why it mattered — the cultural, political, or feminist significance</li>
            <li>Where the garment lives now, if known</li>
            <li>Verified sources for every claim</li>
            <li>Media: public-domain/CC images, credited press photos, and official embeds</li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How It's Built</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Content comes only from the research notes and verified sources. We don't invent 
            designers, seasons, quotes, or dates. If a source doesn't name a designer, neither do we.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Images follow strict rules:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>Public-domain and Creative Commons images are hosted with full attribution</li>
            <li>Copyrighted press photos are linked to their credited sources, not rehosted</li>
            <li>Official YouTube, Instagram, and Threads posts are embedded properly</li>
            <li>When an embed fails or isn't available, we show a credited link card</li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Categories</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This archive organizes moments so that writers, activists, politicians, and actresses 
            are first-class alongside musicians. You can browse by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li><strong>Category:</strong> writer, activist, politician, actress, musician</li>
            <li><strong>Region:</strong> North America, Europe, East Asia, South Asia, Southeast Asia, Oceania, etc.</li>
            <li><strong>Asian women:</strong> 14 of 30 new moments feature Asian women</li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sensitive Content</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Some moments carry content warnings (marked with ⚠). These are moments that involve 
            sensitive historical context — for example, the Virginia Woolf Dreadnought hoax 
            involves blackface, or Phoolan Devi is a contested figure. We include these with 
            full context from the National Portrait Gallery and other authoritative sources, or 
            exclude them entirely.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Brand Feel</h2>
          <p className="text-gray-700 leading-relaxed">
            Punk-rock badass women, 00s/y2k energy, zine-like but PREMIUM. Understated, editorial, 
            not cutesy or tacky. Think: clean layouts that let the stories breathe, mobile-first 
            design, and typography that feels like a research archive, not a lifestyle blog.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Cool Dairy · Huiru Huang · Taipei
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Shop: <a href="https://cool-dairy-vintage.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cool-dairy-vintage.vercel.app</a>
          </p>
        </section>
      </div>
    </div>
  );
}
