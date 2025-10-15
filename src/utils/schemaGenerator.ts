// Helper functions for generating schema markup
import { SITE_URL, SITE_CONFIG } from './siteConfig';

interface FAQItem {
  question: string;
  answer: string;
}

// Strip HTML tags from answer text
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer)
      }
    }))
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: SITE_CONFIG.name,
    image: `${SITE_URL}/logo-small.webp`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: SITE_CONFIG.contact.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.latitude,
      longitude: SITE_CONFIG.coordinates.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: SITE_CONFIG.hours.weekdays.opens,
        closes: SITE_CONFIG.hours.weekdays.closes
      }
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Białystok'
      },
      {
        '@type': 'State',
        name: 'Podlaskie'
      },
      {
        '@type': 'Country',
        name: 'Polska'
      }
    ],
    sameAs: [
      // TODO: Add social media profiles when available
      // 'https://www.facebook.com/...',
      // 'https://www.linkedin.com/in/...'
    ]
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Diana Magdalena Kalinowska',
    jobTitle: 'Radca Prawny',
    worksFor: {
      '@type': 'LegalService',
      name: SITE_CONFIG.name
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country
    },
    telephone: SITE_CONFIG.contact.phone,
    url: `${SITE_URL}/o-nas`,
    knowsAbout: [
      'Prawo cywilne',
      'Prawo rodzinne',
      'Prawo karne',
      'Prawo gospodarcze',
      'Prawo pracy',
      'Windykacja należności',
      'Ochrona praw zwierząt'
    ]
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishDate: Date;
  modifiedDate?: Date;
  author: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || `${SITE_URL}/logo-small.webp`,
    datePublished: article.publishDate.toISOString(),
    dateModified: (article.modifiedDate || article.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: 'Radca Prawny'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-small.webp`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

export function toJsonLd(schema: any) {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 0)}</script>`;
}
