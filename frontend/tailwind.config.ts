import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '600px',
        md: '904px',
        mdl: '980px',
        lg: '1240px',
      },
      fontFamily: {
        open_sans: ['Open Sans', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '9px': '0.562rem',
        '11px': '0.688rem',
        '12px': '0.812rem',
        '13px': '0.812rem',
        '14px': '0.875rem',
        '16px': '1rem',
        '18px': '1.125rem',
        '20px': '1.250rem',
        '23px': '1.438rem',
        '26px': '1.625rem',
        '29px': '1.812rem',
        '32px': '2rem',
        '36px': '2.25rem',
      },
    },
  },
};
export default config;
