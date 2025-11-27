// Mapping of article categories to related services

interface Service {
  title: string;
  url: string;
  description: string;
}

export const categoryToServices: Record<string, Service[]> = {
  'Prawo rodzinne': [
    {
      title: 'Prawo rodzinne',
      url: '/uslugi/prawo-rodzinne',
      description: 'Kompleksowe wsparcie w sprawach rozwodowych, alimentacyjnych i opieki nad dziećmi.'
    }
  ],
  'Prawo pracy': [
    {
      title: 'Prawo pracy',
      url: '/uslugi/prawo-pracy',
      description: 'Pomoc w sporach ze pracodawcą, rozwiązaniach umów i ochronie praw pracowniczych.'
    }
  ],
  'Windykacja': [
    {
      title: 'Windykacja należności',
      url: '/uslugi/windykacja-naleznosci',
      description: 'Odzyskiwanie długów i prowadzenie postępowań egzekucyjnych.'
    },
    {
      title: 'Prawo cywilne',
      url: '/uslugi/prawo-cywilne',
      description: 'Dochodzenie roszczeń, sprawy o zapłatę i odszkodowania.'
    }
  ],
  'Prawo karne': [
    {
      title: 'Prawo karne',
      url: '/uslugi/prawo-karne',
      description: 'Obrona w sprawach karnych i reprezentacja w postępowaniach karnych.'
    }
  ],
  'Prawo gospodarcze': [
    {
      title: 'Prawo gospodarcze',
      url: '/uslugi/prawo-gospodarcze',
      description: 'Rejestracja firm, umowy gospodarcze i bieżąca obsługa prawna przedsiębiorców.'
    },
    {
      title: 'Prawo cywilne',
      url: '/uslugi/prawo-cywilne',
      description: 'Sporządzanie i weryfikacja umów handlowych.'
    }
  ],
  'Prawo cywilne': [
    {
      title: 'Prawo cywilne',
      url: '/uslugi/prawo-cywilne',
      description: 'Umowy, odszkodowania, sprawy o zapłatę i roszczenia cywilne.'
    }
  ]
};

export function getRelatedServices(category: string): Service[] {
  return categoryToServices[category] || [];
}

// Get related articles tags for internal linking
export const serviceToTags: Record<string, string[]> = {
  'prawo-rodzinne': ['Prawo rodzinne', 'Rozwód', 'Alimenty', 'Opieka nad dzieckiem'],
  'prawo-pracy': ['Prawo pracy', 'Spory pracownicze', 'Umowa o pracę', 'Mobbing'],
  'windykacja-naleznosci': ['Windykacja', 'Odzyskiwanie długów', 'Nieuregulowane płatności'],
  'prawo-karne': ['Prawo karne', 'Obrona w sprawie karnej', 'Postępowanie karne'],
  'prawo-gospodarcze': ['Prawo gospodarcze', 'Zakładanie firmy', 'Umowy gospodarcze', 'Obsługa prawna firm'],
  'prawo-cywilne': ['Prawo cywilne', 'Umowy', 'Odszkodowania', 'Sprawy o zapłatę'],
  'ochrona-praw-zwierzat': ['Prawo weterynaryjne', 'Ochrona zwierząt', 'Błędy weterynaryjne'],
  'bledy-weterynaryjne': ['Błędy weterynaryjne', 'Odpowiedzialność weterynarza', 'Odszkodowanie za zwierzę']
};
