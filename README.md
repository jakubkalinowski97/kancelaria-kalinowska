# Kancelaria Prawna - Diana Magdalena Kalinowska

Profesjonalna strona internetowa kancelarii prawnej zbudowana w Astro z wykorzystaniem najlepszych praktyk.

## 🏗️ Struktura projektu

```
lawyer-website/
├── src/
│   ├── components/          # Komponenty Astro
│   │   ├── common/         # Wspólne komponenty (Navigation, Footer)
│   │   ├── sections/       # Sekcje strony (Hero, Services, About, Contact)
│   │   └── ui/            # Komponenty UI
│   ├── layouts/           # Layouty stron
│   │   ├── Layout.astro   # Główny layout
│   │   └── ServiceLayout.astro # Layout dla stron usług
│   ├── pages/             # Strony (file-based routing)
│   │   ├── index.astro    # Strona główna
│   │   └── uslugi/        # Strony usług
│   ├── styles/            # Style CSS
│   │   └── global.css     # Globalne style z Tailwind
│   ├── utils/             # Funkcje pomocnicze
│   │   ├── animations.ts  # Animacje scroll
│   │   └── structuredData.ts # Dane strukturalne SEO
│   ├── content/           # Kolekcje treści
│   │   └── config.ts      # Konfiguracja kolekcji
│   └── assets/            # Zasoby statyczne
├── public/                # Pliki publiczne
├── astro.config.mjs       # Konfiguracja Astro
├── tailwind.config.mjs    # Konfiguracja Tailwind
├── tsconfig.json          # Konfiguracja TypeScript
└── package.json           # Zależności i skrypty
```

## 🚀 Funkcjonalności

- **Responsywny design** - Optymalizacja dla wszystkich urządzeń
- **SEO** - Zoptymalizowane meta tagi i dane strukturalne
- **Performance** - Szybkie ładowanie dzięki Astro
- **TypeScript** - Pełne wsparcie dla TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Animacje** - Płynne animacje scroll
- **Komponenty** - Modularna architektura komponentów

## 🛠️ Technologie

- **Astro** - Framework do budowy statycznych stron
- **TypeScript** - Typowany JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Linter dla JavaScript/TypeScript
- **@astrojs/sitemap** - Automatyczne generowanie mapy strony

## 📦 Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Budowa projektu
npm run build

# Podgląd zbudowanej strony
npm run preview

# Sprawdzenie typów TypeScript
npm run check

# Linting
npm run lint
```

## 🎨 Style i komponenty

### Kolory
- **Primary**: Złote odcienie (#c4a574, #b8965f, #8b6f42)
- **Gray**: Neutralne szarości dla tekstu i tła

### Fonty
- **Serif**: Playfair Display (nagłówki)
- **Sans**: Source Sans Pro (tekst)

### Komponenty
- **Navigation** - Nawigacja z logo i linkami
- **Hero** - Sekcja główna z tłem i CTA
- **Services** - Siatka usług prawnych
- **About** - Sekcja o prawniku
- **Contact** - Formularz kontaktowy i dane
- **Footer** - Stopka z linkami i informacjami

## 📱 Responsywność

Projekt jest w pełni responsywny z breakpointami:
- **Mobile**: < 480px
- **Tablet**: 768px
- **Desktop**: 1024px+

## 🔧 Konfiguracja

### Astro
- Static site generation
- Tailwind CSS integration
- Sitemap generation
- TypeScript support

### Tailwind
- Custom color palette
- Custom fonts
- Custom animations
- Responsive utilities

## 📈 SEO

- Meta tagi dla każdej strony
- Open Graph i Twitter Cards
- Dane strukturalne JSON-LD
- Automatyczna mapa strony
- Optymalizacja Core Web Vitals

## 🚀 Deployment

Projekt można wdrożyć na:
- **Vercel** (zalecane)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 📝 Licencja

© 2024 Diana Magdalena Kalinowska. Wszystkie prawa zastrzeżone.