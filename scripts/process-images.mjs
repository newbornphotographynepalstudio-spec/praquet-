// One-off / re-runnable pipeline that turns the raw source photography in
// _incoming-assets/ into the optimized, responsive image set under public/images.
//
// Re-run with: npm run images:process
// Safe to re-run — it always regenerates outputs from the sources.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, '_incoming-assets')
const OUT = path.join(ROOT, 'public', 'images')

const FORMATS = [
  { ext: 'avif', opts: { quality: 55 } },
  { ext: 'webp', opts: { quality: 74 } },
  { ext: 'jpg', opts: { quality: 80, mozjpeg: true } },
]

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })
}

async function renderVariant({ input, outDir, name, width, aspect, position = 'centre', modulate }) {
  await ensureDir(outDir)
  const img = sharp(input)
  const meta = await img.metadata()
  const height = aspect ? Math.round(width / aspect) : null

  for (const { ext, opts } of FORMATS) {
    let pipeline = sharp(input)
    if (height) {
      pipeline = pipeline.resize({ width, height, fit: 'cover', position })
    } else {
      pipeline = pipeline.resize({
        width: Math.min(width, meta.width),
        withoutEnlargement: false,
      })
    }
    if (modulate) pipeline = pipeline.modulate(modulate)
    pipeline = pipeline.toFormat(ext, opts)
    await pipeline.toFile(path.join(outDir, `${name}-${width}.${ext}`))
  }
}

