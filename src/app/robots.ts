import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Permite a todos los bots (Google, GPTBot, Perplexity)
      allow: '/',
    },
    sitemap: 'https://dkitchencorporate.es/sitemap.xml',
  }
}
