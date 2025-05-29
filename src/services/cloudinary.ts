// funcion que recibe file, lo sube a cloudinary y devuelve la url de la imagen
export const uploadImageToCloudinary = async (file : File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )
    if (!res.ok) throw new Error('Upload failed')

    const data = await res.json()
    return data.secure_url // url de la imagen
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}
