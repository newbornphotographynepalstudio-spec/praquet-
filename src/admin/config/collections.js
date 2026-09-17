// Schema-driven CMS config: one entry per Firestore collection the admin
// manages, describing its fields, list columns and defaults. A single
// generic list/create/edit page (see pages/CollectionManager.jsx) reads
// this to render all 12 CRUD sections, rather than hand-building 12
// near-identical pages.
//
// These collections are intentionally separate from the public site's
// existing static data files (src/data/materials.js, materialOptions.js,
// projects.js, etc.) — see the Phase 3 brief: "Do not immediately convert
// every public page to Firestore reads." This is the CRUD architecture for
// future CMS-driven content; wiring the public site to read from it is a
// later, deliberate step.

const statusField = { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'], default: 'draft' }
const seoFields = [
  { name: 'seoTitle', label: 'SEO Title', type: 'text' },
  { name: 'seoDescription', label: 'SEO Description', type: 'textarea' },
]

export const collections = {
  products: {
    label: 'Products',
    singular: 'Product',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'URL-friendly, e.g. "warm-oak-spc"' },
      { name: 'categorySlug', label: 'Category Slug', type: 'text', hint: 'Matches a category\'s slug, e.g. "spc"' },
      { name: 'finish', label: 'Finish / Style', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
      statusField,
      ...seoFields,
    ],
    listColumns: ['name', 'categorySlug', 'status'],
  },

  materialOptions: {
    label: 'Material Options',
    singular: 'Material Option',
    reorderable: true,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'categorySlug', label: 'Category Slug', type: 'text', required: true, hint: 'e.g. "parquet", "fluted"' },
      { name: 'finish', label: 'Finish', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      statusField,
    ],
    listColumns: ['name', 'categorySlug', 'finish', 'status'],
  },

  categories: {
    label: 'Categories',
    singular: 'Category',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'family', label: 'Family', type: 'select', options: ['flooring', 'wall-panels'], required: true },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'shortDescription', label: 'Short Description', type: 'textarea' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'features', label: 'Features (one per line)', type: 'lines' },
      { name: 'applications', label: 'Applications (one per line)', type: 'lines' },
      { name: 'faqTags', label: 'FAQ Tags (comma-separated)', type: 'tags' },
      { name: 'specNote', label: 'Spec Note (optional)', type: 'textarea', hint: 'Only for a category with no verified performance spec yet — see the brand content rule.' },
      { name: 'image', label: 'Image', type: 'image' },
      statusField,
    ],
    listColumns: ['name', 'family', 'status'],
  },

  projects: {
    label: 'Projects',
    singular: 'Project',
    fields: [
      { name: 'name', label: 'Project Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'projectType', label: 'Project Type', type: 'select', options: ['Residential', 'Commercial'] },
      { name: 'description', label: 'Description / Story', type: 'textarea' },
      { name: 'materialsUsed', label: 'Materials Used (comma-separated)', type: 'tags' },
      { name: 'beforeImage', label: 'Before Image', type: 'image' },
      { name: 'installationImage', label: 'Installation Image', type: 'image' },
      { name: 'afterImage', label: 'After Image', type: 'image' },
      { name: 'featured', label: 'Featured', type: 'boolean' },
      statusField,
      ...seoFields,
    ],
    listColumns: ['name', 'location', 'featured', 'status'],
  },

  gallery: {
    label: 'Gallery',
    singular: 'Gallery Image',
    reorderable: true,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      statusField,
    ],
    listColumns: ['title', 'category', 'status'],
  },

  services: {
    label: 'Services',
    singular: 'Service',
    reorderable: true,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'shortDescription', label: 'Short Description', type: 'textarea' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'process',
        label: 'Process Steps (one per line, "Title: Description")',
        type: 'keyvalue-lines',
        hint: 'e.g. "Site Assessment: Understanding the room before recommending a material."',
      },
      { name: 'applications', label: 'Applications (one per line)', type: 'lines' },
      { name: 'heroMaterialSlug', label: 'Hero Material Slug', type: 'text', hint: 'A category slug whose image represents this service, e.g. "parquet"' },
      { name: 'faqTags', label: 'FAQ Tags (comma-separated)', type: 'tags' },
      { name: 'image', label: 'Image (optional override)', type: 'image' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      statusField,
      ...seoFields,
    ],
    listColumns: ['name', 'status'],
  },

  blog: {
    label: 'Blog',
    singular: 'Post',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      {
        name: 'content',
        label: 'Content',
        type: 'richtext',
        hint: 'Plain HTML is sanitized before it is ever rendered publicly (see the DOMPurify note in README.md).',
      },
      { name: 'featuredImage', label: 'Featured Image', type: 'image' },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'publishedDate', label: 'Published Date', type: 'date' },
      statusField,
      ...seoFields,
      { name: 'ogImage', label: 'OG Image', type: 'image' },
    ],
    listColumns: ['title', 'author', 'publishedDate', 'status'],
  },

  faqs: {
    label: 'FAQs',
    singular: 'FAQ',
    reorderable: true,
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'tags', label: 'Tags (comma-separated)', type: 'tags', hint: 'e.g. "parquet, flooring" — used to show relevant FAQs on category/service pages' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      statusField,
    ],
    listColumns: ['question', 'order', 'status'],
  },

  testimonials: {
    label: 'Testimonials',
    singular: 'Testimonial',
    fields: [
      { name: 'customerName', label: 'Customer Name', type: 'text', required: true },
      { name: 'review', label: 'Review', type: 'textarea', required: true },
      { name: 'projectOrService', label: 'Project / Service', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
      statusField,
    ],
    listColumns: ['customerName', 'projectOrService', 'date', 'status'],
  },

  pages: {
    label: 'Pages',
    singular: 'Page',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'content', label: 'Content', type: 'richtext' },
      statusField,
      ...seoFields,
    ],
    listColumns: ['title', 'slug', 'status'],
  },

  seo: {
    label: 'SEO Metadata',
    singular: 'SEO Entry',
    fields: [
      { name: 'pagePath', label: 'Page Path', type: 'text', required: true, hint: 'e.g. "/about" or "/flooring/parquet"' },
      { name: 'seoTitle', label: 'SEO Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
      { name: 'canonical', label: 'Canonical URL', type: 'text' },
      { name: 'ogTitle', label: 'OG Title', type: 'text' },
      { name: 'ogDescription', label: 'OG Description', type: 'textarea' },
      { name: 'ogImage', label: 'OG Image', type: 'image' },
      { name: 'noindex', label: 'Noindex', type: 'boolean' },
    ],
    listColumns: ['pagePath', 'seoTitle', 'noindex'],
  },

  redirects: {
    label: 'Redirects',
    singular: 'Redirect',
    fields: [
      { name: 'from', label: 'From', type: 'text', required: true, hint: 'e.g. "/old-page"' },
      { name: 'to', label: 'To', type: 'text', required: true, hint: 'e.g. "/new-page"' },
      { name: 'statusCode', label: 'Status Code', type: 'select', options: ['301', '302'], default: '301' },
      { name: 'active', label: 'Active', type: 'boolean', default: true },
    ],
    listColumns: ['from', 'to', 'statusCode', 'active'],
  },
}

export function getCollectionConfig(key) {
  return collections[key]
}
