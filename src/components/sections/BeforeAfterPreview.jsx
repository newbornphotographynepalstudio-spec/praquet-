import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import BeforeAfterSlider from '../media/BeforeAfterSlider'
import { beforeAfterDemo } from '../../data/images'

export default function BeforeAfterPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container narrow>
        <SectionHeading
          eyebrow="The Transformation"
          title="From Bare Structure to Finished Interior"
          description="Drag the slider to see the kind of transformation premium flooring and wall panels bring to a space."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          <BeforeAfterSlider
            before={beforeAfterDemo.before}
            after={beforeAfterDemo.after}
            beforeAlt={beforeAfterDemo.beforeAlt}
            afterAlt={beforeAfterDemo.afterAlt}
            demo
          />
        </div>
      </Container>
    </section>
  )
}
