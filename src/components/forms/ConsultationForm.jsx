import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { materials } from '../../data/materials'
import { services } from '../../data/services'
import { locations } from '../../data/locations'
import { submitInquiry } from '../../lib/submitInquiry'
import { cn } from '../../utils/cn'

const materialNames = materials.map((m) => m.name)
const serviceNames = services.map((s) => s.name)
const interestOptions = [...materialNames, ...serviceNames]

const fieldClass =
  'block w-full min-h-[44px] rounded-sm border border-navy/20 bg-white px-4 py-2.5 font-body text-sm text-navy placeholder:text-charcoal/50 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold'
const labelClass = 'block font-body text-xs font-semibold uppercase tracking-wide text-navy'
const errorClass = 'mt-1 font-body text-xs text-red-700'

// Writes to Firestore (the `inquiries` collection managed in /admin —
// see the Phase 3 brief) via submitInquiry(). The single "Product /
// Service" dropdown below is kept as one field for the visitor (no layout
// change), but split into `interestedProduct` / `interestedService` on the
// stored record depending on which list the selected value came from, to
// match the admin's lead schema.
export default function ConsultationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await submitInquiry({
        name: data.name,
        phone: data.phone,
        email: data.email,
        location: data.location,
        interestedProduct: materialNames.includes(data.interest) ? data.interest : '',
        interestedService: serviceNames.includes(data.interest) ? data.interest : '',
        projectType: data.projectType,
        message: data.message,
      })
      toast.success('Thank you — we’ve received your message and will be in touch soon.')
      reset()
    } catch {
      // Never surface the raw Firestore/network error to a customer.
      toast.error('Something went wrong sending your message — please call or WhatsApp us directly instead.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(fieldClass, 'mt-1.5')}
            {...register('name', { required: 'Please enter your name' })}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={cn(fieldClass, 'mt-1.5')}
            {...register('phone', { required: 'Please enter a phone number' })}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn(fieldClass, 'mt-1.5')}
          {...register('email', {
            required: 'Please enter your email',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' },
          })}
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label htmlFor="location" className={labelClass}>
            Location
          </label>
          <select id="location" className={cn(fieldClass, 'mt-1.5')} defaultValue="" {...register('location')}>
            <option value="" disabled>
              Select
            </option>
            {locations.map((l) => (
              <option key={l.slug} value={l.name}>
                {l.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="interest" className={labelClass}>
            Product / Service
          </label>
          <select id="interest" className={cn(fieldClass, 'mt-1.5')} defaultValue="" {...register('interest')}>
            <option value="" disabled>
              Select
            </option>
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project Type
          </label>
          <select id="projectType" className={cn(fieldClass, 'mt-1.5')} defaultValue="" {...register('projectType')}>
            <option value="" disabled>
              Select
            </option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(fieldClass, 'mt-1.5 resize-y')}
          {...register('message', { required: 'Tell us a little about your space or project' })}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[44px] items-center justify-center rounded bg-navy px-8 py-3 font-body text-sm font-semibold uppercase tracking-wide text-ivory transition-colors duration-400 hover:bg-navy-light disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
