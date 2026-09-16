import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import MaterialOptionCard from '../ui/MaterialOptionCard'

// "Explore {Category}" — the material-option collection on each category
// page (see MaterialDetailPage), sitting between the intro paragraph and
// the Features/Applications section per the Phase 2.2 hierarchy. Same
// fixed-column grid pattern as RelatedGrid — a category with fewer
// verified options (e.g. one or two, see the "accuracy over card count"
// note in src/data/materialOptions.js) just leaves the row short, the same
// way any other card grid on the site does; it doesn't stretch to fill.
export default function MaterialCollection({ categoryName, options, note }) {
  if (options.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="The Collection"
          title={`Explore ${categoryName}`}
          description="Patterns, tones and finishes within this category — each one available to see and feel in person before you decide."
        />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-14 md:gap-x-8 xl:grid-cols-4">
          {options.map((option) => (
            <MaterialOptionCard key={option.slug} option={option} categoryName={categoryName} />
          ))}
        </div>
        {note && <p className="mt-8 font-body text-xs italic text-charcoal/70">{note}</p>}
      </Container>
    </section>
  )
}
