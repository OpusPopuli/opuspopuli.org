#!/usr/bin/env bash
#
# Regenerate all raster brand assets (PNG) from their source SVGs.
#
# The SVGs in public/ are the source of truth; the PNGs are baked outputs
# committed to the repo (so production never depends on local fonts). Re-run
# this only when a source SVG changes.
#
# Dependencies:
#   - rsvg-convert  (brew install librsvg)  — SVG -> PNG rasterizer
#   - Fonts: the logo/banner wordmarks use `Helvetica` (sans) and `Georgia`
#     (serif italic) via font-family stacks. If those exact faces are absent,
#     rsvg falls back to the nearest sans/serif and metrics shift slightly.
#     Install them, or accept the fallback, before regenerating logos/banners.
#
# Usage:  ./scripts/generate-brand-assets.sh   (run from repo root)

set -euo pipefail

command -v rsvg-convert >/dev/null 2>&1 || {
  echo "error: rsvg-convert not found. Install with: brew install librsvg" >&2
  exit 1
}

cd "$(dirname "$0")/.."

echo "→ favicons"
# favicon-16 uses a SIMPLIFIED source SVG (bold petals) so it reads at 16px;
# 32 and 512 use the detailed continuous-line mark (public/favicon.svg).
rsvg-convert -w 16  -h 16  public/favicons/favicon-16.svg -o public/favicons/favicon-16.png
rsvg-convert -w 32  -h 32  public/favicon.svg             -o public/favicons/favicon-32.png
rsvg-convert -w 512 -h 512 public/favicon.svg             -o public/favicons/favicon-512.png

echo "→ logo marks (512²)"
rsvg-convert -w 512 -h 512 public/logos/svg/op-mark-dark.svg  -o public/logos/png/op-mark-dark.png
rsvg-convert -w 512 -h 512 public/logos/svg/op-mark-light.svg -o public/logos/png/op-mark-light.png

echo "→ horizontal lockups (1200×300)"
rsvg-convert -w 1200 -h 300 public/logos/svg/op-horizontal-dark.svg  -o public/logos/png/op-horizontal-dark.png
rsvg-convert -w 1200 -h 300 public/logos/svg/op-horizontal-light.svg -o public/logos/png/op-horizontal-light.png

echo "→ social banners (2400×1260, 2× retina)"
rsvg-convert -w 2400 -h 1260 public/social/op-banner-dark.svg  -o public/social/op-banner-dark.png
rsvg-convert -w 2400 -h 1260 public/social/op-banner-light.svg -o public/social/op-banner-light.png

echo "✓ brand assets regenerated"