// Each job describes one logical image "role" and every crop/width it needs.
const jobs = [
  // ---- Hero -------------------------------------------------------------
  {
    input: path.join(SRC, 'hero-premium-interior.jpeg'),
    outDir: path.join(OUT, 'hero'),
    name: 'hero-desktop',
    aspect: 16 / 9,
    position: 'centre',
    widths: [960, 1440, 1920],
  },
  {
    input: path.join(SRC, 'hero-premium-interior.jpeg'),
    outDir: path.join(OUT, 'hero'),
    name: 'hero-mobile',
    aspect: 4 / 5,
    position: 'right',
    widths: [480, 750, 900],
  },
  // ---- Flooring collection (parquet) -------------------------------------
  {
    input: path.join(SRC, 'flooring-collection-parquet.jpeg'),
    outDir: path.join(OUT, 'flooring'),
    name: 'parquet-wide',
    aspect: 3 / 2,
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'flooring-collection-parquet.jpeg'),
    outDir: path.join(OUT, 'flooring'),
    name: 'parquet-tile',
    aspect: 4 / 5,
    position: 'centre',
    widths: [480, 720],
  },
  // ---- Wall panels collection (fluted) -----------------------------------
  {
    input: path.join(SRC, 'wall-panel-collection-fluted.jpeg'),
    outDir: path.join(OUT, 'wall-panels'),
    name: 'fluted-wide',
    aspect: 3 / 2,
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'wall-panel-collection-fluted.jpeg'),
    outDir: path.join(OUT, 'wall-panels'),
    name: 'fluted-tile',
    aspect: 4 / 5,
    position: 'centre',
    widths: [480, 720],
  },
  // ---- Before / after demo (NOT a real project — see IMAGE_SOURCES.md) --
  {
    input: path.join(SRC, 'before-living-room.jpeg'),
    outDir: path.join(OUT, 'before-after'),
    name: 'demo-before',
    aspect: 4 / 3,
    widths: [480, 768, 1024],
  },
  {
    input: path.join(SRC, 'after-living-room.jpeg'),
    outDir: path.join(OUT, 'before-after'),
    name: 'demo-after',
    aspect: 4 / 3,
    widths: [480, 768, 1024],
  },
  // ---- Product category strip (Phase 1.5, externally sourced — see
  // IMAGE_SOURCES.md for license/attribution). Tile = 4:5 (strip/related-grid
  // thumbnails), wide = 3:2 (Phase 2 material detail page heroes) — same
  // source photo, two crops, no new external sourcing needed.
  {
    input: path.join(SRC, 'spc-flooring-modern-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'spc-tile',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'spc-flooring-modern-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'spc-wide',
    aspect: 3 / 2,
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'laminate-flooring-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'laminate-tile',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'laminate-flooring-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'laminate-wide',
    aspect: 3 / 2,
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'wooden-flooring-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'wooden-tile',
    aspect: 4 / 5,
    position: 'bottom',
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'wooden-flooring-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'wooden-wide',
    aspect: 3 / 2,
    position: 'bottom',
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'wpc-wall-panel-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'wpc-tile',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'wpc-wall-panel-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'wpc-wide',
    aspect: 3 / 2,
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'pvc-wall-panel-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'pvc-tile',
    aspect: 4 / 5,
    // Default centre gravity cropped out the mosaic wall panel entirely
    // (it sits at the right edge of the source) — the 4:5 tile then showed
    // only doors and floor, no wall panel at all. Right-weighted crop
    // keeps the panel in frame.
    position: 'right',
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'pvc-wall-panel-interior.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'pvc-wide',
    aspect: 3 / 2,
    widths: [640, 960, 1280],
  },
  {
    input: path.join(SRC, 'acoustic-wall-panel-detail.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'acoustic-tile',
    aspect: 4 / 5,
    // Source has a very saturated tungsten-orange color cast from its warm
    // ambient lighting; moderate desaturation brings it toward the brand's
    // more restrained palette. No hue rotation — an earlier version (-8)
    // pushed the wood into an inaccurate pink/salmon tone, which is a worse
    // color-accuracy problem than the original orange cast it was meant to
    // fix. This keeps it reading as genuine warm timber (oak/ash-like).
    modulate: { saturation: 0.6, brightness: 1.03, hue: 0 },
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'acoustic-wall-panel-detail.jpg'),
    outDir: path.join(OUT, 'products'),
    name: 'acoustic-wide',
    aspect: 3 / 2,
    modulate: { saturation: 0.6, brightness: 1.03, hue: 0 },
    widths: [640, 960, 1280],
  },
  // ---- Craftsmanship / material detail (editorial section) --------------
  {
    input: path.join(SRC, 'material-sample-selection.jpg'),
    outDir: path.join(OUT, 'editorial'),
    name: 'material-detail',
    aspect: 4 / 5,
    widths: [480, 768, 1024],
  },
  // ---- Material Collection option cards (Phase 2.2) ----------------------
  // Per-category "Explore {Category}" option cards, one card = one tile
  // image at 4:5 (see MaterialOptionCard). Sourced/licensed per
  // IMAGE_SOURCES.md §7. Several source photos are intentionally reused
  // for a second, genuinely-matching option elsewhere (documented there)
  // rather than forcing in a mismatched image.
  {
    input: path.join(SRC, 'parquet-herringbone-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'parquet-herringbone',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    // Source is a full kitchen interior (800x534) with the chevron floor
    // only in the bottom ~45%. Since the target 4:5 tile is much taller
    // than the source, sharp's cover-crop trims width, not height — a
    // 'position' gravity can't reach the floor on its own. Pre-cropped to
    // the bottom 60% of the source height first (see the pre-crop note in
    // IMAGE_SOURCES.md §7) so this resize starts from just the floor.
    input: path.join(SRC, 'parquet-chevron-warm-interior-precrop.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'parquet-chevron-warm',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'parquet-chevron-dark-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'parquet-chevron-dark',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'spc-warm-oak-plank.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'spc-warm-oak',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'spc-ash-grey-plank.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'spc-ash-grey',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'spc-light-pine-plank.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'spc-light-pine',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'laminate-natural-oak-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'laminate-natural-oak',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'laminate-rustic-reclaimed-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'laminate-rustic-reclaimed',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'laminate-charcoal-dark-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'laminate-charcoal-dark',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  // Wooden Flooring reuses two already-licensed tone photos from Laminate/
  // SPC above (see IMAGE_SOURCES.md §7) — same license, different named
  // output so each page has its own stable asset path.
  {
    input: path.join(SRC, 'laminate-natural-oak-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'wooden-warm-honey',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'spc-ash-grey-plank.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'wooden-weathered-grey',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    // Source (800x1066, portrait) has a faint shadow silhouette along the
    // left ~30% of frame. Since the target 4:5 aspect is close to the
    // source's own ~3:4, sharp's cover-crop barely trims width, so a
    // 'position' gravity alone can't exclude it — pre-cropped to the right
    // 68% of the source width first (see pre-crop note in
    // IMAGE_SOURCES.md §7) so the shadow is gone before this resize.
    input: path.join(SRC, 'slat-wood-grain-detail-precrop.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'wpc-natural-grain',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'wpc-espresso-flat-panel.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'wpc-espresso-flat',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'pvc-wall-panel-interior.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'pvc-wood-look',
    // Same source/right-weighted crop rationale as pvc-tile above — keeps
    // the mosaic panel (right edge of frame) in shot.
    position: 'right',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'pvc-marble-look-panel.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'pvc-marble-look',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  // Fluted reuses the WPC slat photo for its natural-tone option (same
  // license, genuinely represents both categories' natural slatted/grooved
  // profile — see IMAGE_SOURCES.md §7) plus a distinct charcoal-toned photo.
  {
    // Same pre-cropped source as wpc-natural-grain above (see that job's
    // note) — genuinely represents both categories' natural-tone slatted/
    // grooved profile; see IMAGE_SOURCES.md §7.
    input: path.join(SRC, 'slat-wood-grain-detail-precrop.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'fluted-natural-oak',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'fluted-charcoal-lobby.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'fluted-charcoal',
    // Source is an elevator lobby with a wall-mounted sign at the right
    // edge of frame — left-weighted crop keeps the slatted wall and
    // excludes the readable signage/branding.
    position: 'left',
    aspect: 4 / 5,
    widths: [480, 720],
  },
  {
    input: path.join(SRC, 'acoustic-wall-panel-detail.jpg'),
    outDir: path.join(OUT, 'material-options'),
    name: 'acoustic-natural-slat',
    aspect: 4 / 5,
    // Same warm-cast correction as the category hero (acoustic-tile/-wide)
    // for visual consistency — see notes on that job above.
    modulate: { saturation: 0.6, brightness: 1.03, hue: 0 },
    widths: [480, 720],
  },
]

async function processBrand() {
  const outDir = path.join(OUT, 'brand')
  await ensureDir(outDir)
  const logoInput = path.join(SRC, 'logo.jpeg')

  // Icon-only crop (shield mark, no wordmark) — used for the favicon set,
  // since a full text lockup is illegible at 16-32px. This crops existing
  // pixels only; it does not redraw or alter the artwork.
  const iconCrop = { left: 480, top: 25, width: 440, height: 440 }
  const iconBuffer = await sharp(logoInput).extract(iconCrop).toBuffer()

  await sharp(iconBuffer).resize(16, 16).png().toFile(path.join(outDir, 'favicon-16.png'))
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(outDir, 'favicon-32.png'))
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(outDir, 'apple-touch-icon.png'))
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(outDir, 'icon-512.png'))
  for (const { ext, opts } of FORMATS) {
    await sharp(iconBuffer).resize(256, 256).toFormat(ext, opts).toFile(path.join(outDir, `logo-mark-256.${ext}`))
  }
}

async function processOg() {
  const outDir = path.join(OUT, 'og')
  await ensureDir(outDir)
  await sharp(path.join(SRC, 'hero-premium-interior.jpeg'))
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .toFormat('jpg', { quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, 'default-og.jpg'))
}

async function processVideoPoster() {
  // Poster frame for the homepage ambient video (public/videos/flooring-ambient-loop.mp4),
  // extracted once via macOS Quick Look (no ffmpeg in this environment) and
  // saved as _incoming-assets/video-poster-source.png at the video's native 16:9.
  const input = path.join(SRC, 'video-poster-source.png')
  if (!existsSync(input)) return
  for (const width of [800, 1280, 1920]) {
    await renderVariant({ input, outDir: path.join(OUT, 'editorial'), name: 'video-poster', width, aspect: 16 / 9 })
  }
}

// Wraps a source-specific step so one unreadable/corrupt source file (e.g.
// an OS-level file-ACL issue on a single asset) doesn't abort processing
// for every other image in the pipeline.
async function attempt(label, fn) {
  try {
    await fn()
  } catch (err) {
    console.error(`⚠ Skipped "${label}": ${err.message}`)
  }
}

async function main() {
  await attempt('brand/favicons', processBrand)
  await attempt('og image', processOg)
  await attempt('video poster', processVideoPoster)
  for (const job of jobs) {
    for (const width of job.widths) {
      await renderVariant({
        input: job.input,
        outDir: job.outDir,
        name: job.name,
        width,
        aspect: job.aspect,
        position: job.position,
        modulate: job.modulate,
      })
    }
  }
  console.log('Image processing complete ->', OUT)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
