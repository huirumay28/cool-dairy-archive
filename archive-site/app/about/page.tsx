export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 border-b-2 border-black pb-8">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-3">About</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">The Archive</h1>
      </div>
      
      <div className="prose prose-lg max-w-none space-y-8">
        <div className="text-xl leading-relaxed border-l-4 border-black pl-6">
          Cool Dairy is Huiru Huang's vintage shop. This is the archive that sits beside it — 
          research, not merch.
        </div>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">What This Is</h2>
          <p className="leading-relaxed mb-4">
            The archive tells the stories of iconic women's OUTFITS: moments where what she wore 
            was a cultural moment (especially in feminist history), carried a feminist message, 
            or is undeniably iconic.
          </p>
          <p className="leading-relaxed mb-4">
            Each moment is documented with:
          </p>
          <ul className="space-y-2 mb-4 list-disc list-inside">
            <li>Who she was and when it happened</li>
            <li>What she wore — the actual garments, described in detail</li>
            <li>Why it mattered — the cultural, political, or feminist significance</li>
            <li>Where the garment lives now, if known</li>
            <li>Verified sources for every claim</li>
            <li>Media: public-domain/CC images, credited press photos, and official embeds</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">How It's Built</h2>
          <p className="leading-relaxed mb-4">
            Content comes only from the research notes and verified sources. We don't invent 
            designers, seasons, quotes, or dates. If a source doesn't name a designer, neither do we.
          </p>
          <p className="leading-relaxed mb-4">
            Images follow strict rules:
          </p>
          <ul className="space-y-2 mb-4 list-disc list-inside">
            <li>Public-domain and Creative Commons images are hosted with full attribution</li>
            <li>Copyrighted press photos are linked to their credited sources, not rehosted</li>
            <li>Official YouTube, Instagram, and Threads posts are embedded properly</li>
            <li>When an embed fails or isn't available, we show a credited link card</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">The Categories</h2>
          <p className="leading-relaxed mb-4">
            This archive organizes moments so that writers, activists, politicians, and actresses 
            are first-class alongside musicians. You can browse by:
          </p>
          <ul className="space-y-2 mb-4 list-disc list-inside">
            <li><strong>Category:</strong> writer, activist, politician, actress, musician</li>
            <li><strong>Region:</strong> North America, Europe, East Asia, South Asia, Southeast Asia, Oceania, etc.</li>
            <li><strong>Asian women:</strong> 19 moments feature Asian women</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">The Brand Feel</h2>
          <p className="leading-relaxed">
            Punk-rock badass women, 00s/y2k energy, zine-like but premium. Understated, editorial, 
            not cutesy or tacky. Think: clean layouts that let the stories breathe, mobile-first 
            design, and typography that feels like a research archive, not a lifestyle blog.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">Contact</h2>
          <p className="leading-relaxed">
            Cool Dairy · Huiru Huang · Taipei
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Shop: <a href="https://cool-dairy-vintage.vercel.app" target="_blank" rel="noopener noreferrer" className="border-b border-black hover:bg-black hover:text-white transition-colors">cool-dairy-vintage.vercel.app</a>
          </p>
        </section>
      </div>
    </div>
  );
}
