import PageWrapper from '../components/ui/PageWrapper'
import ContactInfo from '../components/sections/ContactInfo'
import ContactForm from '../components/sections/ContactForm'

export default function Contact() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <ContactInfo />
          <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
