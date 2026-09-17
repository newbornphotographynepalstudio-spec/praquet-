import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlinePhoto, HiOutlineXMark } from 'react-icons/hi2'
import { isCloudinaryConfigured, uploadImage, cloudinaryResize } from '../lib/cloudinary'

// One field, two ways to get an image URL onto a record:
// 1. Paste an existing URL directly (always available, no config needed).
// 2. Upload to Cloudinary (only when VITE_CLOUDINARY_CLOUD_NAME /
//    VITE_CLOUDINARY_UPLOAD_PRESET are set — see .env.example). When not
//    configured, the upload button is disabled with an explicit message
//    rather than silently failing or inventing credentials.
export default function ImageField({ label, value, onChange, hint }) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const configured = isCloudinaryConfigured()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      const { url } = await uploadImage(file)
      onChange(url)
      toast.success('Image uploaded')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block font-body text-xs font-semibold uppercase tracking-wide text-navy">{label}</label>
      {hint && <p className="mt-1 font-body text-xs text-charcoal/60">{hint}</p>}
      <div className="mt-1.5 flex items-start gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded border border-navy/15 bg-ivory-light">
          {value ? (
            <img src={cloudinaryResize(value, 160)} alt="" className="h-full w-full object-cover" />
          ) : (
            <HiOutlinePhoto size={24} className="text-charcoal/30" aria-hidden="true" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste an image URL, or upload below"
              className="block w-full min-h-[40px] rounded-sm border border-navy/20 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                aria-label="Remove image"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-navy/15 text-charcoal hover:bg-navy/5"
              >
                <HiOutlineXMark size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <button
              type="button"
              disabled={!configured || uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex min-h-[36px] items-center rounded border border-navy/20 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Upload to Cloudinary'}
            </button>
            {!configured && (
              <p className="mt-1 font-body text-xs text-charcoal/50">
                Cloudinary isn't configured yet — set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to
                enable uploads.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
