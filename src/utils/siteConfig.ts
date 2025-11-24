// Site configuration and URL helpers

const IS_DEV = import.meta.env.DEV;

export const SITE_URL = IS_DEV
  ? 'http://localhost:4321'
  : 'https://kancelariakalinowska.pl';

export function getAbsoluteUrl(path: string = ''): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${SITE_URL}/${cleanPath}`;
}

export const SITE_CONFIG = {
  name: 'Kancelaria Radcy Prawnego Diana Magdalena Kalinowska',
  address: {
    street: 'ul. Złota 2 lok. 19',
    city: 'Białystok',
    postalCode: '15-016',
    country: 'PL'
  },
  coordinates: {
    latitude: 53.132488,
    longitude: 23.168450
  },
  contact: {
    phone: '+48503606738',
    email: 'kontakt@kancelariakalinowska.pl'
  },
  hours: {
    weekdays: { opens: '09:00', closes: '17:00' },
    saturday: 'na umówienie',
    sunday: 'zamknięte'
  }
};
