// No articles have been written yet — this stays an empty array rather
// than fabricated posts (see brand content rule in README.md). /blog and
// /blog/:blogSlug render a clean editorial "coming soon" state until real
// entries are added here.
//
// Shape each future entry should follow:
// {
//   id, title, slug, excerpt, content, heroImage, author, publishedAt,
//   category, tags: [], seoTitle, metaDescription, ogImage,
//   status: 'draft' | 'published',
// }
export const posts = []

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug)
}
