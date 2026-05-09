import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines — full access
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Google — allow all crawlers
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // AI Crawlers — explicitly allow for GEO (Generative Engine Optimization)
      // ChatGPT / OpenAI
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // ChatGPT Plugin Crawler
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Claude (Anthropic)
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Gemini / Google AI
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Meta AI (Llama)
      {
        userAgent: 'meta-externalagent',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Common AI research crawlers
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://primotech-llc.com/sitemap.xml',
    host: 'https://primotech-llc.com',
  };
}
