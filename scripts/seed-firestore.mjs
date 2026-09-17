// One-time (but safely re-runnable) migration of the site's EXISTING,
// already-verified content — src/data/materials.js, materialOptions.js,
// services.js, faqs.js, the Gallery page's composed image set, and
// contact.js/social.js — into the Firestore collections the admin CMS
// manages (see the Phase 3.7 report for the full audit/mapping).
//
// Nothing here is invented: every record below is copied from a file
// already reviewed and approved in earlier phases. testimonials, projects
// and blog are NOT seeded because the site's own local data for them is
// intentionally empty (no verified content exists yet) — see the brand
// content rule in README.md.
//
// SAFE TO RE-RUN: every document uses a stable id (the same slug the
// content already uses) and is written with `{ merge: true }`, so running
// this again updates the same records instead of duplicating them.
//
// This script must run authenticated as the admin account, because
// Firestore's security rules (see firestore.rules) only allow that UID to
// write these collections — exactly as they should. It intentionally does
// NOT read a password from any file or hardcode one: set these two
// environment variables in your shell for this one command only, then
// unset them (or just close the terminal — they're not saved anywhere):
//
//   export SEED_ADMIN_EMAIL="parquetdecornepal@gmail.com"
//   export SEED_ADMIN_PASSWORD="<the real admin password>"
//   node scripts/seed-firestore.mjs
//   unset SEED_ADMIN_PASSWORD
//
// Requires .env.local to already hold the real VITE_FIREBASE_* values
// (see .env.example) and the firestore.rules in this repo to already be
// deployed (`firebase deploy --only firestore:rules`) — otherwise every
// write below will fail with a clear permission-denied error.

import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('Missing .env.local — copy .env.example to .env.local and fill in the real Firebase config first.')
    process.exit(1)
  }
  const env = {}
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1)
  }
  return env
}

const env = loadEnvLocal()
const adminEmail = process.env.SEED_ADMIN_EMAIL
const adminPassword = process.env.SEED_ADMIN_PASSWORD
if (!adminEmail || !adminPassword) {
  console.error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your shell before running this script (see the comment at the top of this file).')
  process.exit(1)
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
})
const auth = getAuth(app)
const db = getFirestore(app)

// ---- Source content (imported the same way the public site does) --------
const { materials } = await import(path.join(ROOT, 'src/data/materials.js'))
const { materialOptions } = await import(path.join(ROOT, 'src/data/materialOptions.js'))
const { services } = await import(path.join(ROOT, 'src/data/services.js'))
const { faqs } = await import(path.join(ROOT, 'src/data/faqs.js'))
const { contact, developer } = await import(path.join(ROOT, 'src/data/contact.js'))
const { socialLinks } = await import(path.join(ROOT, 'src/data/social.js'))

// A responsive-image descriptor's largest available JPG fallback URL — the
// same already-optimized file the public site serves today, just without
// the AVIF/WebP srcset (CMS-authored images are plain URLs; see
// MaterialOptionCard.jsx / Gallery.jsx for why both shapes are supported).
function jpgUrl(imageDescriptor) {
  return imageDescriptor?.fallback ? imageDescriptor.fallback.replace(/\.jpg$/, '') + '.jpg' : ''
}

let written = 0
async function seed(collectionName, id, data) {
  await setDoc(doc(db, collectionName, id), data, { merge: true })
  written += 1
}

console.log('Signing in as', adminEmail, '…')
await signInWithEmailAndPassword(auth, adminEmail, adminPassword)

