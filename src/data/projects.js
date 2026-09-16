// No verified Parquet & Decor Nepal projects exist yet — this stays an
// empty array rather than fake case studies (see brand content rule in
// README.md). /projects and /projects/:projectSlug render an honest
// "portfolio growing" state until real entries are added here.
//
// Shape each future entry should follow:
// {
//   id, name, slug, location, projectType,
//   description,
//   productsUsed: [materialSlug, ...],
//   beforeImages: [], installationImages: [], afterImages: [], gallery: [],
//   materials: [], seoTitle, metaDescription, ogImage,
//   status: 'draft' | 'published',
// }
export const projects = []

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}
