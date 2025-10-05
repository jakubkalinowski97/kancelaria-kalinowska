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
  "openingHours": "Mo-Fr 09:00-17:00",
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
    "image": "/hero1.jpg"
  }
};

export function generateStructuredData(schema: any) {
  return JSON.stringify(schema);
}
