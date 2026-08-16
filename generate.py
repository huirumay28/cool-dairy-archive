#!/usr/bin/env python3
"""Cool Dairy Archive — static generator.

Add an icon or a brand by dropping a JSON file in content/icons/ or
content/brands/, then run:

    python3 generate.py

Homepage and listing grids are built from whatever files exist.
Sort key: the JSON `sort` field, then `name`. There is no hardcoded
list of nine icons or fifteen brands.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONTENT = ROOT / "content"
OUT = ROOT

DATE = "Sunday 16 August 2026"


def esc(s) -> str:
    if s is None:
        return ""
    return html.escape(str(s), quote=True)


def load_all(kind: str) -> list[dict]:
    folder = CONTENT / kind
    items = []
    for path in sorted(folder.glob("*.json")):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)
        data["_file"] = path.name
        items.append(data)
    items.sort(key=lambda x: (x.get("sort", 9999), (x.get("name") or "").lower()))
    return items


def prefix_for(rel_path: str) -> str:
    depth = Path(rel_path).parent.as_posix()
    if depth in (".", ""):
        return ""
    return "../" * len(Path(rel_path).parent.parts)


def asset(src: str, prefix: str) -> str:
    if not src:
        return ""
    if src.startswith("http://") or src.startswith("https://") or src.startswith("//"):
        return src
    return f"{prefix}{src.lstrip('/')}"


def header(prefix: str, current: str = "") -> str:
    def nav(href, label, key):
        cur = ' aria-current="page"' if current == key else ""
        return f'<a href="{prefix}{href}"{cur}>{label}</a>'

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{title}}</title>
  <meta name="description" content="Cool Dairy Archive — rock, punk and new-wave looks. Designer and season only when sourced.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{prefix}css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a class="mark" href="{prefix}index.html">cool dairy <span>archive</span></a>
      <nav class="nav" aria-label="Primary">
        {nav("icons/index.html", "Icons", "icons")}
        {nav("brands/index.html", "Brands", "brands")}
        {nav("about.html", "About", "about")}
      </nav>
    </div>
  </header>
  <main>
"""


def footer(prefix: str) -> str:
    return f"""  </main>
  <footer class="site-footer">
    <div class="wrap">
      <p class="pledge">Sources on every page. We don’t invent designers or quotes.</p>
      <p>cool dairy · Huiru Huang · a vintage shop archive · Taipei</p>
      <p><a href="{prefix}index.html">Home</a> · <a href="{prefix}icons/index.html">Icons</a> · <a href="{prefix}brands/index.html">Brands</a> · <a href="{prefix}about.html">About</a></p>
    </div>
  </footer>
</body>
</html>
"""


def render_media(item: dict, prefix: str) -> str:
    typ = (item.get("type") or "image").lower()
    src = item.get("src") or ""
    caption = item.get("caption") or ""
    credit = item.get("credit") or ""
    source_url = item.get("source_url") or ""
    cap_bits = []
    if caption:
        cap_bits.append(esc(caption))
    if credit:
        cap_bits.append(f"<em>{esc(credit)}</em>")
    if source_url:
        cap_bits.append(f'<a href="{esc(source_url)}">source</a>')
    figcap = f"<figcaption>{' · '.join(cap_bits)}</figcaption>" if cap_bits else ""

    if typ == "youtube":
        title = esc(caption or "YouTube")
        return f"""<figure class="media-yt">
  <div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/{esc(src)}" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
  {figcap}
</figure>"""
    if typ == "iframe":
        return f"""<figure class="media-yt">
  <div class="yt"><iframe src="{esc(src)}" title="{esc(caption or 'Embedded media')}" allowfullscreen loading="lazy"></iframe></div>
  {figcap}
</figure>"""
    if typ == "pair":
        search = item.get("search") or caption
        url = source_url or src
        return f"""<div class="pair">
  <strong>Photo-pair</strong>
  <p>Search: {esc(search)}</p>
  <p>{f'<a href="{esc(url)}">{esc(url)}</a>' if url else "No freely downloadable still."}</p>
</div>"""
    if not src:
        return ""
    href = asset(src, prefix)
    img = f'<img src="{esc(href)}" alt="{esc(caption or credit or "Look")}">'
    if source_url:
        img = f'<a href="{esc(source_url)}">{img}</a>'
    return f"<figure>{img}{figcap}</figure>"


def media_block(items: list | None, prefix: str, extra_class: str = "") -> str:
    if not items:
        return ""
    figs = [render_media(m, prefix) for m in items if m]
    figs = [f for f in figs if f]
    if not figs:
        return ""
    cls = "media" + (" single" if len(figs) == 1 else "") + (f" {extra_class}" if extra_class else "")
    return f'<div class="{cls}">' + "\n".join(figs) + "</div>"


