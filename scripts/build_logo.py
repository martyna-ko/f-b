"""Build Find Balans logo SVGs from Josefin Sans Bold outlines.
Proportions measured from the Canva logo export (617x323 px)."""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

font = TTFont(sys.argv[1]); out = sys.argv[2]
gs = font.getGlyphSet(); cmap = font.getBestCmap(); upm = font['head'].unitsPerEm

def word(text, cap_h, total_w, cx, baseline):
    """Lay out text with even tracking so it spans total_w, centred on cx."""
    glyphs = [cmap[ord(c)] for c in text]
    bounds = []
    for g in glyphs:
        bp = BoundsPen(gs); gs[g].draw(bp); bounds.append(bp.bounds)
    cap = max(b[3] for b in bounds)               # cap height in font units
    s = cap_h / cap
    ink = [(b[2]-b[0])*s for b in bounds]
    gap = (total_w - sum(ink)) / (len(text)-1)
    x = cx - total_w/2; d = ""
    for g, b, w in zip(glyphs, bounds, ink):
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (s, 0, 0, -s, x - b[0]*s, baseline))
        gs[g].draw(tp); d += pen.getCommands()
        x += w + gap
    return d

W, H = 320, 196; cx = W/2
find   = word("FIND",   14, 76,  cx, 50)
balans = word("BALANS", 22, 280, cx, 88)
def svg(color, title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t">
  <title id="t">{title}</title>
  <g fill="{color}">
    <path d="{find}"/>
    <path d="{balans}"/>
    <rect x="{cx-155}" y="104.5" width="310" height="3"/>
  </g>
  <circle cx="{cx}" cy="154" r="28" fill="none" stroke="{color}" stroke-width="3"/>
</svg>
'''
for name, col in [("find-balans-logo-black", "#000000"), ("find-balans-logo-white", "#FFFFFF")]:
    open(f"{out}/{name}.svg", "w").write(svg(col, "Find Balans"))
print("ok")
