import { getMaterialsByFamily } from './materials'

// "Products" carries a mega menu (two family columns); everything else is
// a flat link. Kept small deliberately — see section 41 of the Phase 2
// brief ("don't create a huge complicated mega menu").
export const primaryNav = [
  {
    label: 'Products',
    to: '/products',
    megaMenu: [
      {
        title: 'Flooring',
        to: '/flooring',
        items: getMaterialsByFamily('flooring').map((m) => ({ label: m.name, to: `/flooring/${m.slug}` })),
      },
      {
        title: 'Wall Panels',
        to: '/wall-panels',
        items: getMaterialsByFamily('wall-panels').map((m) => ({ label: m.name, to: `/wall-panels/${m.slug}` })),
      },
    ],
  },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = [
  {
    title: 'Flooring',
    links: [
      { label: 'Parquet', to: '/flooring/parquet' },
      { label: 'SPC Flooring', to: '/flooring/spc' },
      { label: 'Laminate', to: '/flooring/laminate' },
      { label: 'Wooden Flooring', to: '/flooring/wooden-flooring' },
    ],
  },
  {
    title: 'Wall Panels',
    links: [
      { label: 'WPC Panels', to: '/wall-panels/wpc' },
      { label: 'PVC Panels', to: '/wall-panels/pvc' },
      { label: 'Fluted Panels', to: '/wall-panels/fluted' },
      { label: 'Acoustic Panels', to: '/wall-panels/acoustic' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Projects', to: '/projects' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Gallery', to: '/gallery' },
      { label: 'Insights', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Kathmandu', to: '/locations/kathmandu' },
      { label: 'Lalitpur', to: '/locations/lalitpur' },
      { label: 'Bhaktapur', to: '/locations/bhaktapur' },
    ],
  },
]