def sources_list(sources) -> str:
    if not sources:
        return ""
    lis = []
    for s in sources:
        if isinstance(s, str):
            url, title = s, s
        else:
            url = s.get("url") or ""
            title = s.get("title") or url
        if url:
            lis.append(f'<li><a href="{esc(url)}">{esc(title)}</a></li>')
        else:
            lis.append(f"<li>{esc(title)}</li>")
    return "<ol>\n" + "\n".join(lis) + "\n</ol>"


def card(item: dict, href: str, prefix: str, kind: str) -> str:
    name = item.get("name") or ""
    sub = item.get("card_sub") or ""
    img = item.get("card_image")
    fig = ""
    if img:
        obj = " object" if item.get("card_object") else ""
        fig = f'<div class="card-fig{obj}"><img src="{esc(asset(img, prefix))}" alt="{esc(name)}"></div>'
    else:
        fig = f'<div class="card-fig missing"><div class="ghost">{esc(name)}</div></div>'
    tier = item.get("tier")
    tier_html = ""
    if tier:
        tclass = "tier"
        low = tier.lower()
        if "halo" in low:
            tclass += " tier-halo"
        elif "watch" in low:
            tclass += " tier-watch"
        tier_html = f'<div class="{tclass}">{esc(tier)}</div>'
    return f"""    <a class="card" href="{esc(href)}">
      {fig}
      <div class="card-body">
        {tier_html}
        <p class="card-label">{esc(kind)}</p>
        <h3 class="card-name">{esc(name)}</h3>
        <p class="card-sub">{esc(sub)}</p>
      </div>
    </a>"""


def write(rel: str, title: str, body: str, current: str = "") -> None:
    prefix = prefix_for(rel)
    page = header(prefix, current).replace("{title}", esc(title)) + body + footer(prefix)
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(page, encoding="utf-8")
    print("wrote", dest.relative_to(ROOT))


def icon_page(icon: dict, prefix: str) -> str:
    name = icon.get("name") or ""
    who_line = icon.get("who_line") or ""
    born = icon.get("born") or ""
    years = icon.get("years_active") or ""
    meta = " · ".join(x for x in [born and f"Born {born}", years] if x)

    who = "".join(f"<p>{esc(p)}</p>" for p in icon.get("who") or [])
    work = "".join(f"<p>{esc(p)}</p>" for p in icon.get("work") or [])
    beliefs = icon.get("beliefs") or ""
    why = icon.get("why_the_look") or ""

    quotes_html = ""
    for q in icon.get("quotes") or []:
        said = " · ".join(x for x in [q.get("said_to"), q.get("year")] if x)
        url = q.get("url") or ""
        cite = esc(said)
        if url:
            cite = f'<a href="{esc(url)}">{cite or "source"}</a>'
        quotes_html += f"""<blockquote class="quote">
  <p>“{esc(q.get("text") or "")}”</p>
  <cite>{cite}</cite>
</blockquote>"""

    moments_nav = ""
    moments_html = ""
    for i, m in enumerate(icon.get("moments") or []):
        mid = f"m{i+1}"
        moments_nav += f'<a href="#{mid}">{esc(m.get("title") or m.get("year") or "Moment")}</a>'
        lives = m.get("where_it_lives")
        lives_html = esc(lives) if lives else '<span class="none">not accessioned / not a museum object</span>'
        designer = m.get("designer_season") or "none / unsourced"
        none = " none" if designer.lower().startswith("none") or "unsourced" in designer.lower() else ""
        facts = f"""<dl class="facts">
  <dt>Garments</dt><dd>{esc(m.get("garments") or "—")}</dd>
  <dt>Designer / season</dt><dd class="{none.strip()}">{esc(designer)}</dd>
  <dt>Where it lives</dt><dd>{lives_html}</dd>
</dl>"""
        moments_html += f"""<article class="era" id="{mid}">
  <p class="era-year">{esc(m.get("year") or "")}</p>
  <h3>{esc(m.get("title") or "")}</h3>
  <p>{esc(m.get("why_iconic") or "")}</p>
  {facts}
  {media_block(m.get("media"), prefix)}
</article>"""

    return f"""    <div class="wrap">
      <header class="mast">
        <p class="kicker">Icon</p>
        <h1>{esc(name)}</h1>
        <p class="deck">{esc(who_line)}</p>
        <p class="dateline">{esc(meta)} · filed {DATE}</p>
      </header>

      <section class="section person" id="person">
        <h2>The person</h2>
        {who}
        <h3>The work</h3>
        {work}
        {f'<h3>Why the look existed</h3><p class="why">{esc(why)}</p>' if why else ""}
        {quotes_html}
        {f'<h3>What she was reading, hearing, looking at</h3><p>{esc(beliefs)}</p>' if beliefs else ""}
      </section>

      <section class="section" id="clothes">
        <div class="section-head">
          <h2>The clothes</h2>
        </div>
        <nav class="era-nav" aria-label="Moments">{moments_nav}</nav>
        {moments_html}
      </section>

      <section class="sources">
        <h2>Sources</h2>
        {sources_list(icon.get("sources"))}
      </section>
    </div>
"""


