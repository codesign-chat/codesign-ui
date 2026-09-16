import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: 'https://codesign.chat/sitemap.xml',
})

export default robots
