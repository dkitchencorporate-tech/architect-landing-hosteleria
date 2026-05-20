import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://architect-sys.com' // Ajustar con tu dominio real luego

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Añade más URLs aquí si creas subpáginas (ej. /blog, /contacto)
  ]
}