def brand_page(brand: dict, prefix: str) -> str:
    name = brand.get("name") or ""
    founded = brand.get("founded") or ""
    founders = brand.get("founders") or ""
    wf = brand.get("women_founded")
    wf_line = ""
    if wf is True:
        wf_line = "Women-founded: yes."
    elif wf is False:
        wf_line = "Women-founded: no — do not invent one."
    elif isinstance(wf, str):
        wf_line = wf

    story = "".join(f"<p>{esc(p)}</p>" for p in brand.get("story") or [])
    codes = "".join(f"<li>{esc(c)}</li>" for c in brand.get("style_codes") or [])
    pieces = ""
    for p in brand.get("signature_pieces") or []:
        if isinstance(p, str):
            pieces += f"<li>{esc(p)}</li>"
        else:
            pieces += f"<li><strong>{esc(p.get('name') or '')}</strong> — {esc(p.get('note') or '')}</li>"

    quotes_html = ""
    for q in brand.get("quotes") or []:
        said = " · ".join(x for x in [q.get("said_to"), q.get("year")] if x)
        url = q.get("url") or ""
        cite = f'<a href="{esc(url)}">{esc(said or "source")}</a>' if url else esc(said)
        quotes_html += f"""<blockquote class="quote">
  <p>“{esc(q.get("text") or "")}”</p>
  <cite>{cite}</cite>
</blockquote>"""

    links = ""
    for L in brand.get("lookbook_links") or []:
        links += f'<li><a href="{esc(L.get("url") or "")}">{esc(L.get("title") or L.get("url"))}</a>'
        if L.get("note"):
            links += f" — {esc(L['note'])}"
        links += "</li>"

    media = brand.get("media") or []
    hero = media[:2]
    rest = media[2:]

    return f"""    <div class="wrap">
      <header class="mast">
        <p class="kicker">Brand{f' · {esc(brand.get("tier"))}' if brand.get("tier") else ""}</p>
        <h1>{esc(name)}</h1>
        <p class="deck">{esc(founders)}</p>
        <p class="dateline">Founded {esc(founded)}{f' · {esc(wf_line)}' if wf_line else ""} · filed {DATE}</p>
      </header>

      <section class="section" id="clothes">
        <h2>The clothes</h2>
        <p class="lede">Garments first. Museum objects, runway stills, lookbooks. Captions name a collection or year only when a source does.</p>
        {media_block(hero, prefix, "gallery-hero")}
        {media_block(rest, prefix, "gallery")}
        {f'<h3>Lookbooks and runways elsewhere</h3><ul class="codes">{links}</ul>' if links else ""}
      </section>

      <section class="section person" id="story">
        <h2>Founder story</h2>
        {story}
        {quotes_html}
      </section>

      <section class="section">
        <h2>Style codes</h2>
        <ul class="codes">{codes}</ul>
        <h3>Signature pieces</h3>
        <ul class="codes">{pieces}</ul>
      </section>

      <section class="sources">
        <h2>Sources</h2>
        {sources_list(brand.get("sources"))}
      </section>
    </div>
"""


