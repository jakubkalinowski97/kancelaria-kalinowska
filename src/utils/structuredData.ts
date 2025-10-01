// Structured data utilities for SEO

export const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Kancelaria Radcy Prawnego Diana Magdalena Kalinowska",
  "description": "Profesjonalne usługi prawne w Warszawie. Prawo cywilne, karne, rodzinne i gospodarcze.",
  "url": "https://diana-kalinowska-prawnik.pl",
  "telephone": "+48123456789",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Przykładowa 123",
    "addressLocality": "Warszawa",
    "postalCode": "00-001",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.2297",
    "longitude": "21.0122"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "Polska"
  },
  "serviceType": [
    "Prawo cywilne",
    "Prawo karne",
    "Prawo rodzinne",
    "Prawo gospodarcze"
  ],
  "founder": {
    "@type": "Person",
    "name": "Diana Magdalena Kalinowska",
    "jobTitle": "Radca Prawny",
    "image": "/hero1.jpg"
  }
};

export function generateStructuredData(schema: any) {
  return JSON.stringify(schema);
}