// ---- categories (8) — from src/data/materials.js -------------------------
for (const m of materials) {
  await seed('categories', m.slug, {
    name: m.name,
    slug: m.slug,
    family: m.family,
    tagline: m.tagline,
    shortDescription: m.shortDescription,
    intro: m.intro,
    features: m.features,
    applications: m.applications,
    faqTags: m.faqTags,
    specNote: m.specNote || '',
    image: jpgUrl(m.image?.tile),
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
console.log('categories seeded:', materials.length)

// ---- materialOptions (18) — from src/data/materialOptions.js -------------
let order = 0
for (const opt of materialOptions) {
  await seed('materialOptions', opt.slug, {
    name: opt.name,
    slug: opt.slug,
    categorySlug: opt.categorySlug,
    finish: opt.finish,
    description: opt.description,
    image: jpgUrl(opt.image?.tile),
    order: order++,
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
console.log('materialOptions seeded:', materialOptions.length)

// ---- services (3) — from src/data/services.js -----------------------------
let serviceOrder = 0
for (const s of services) {
  await seed('services', s.slug, {
    name: s.name,
    slug: s.slug,
    tagline: s.tagline,
    shortDescription: s.shortDescription,
    intro: s.intro,
    process: s.process,
    applications: s.applications,
    heroMaterialSlug: s.heroMaterialSlug,
    faqTags: s.faqTags,
    image: '',
    order: serviceOrder++,
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
console.log('services seeded:', services.length)

// ---- faqs (16) — from src/data/faqs.js, id = stable slugified question --
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[’'"?]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}
let faqOrder = 0
for (const f of faqs) {
  await seed('faqs', slugify(f.question), {
    question: f.question,
    answer: f.answer,
    tags: f.tags,
    order: faqOrder++,
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
console.log('faqs seeded:', faqs.length)

// ---- gallery (11) — the same set composed by src/pages/Gallery.jsx -------
const galleryItems = [
  ...materials.map((m) => ({
    id: m.slug,
    image: jpgUrl(m.image?.wide),
    category: m.family === 'flooring' ? 'Flooring' : 'Wall Panels',
    title: m.name,
  })),
]
let galleryOrder = 0
for (const item of galleryItems) {
  await seed('gallery', item.id, {
    title: item.title,
    image: item.image,
    category: item.category,
    order: galleryOrder++,
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
console.log('gallery seeded:', galleryItems.length, '(the 3 additional editorial/demo images on the public Gallery page are not duplicated here — see the Phase 3.7 report)')

// ---- seo (11) — the real title/description/path already passed to <Seo>
// on every static top-level page (see each page file for the source of
// each value; the 8 category pages and 3 service pages already carry
// their own seoTitle/seoDescription fields on their own collection
// records, so they're not duplicated here). Admin-only — not yet read by
// the public <Seo> component. -----------------------------------------
const seoPages = [
  { pagePath: '/', seoTitle: '', metaDescription: '' },
  {
    pagePath: '/about',
    seoTitle: 'About',
    metaDescription: 'Parquet & Decor Nepal brings together premium flooring, architectural wall surfaces and professional installation.',
  },
  {
    pagePath: '/products',
    seoTitle: 'Products',
    metaDescription: "Explore Parquet & Decor Nepal's two material families — premium flooring and architectural wall panels.",
  },
  {
    pagePath: '/flooring',
    seoTitle: 'Flooring',
    metaDescription:
      'Four flooring families, each suited to different rooms, budgets and material preferences — from genuine timber to practical, durable composites. Every one is shown here as inspiration; final specification happens during consultation.',
  },
  {
    pagePath: '/wall-panels',
    seoTitle: 'Wall Panels',
    metaDescription:
      "Architectural wall surfaces bring texture, depth and warmth to a space in a way paint alone can't. From warm wood-look composites to acoustic-conscious slatted panels, each family below serves a different kind of wall.",
  },
  {
    pagePath: '/services',
    seoTitle: 'Services',
    metaDescription: 'Flooring installation, wall panel installation and interior surface consultation — from Parquet & Decor Nepal.',
  },
  {
    pagePath: '/projects',
    seoTitle: 'Projects',
    metaDescription: 'Our project portfolio is growing. In the meantime, explore material inspiration and get in touch to discuss your own space.',
  },
  {
    pagePath: '/gallery',
    seoTitle: 'Gallery',
    metaDescription: 'Material and interior inspiration from Parquet & Decor Nepal — flooring, wall panels and design references.',
  },
  {
    pagePath: '/blog',
    seoTitle: 'Insights',
    metaDescription: 'Editorial articles on flooring, wall panels and interior material selection — coming soon from Parquet & Decor Nepal.',
  },
  {
    pagePath: '/faq',
    seoTitle: 'FAQ',
    metaDescription: 'Answers to common questions about flooring, wall panels, installation, consultation and service areas.',
  },
  {
    pagePath: '/contact',
    seoTitle: 'Contact',
    metaDescription: 'Get a free consultation on flooring and wall panel materials for your space. Call, WhatsApp or email Parquet & Decor Nepal.',
  },
]
for (const p of seoPages) {
  await seed('seo', p.pagePath === '/' ? 'home' : p.pagePath.slice(1).replace(/\//g, '-'), {
    pagePath: p.pagePath,
    seoTitle: p.seoTitle,
    metaDescription: p.metaDescription,
    canonical: `https://www.parquetdecornepal.com${p.pagePath}`,
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    noindex: false,
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
console.log('seo entries seeded:', seoPages.length)

// ---- siteSettings (1 singleton) — from src/data/contact.js + social.js --
await seed('siteSettings', 'main', {
  businessName: 'Parquet & Decor Nepal',
  phone: contact.phoneDisplay,
  whatsapp: contact.whatsappDisplay,
  email: contact.emailDisplay,
  website: 'https://www.parquetdecornepal.com',
  facebook: socialLinks.find((s) => s.label === 'Facebook')?.href || '',
  instagram: socialLinks.find((s) => s.label === 'Instagram')?.href || '',
  footerCredit: `Designed & Crafted by ${developer.name}`,
  defaultSeoTitle: 'Parquet & Decor Nepal | Premium Flooring & Wall Panel Solutions',
  defaultSeoDescription:
    'Premium flooring and architectural wall panel solutions in Nepal — parquet, SPC, laminate and wooden flooring, WPC, PVC, fluted and acoustic wall panels, with professional installation.',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
})
console.log('siteSettings seeded: 1')

await signOut(auth)
console.log(`\nDone — ${written} documents written/updated.`)
process.exit(0)