def build() -> None:
    icons = load_all("icons")
    brands = load_all("brands")
    if not icons:
        raise SystemExit("No content/icons/*.json found")
    if not brands:
        raise SystemExit("No content/brands/*.json found")

    # homepage
    icon_cards = "\n".join(card(i, f"icons/{i['slug']}.html", "", "Icon") for i in icons)
    brand_cards = "\n".join(card(b, f"brands/{b['slug']}.html", "", "Brand") for b in brands)
    home = f"""    <div class="wrap">
      <header class="mast">
        <p class="kicker">A shop archive</p>
        <h1>cool dairy archive</h1>
        <p class="deck">A small independent file attached to Huiru Huang’s vintage rock, punk and new-wave shop. The women on the records, and the houses that dressed them — or that they dressed themselves against.</p>
        <p class="dateline">{DATE} · Taipei</p>
      </header>
      <section class="section">
        <p class="lede">We list a designer and a season only when a source names them. A nightgown from TK Maxx stays a nightgown from TK Maxx. A catsuit in the V&amp;A stays unsigned if the object record is unsigned. Icons and brands only. No shop floor. No pulse.</p>
      </section>
      <section class="section">
        <div class="section-head">
          <h2>Icons</h2>
          <a href="icons/index.html">All {len(icons)} →</a>
        </div>
        <div class="grid-icons">
{icon_cards}
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <h2>Brands</h2>
          <a href="brands/index.html">All {len(brands)} →</a>
        </div>
        <div class="grid-brands">
{brand_cards}
        </div>
      </section>
    </div>
"""
    write("index.html", "Cool Dairy Archive", home)

    # listings
    icards = "\n".join(card(i, f"{i['slug']}.html", "../", "Icon") for i in icons)
    write(
        "icons/index.html",
        "Icons — Cool Dairy Archive",
        f"""    <div class="wrap">
      <header class="mast">
        <p class="kicker">Icons</p>
        <h1>The women on the records</h1>
        <p class="deck">Equal files. Each page starts with the person, then the clothes. Adding another icon is a new JSON file, not a rewrite of this grid.</p>
        <p class="dateline">{len(icons)} files · {DATE}</p>
      </header>
      <div class="grid-icons">{icards}</div>
    </div>
""",
        current="icons",
    )

    bcards = "\n".join(card(b, f"{b['slug']}.html", "../", "Brand") for b in brands)
    write(
        "brands/index.html",
        "Brands — Cool Dairy Archive",
        f"""    <div class="wrap">
      <header class="mast">
        <p class="kicker">Brands</p>
        <h1>Houses, shops, one-offs</h1>
        <p class="deck">Founder story, style codes, signature pieces — and as many garments as we can source. Equal cards. A new house is a new JSON file.</p>
        <p class="dateline">{len(brands)} files · {DATE}</p>
      </header>
      <div class="grid-brands">{bcards}</div>
    </div>
""",
        current="brands",
    )

    about = f"""    <div class="wrap">
      <header class="mast">
        <p class="kicker">About</p>
        <h1>The paper next to the rail</h1>
        <p class="deck">Cool Dairy is Huiru Huang’s vintage shop. This is the archive that sits beside it — research, not merch.</p>
        <p class="dateline">{DATE}</p>
      </header>
      <article class="prose">
        <p>Cave Daily is the other desk: long, quiet, magazine-shaped. This file is newsprint. Milk-glass white, black ink, and one hot-pink accent — the unsigned 1995 neoprene catsuit now V&amp;A S.158-2021, used here as a colour, not as a throne.</p>
        <p>We are not a startup landing page and we are not selling a lifestyle. We are filing people and looks so the shop can buy, refuse, and talk without inventing a house.</p>
        <h2>How a page is written</h2>
        <p>Icon pages open with the person — who she is, what she made, what she said — and only then the clothes. Brand pages open with the garments, then the founder story. Every look names the garment, then designer and season only if verified, then where the piece lives now, then sources as real links. If a photograph is not on this disk, the page gives a photo-pair: a search string and a public URL. We do not hotlink rights-locked covers. We do not invent YouTube IDs; unverified clips stay as links.</p>
        <h2>How to add a file</h2>
        <p>Drop a JSON into <code>content/icons/</code> or <code>content/brands/</code> and run <code>python3 generate.py</code>. The homepage grids read the folders. There is no hardcoded list of names to edit.</p>
        <h2>Hard no’s, already decided</h2>
        <p>No invented designer on the 1995 pink catsuit. No invented designer on the Down by the Water dress — it is a TK Maxx nightgown. No Prada on Fiona Apple’s 1997 VMA crochet. No season on Christian Joy, Annie Mochnacz, Todd Lynn tour pieces, or Stephen Sprouse 1978. No Olivia × Balenciaga SS06 Lollapalooza. Do not use the 2007 lyrics dress as Let England Shake, or the 2016 Primavera shot as White Chalk.</p>
        <p class="rule-note">Open the HTML files in a browser after generate.py runs. Sources on every page. We don’t invent designers or quotes.</p>
      </article>
    </div>
"""
    write("about.html", "About — Cool Dairy Archive", about, current="about")

    for icon in icons:
        write(
            f"icons/{icon['slug']}.html",
            f"{icon.get('name')} — Cool Dairy Archive",
            icon_page(icon, "../"),
            current="icons",
        )
    for brand in brands:
        write(
            f"brands/{brand['slug']}.html",
            f"{brand.get('name')} — Cool Dairy Archive",
            brand_page(brand, "../"),
            current="brands",
        )

    print(f"OK  {len(icons)} icons  {len(brands)} brands")


if __name__ == "__main__":
    build()
