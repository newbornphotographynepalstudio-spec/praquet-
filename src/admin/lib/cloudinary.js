// Cloudinary integration boundary. Deliberately NOT the Cloudinary SDK
// (that would be a new dependency for one fetch call) — this is a direct
// POST to Cloudinary's unsigned upload endpoint, the standard
// browser-safe upload pattern: only a cloud name and an *unsigned* upload
// preset are needed client-side, and neither is a secret (an unsigned
// preset is explicitly designed to be embedded in public clients; folder/
// size/format restrictions for it are configured in the Cloudinary
// dashboard, not here). The account's actual API secret never appears in
// this codebase.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function isCloudinaryConfigured() {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET)
}

// Uploads a single file and returns { url, publicId, width, height }.
// Throws a plain Error with a message safe to show an admin user if
// Cloudinary isn't configured or the upload fails.
export async function uploadImage(file) {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured yet. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to enable uploads — until then, paste an existing image URL directly.'
    )
  }
  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body,
  })
  if (!res.ok) {
    throw new Error('Image upload failed. Please try again, or paste an image URL directly.')
  }
  const json = await res.json()
  return { url: json.secure_url, publicId: json.public_id, width: json.width, height: json.height }
}

// A light responsive-delivery helper for a Cloudinary URL already on
// record (e.g. request a smaller width for an admin-panel thumbnail).
// No-op (returns the URL unchanged) for a non-Cloudinary URL.
export function cloudinaryResize(url, width) {
  if (!url || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`)
}
