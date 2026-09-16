import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ResponsiveImage from '../media/ResponsiveImage'
import { collectionPreview } from '../../data/homepage'
import { parquetCollectionImage, flutedCollectionImage } from '../../data/images'

const imageByKey = {
  flooring: parquetCollectionImage,
  'wall-panels': flutedCollectionImage,
}

export default function CollectionPreview() {
  return (
    <section className="bg-ivory-light py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Range"
          title="Two Collections, One Architectural Language"
          description="Every material is chosen to work together — flooring and wall treatments designed as a single, coherent interior system."
        />

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {collectionPreview.map((item) => {
            const image = imageByKey[item.key]
            return (
              <Link
                key={item.key}
                to={item.to}
                className="group block overflow-hidden rounded bg-white shadow-card transition-shadow duration-400 ease-premium hover:shadow-lifted"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <ResponsiveImage
                    desktop={image.tile}
                    alt={image.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    imgClassName="transition-transform duration-600 ease-premium group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-navy">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-gold">
                    Explore
                    <HiArrowRight className="transition-transform duration-400 ease-premium group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
