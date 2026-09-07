"""
Generates public/og.png — the 1200x630 social preview card.

Run again after changing the wording:
    python3 scripts/make_og.py

Nothing here is decorative for its own sake: the bar motif is the same sample
series the site's chart panel uses, and every word is copy that appears on the
page. Fonts fall back to whatever the machine has (Lato / Liberation / DejaVu),
so the card is close to — not identical to — the site's Archivo + Plex Mono.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

INK = (7, 8, 10)
BONE = (237, 234, 227)
MUTE = (138, 143, 153)
FAINT = (118, 124, 134)
AMBER = (242, 179, 61)
LINE = (26, 28, 33)

OUT = Path(__file__).resolve().parents[1] / "public" / "og.png"

FONT_CANDIDATES = {
    "display": [
        "/usr/share/fonts/truetype/lato/Lato-Black.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ],
    "body": [
        "/usr/share/fonts/truetype/lato/Lato-Regular.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ],
    "mono": [
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationMono-Regular.ttf",
    ],
}


def font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES[kind]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def tracked(draw, xy, text, fnt, fill, tracking=0):
    """Letter-spaced text — PIL has no tracking, so step glyph by glyph."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=fnt, fill=fill)
        x += draw.textlength(char, font=fnt) + tracking
    return x


card = Image.new("RGB", (W, H), INK)
draw = ImageDraw.Draw(card)

# --- grid field ------------------------------------------------------------
for x in range(0, W, 68):
    draw.line([(x, 0), (x, H)], fill=(13, 14, 17), width=1)
for y in range(0, H, 68):
    draw.line([(0, y), (W, y)], fill=(13, 14, 17), width=1)

# --- amber bloom, top right ------------------------------------------------
# Power curve on the falloff so the mask reaches zero well inside its own box —
# a linear gradient leaves a faint square seam where the paste region ends.
glow_size = 1040
mask = Image.radial_gradient("L").resize((glow_size, glow_size))
mask = mask.point(lambda v: int((((255 - v) / 255) ** 2.1) * 255 * 0.34))
bloom = Image.new("RGB", (glow_size, glow_size), AMBER)
card.paste(bloom, (W - glow_size + 300, -glow_size // 2 + 150), mask)

draw = ImageDraw.Draw(card)

# --- frame -----------------------------------------------------------------
draw.rectangle([28, 28, W - 29, H - 29], outline=LINE, width=1)

PAD = 84
TOP = 118

# --- eyebrow ---------------------------------------------------------------
eyebrow = font("mono", 20)
tracked(draw, (PAD, TOP), "DATA ANALYST  ·  DATA SCIENCE  ·  AI", eyebrow, AMBER, tracking=2.4)

# --- name ------------------------------------------------------------------
name_font = font("display", 108)
draw.text((PAD - 4, TOP + 52), "Aayush Mishra", font=name_font, fill=BONE)

# --- headline --------------------------------------------------------------
body = font("body", 34)
draw.text((PAD, TOP + 196), "Turning data, code and AI", font=body, fill=BONE)
draw.text((PAD, TOP + 240), "into decisions that hold up.", font=body, fill=MUTE)

# --- rule + credentials ----------------------------------------------------
rule_y = TOP + 322
draw.line([(PAD, rule_y), (W - PAD, rule_y)], fill=(38, 40, 46), width=1)

small = font("mono", 19)
facts = [
    "B.Tech AI & Data Science, Galgotias University",
    "Top 50 — Smart India Hackathon",
    "Python · SQL · pandas · TensorFlow · Power BI",
]
y = rule_y + 30
for index, fact in enumerate(facts):
    draw.rectangle([PAD, y + 7, PAD + 5, y + 12], fill=AMBER if index == 1 else (60, 63, 70))
    draw.text((PAD + 20, y), fact, font=small, fill=BONE if index == 1 else FAINT)
    y += 34

# --- bar motif, bottom right (same sample series as the site's chart) ------
series = [18, 24, 21, 32, 29, 38, 41, 36, 47]
bar_w, gap, base_y, max_h = 16, 12, H - 96, 132
total = len(series) * bar_w + (len(series) - 1) * gap
start_x = W - PAD - total

for index, value in enumerate(series):
    height = int((value / 50) * max_h)
    x0 = start_x + index * (bar_w + gap)
    draw.rectangle([x0, base_y - height, x0 + bar_w - 1, base_y], fill=(150, 110, 40))
    draw.rectangle([x0, base_y - height, x0 + bar_w - 1, base_y - height + 3], fill=AMBER)

draw.line([(start_x - 12, base_y + 1), (W - PAD, base_y + 1)], fill=(52, 55, 62), width=1)
tracked(
    draw,
    (start_x - 12, base_y + 16),
    "SAMPLE SERIES",
    font("mono", 14),
    (70, 74, 82),
    tracking=1.6,
)

OUT.parent.mkdir(parents=True, exist_ok=True)
card.save(OUT, "PNG", optimize=True)
print(f"wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
