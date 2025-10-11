// Structured data utilities for SEO

export const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Kancelaria Radcy Prawnego Diana Magdalena Kalinowska",
  "description": "Profesjonalne usługi prawne w Białymstoku. Prawo cywilne, karne, rodzinne i gospodarcze, prawo pracy, windykacja należności, ochrona praw zwierząt, błędy weterynaryjne.",
  "url": "https://kancelariakalinowska.pl",
  "telephone": "+48503606738",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Złota 2 lok. 19",
    "addressLocality": "Białystok",
    "postalCode": "15-016",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "53.1251",
    "longitude": "23.1667"
  },
  "openingHours": "Mo-Fr 08:00-17:00",
  "priceRange": "$",
  "areaServed": {
    "@type": "Country",
    "name": "Polska"
  },
  "serviceType": [
    "Prawo cywilne",
    "Prawo karne",
    "Prawo rodzinne",
    "Prawo gospodarcze",
    "Prawo pracy",
    "Windykacja należności",
    "Ochrona praw zwierząt",
    "Błędy weterynaryjne"
  ],
  "founder": {
    "@type": "Person",
    "name": "Diana Magdalena Kalinowska",
    "jobTitle": "Radca Prawny",
    "image": "/hero1.webp"
  }
};

export function generateStructuredData(schema: any) {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Service schema generator for individual service pages
export function generateServiceSchema(config: {
  serviceType: string;
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": config.serviceType,
    "name": config.name,
    "description": config.description,
    "url": config.url,
    "provider": {
      "@type": "LegalService",
      "name": "Kancelaria Radcy Prawnego Diana Magdalena Kalinowska",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Złota 2 lok. 19",
        "addressLocality": "Białystok",
        "postalCode": "15-016",
        "addressCountry": "PL"
      },
      "telephone": "+48503606738",
      "email": "kontakt@kancelariakalinowska.pl",
      "url": "https://kancelariakalinowska.pl"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Białystok"
      },
      {
        "@type": "State",
        "name": "Podlaskie"
      },
      {
        "@type": "Country",
        "name": "Polska"
      }
    ],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };
}
