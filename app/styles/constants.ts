// Brand Colors
export const colors = {
  // Primary Colors
  charlesBlue: '#091F2F', // Pantone: 295C
  optimisticBlue: '#1871BD', // Pantone: 285C
  freedomTrailRed: '#D22D23', // Pantone: 1788C

  // Supporting Blues
  supportingBlues: {
    darkest: '#061622',
    dark: '#0C2639',
    desaturated: '#45789C',
    bright: '#51ACFF',
  },

  // Supporting Grays
  supportingGrays: {
    dark: '#58585B',
    medium: '#D2D2D2',
    light: '#E0E0E0',
    lightest: '#F2F2F2',
  },

  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
};

// Images/Logos
export const images = {
  logo: "https://www.boston.gov/sites/default/files/styles/med_small_square__200x200_/public/img/columns/2016/11/cob_b_white-01.png?itok=-SZRDrhw",
  logo_black: "https://patterns.boston.gov/images/b-dark.svg",
  digital_seal: "https://www.boston.gov/sites/default/files/styles/med_small_square__200x200_/public/img/columns/2016/11/city_seal_white-01.png?itok=cN-iUf0a",
  digital_seal_black: "https://patterns.boston.gov/images/public/seal.svg?swlhyg",
  official_seal: "https://www.boston.gov/sites/default/files/styles/med_small_square__200x200_/public/img/2016/o/official_seal_white-01.png?itok=656ZgJzQ"
}

// Typography
export const typography = {
  // Font Families
  fontFamily: {
    primary: 'Montserrat, Arial, sans-serif',
    secondary: 'Lora, Georgia, serif',
    fallback: 'Arial, sans-serif',
  },

  // Font Sizes
  fontSize: {
    // Base sizes
    base: '1rem', // 16px
    small: '0.875rem', // 14px
    large: '1.125rem', // 18px

    // Headings
    h1: '2.2rem', // 35.2px
    h2: '1.9rem', // 30.4px
    h3: '1.25rem', // 20px
    h4: '1rem', // 16px
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extraBold: 1000,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
  },
};

// Spacing System
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  xxl: '3rem',   // 48px
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

// Z-index layers
export const zIndex = {
  base: 0,
  drawer: 100,
  modal: 200,
  tooltip: 300,
  overlay: 400,
}; 