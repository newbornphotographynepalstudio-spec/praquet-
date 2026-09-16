import Header from './Header'
import Footer from './Footer'
import MobileStickyCTA from '../navigation/MobileStickyCTA'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'

export default function Layout({ overlayHeader = false, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory-light pb-[52px] xl:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <Header overlay={overlayHeader} />
      <main id="main-content" className={overlayHeader ? 'flex-1' : 'flex-1 pt-20'}>
        {children}
      </main>
      <Footer />
      <MobileStickyCTA />
      <FloatingWhatsApp />
    </div>
  )
}
