import { Config } from 'tailwindcss';

/** Adds the default MantineUI colors to the Tailwind configuration
 * NOTE: This has to be up-to-date with your MantineUI version!
 * If it is not, you will only notice it at runtime when colors are
 * possibly undefined or re-defined with another unexpected value.
 */
const useMantineColors = (config: Config): Config => {
  const [mantineDefaultShadeLight, mantineDefaultShadeDark] = [6, 8];
  const mantine: { [key: string]: any } = {
    'mantine-primary': {
      0: 'var(--mantine-primary-color-0)',
      1: 'var(--mantine-primary-color-1)',
      2: 'var(--mantine-primary-color-2)',
      3: 'var(--mantine-primary-color-3)',
      4: 'var(--mantine-primary-color-4)',
      5: 'var(--mantine-primary-color-5)',
      6: 'var(--mantine-primary-color-6)',
      7: 'var(--mantine-primary-color-7)',
      8: 'var(--mantine-primary-color-8)',
      9: 'var(--mantine-primary-color-9)',
    },
    'mantine-dark': {
      0: 'var(--mantine-color-dark-0)',
      1: 'var(--mantine-color-dark-1)',
      2: 'var(--mantine-color-dark-2)',
      3: 'var(--mantine-color-dark-3)',
      4: 'var(--mantine-color-dark-4)',
      5: 'var(--mantine-color-dark-5)',
      6: 'var(--mantine-color-dark-6)',
      7: 'var(--mantine-color-dark-7)',
      8: 'var(--mantine-color-dark-8)',
      9: 'var(--mantine-color-dark-9)',
    },
    'mantine-gray': {
      0: 'var(--mantine-color-gray-0)',
      1: 'var(--mantine-color-gray-1)',
      2: 'var(--mantine-color-gray-2)',
      3: 'var(--mantine-color-gray-3)',
      4: 'var(--mantine-color-gray-4)',
      5: 'var(--mantine-color-gray-5)',
      6: 'var(--mantine-color-gray-6)',
      7: 'var(--mantine-color-gray-7)',
      8: 'var(--mantine-color-gray-8)',
      9: 'var(--mantine-color-gray-9)',
    },
    'mantine-red': {
      0: 'var(--mantine-color-red-0)',
      1: 'var(--mantine-color-red-1)',
      2: 'var(--mantine-color-red-2)',
      3: 'var(--mantine-color-red-3)',
      4: 'var(--mantine-color-red-4)',
      5: 'var(--mantine-color-red-5)',
      6: 'var(--mantine-color-red-6)',
      7: 'var(--mantine-color-red-7)',
      8: 'var(--mantine-color-red-8)',
      9: 'var(--mantine-color-red-9)',
    },
    'mantine-pink': {
      0: 'var(--mantine-color-pink-0)',
      1: 'var(--mantine-color-pink-1)',
      2: 'var(--mantine-color-pink-2)',
      3: 'var(--mantine-color-pink-3)',
      4: 'var(--mantine-color-pink-4)',
      5: 'var(--mantine-color-pink-5)',
      6: 'var(--mantine-color-pink-6)',
      7: 'var(--mantine-color-pink-7)',
      8: 'var(--mantine-color-pink-8)',
      9: 'var(--mantine-color-pink-9)',
    },
    'mantine-grape': {
      0: 'var(--mantine-color-grape-0)',
      1: 'var(--mantine-color-grape-1)',
      2: 'var(--mantine-color-grape-2)',
      3: 'var(--mantine-color-grape-3)',
      4: 'var(--mantine-color-grape-4)',
      5: 'var(--mantine-color-grape-5)',
      6: 'var(--mantine-color-grape-6)',
      7: 'var(--mantine-color-grape-7)',
      8: 'var(--mantine-color-grape-8)',
      9: 'var(--mantine-color-grape-9)',
    },
    'mantine-violet': {
      0: 'var(--mantine-color-violet-0)',
      1: 'var(--mantine-color-violet-1)',
      2: 'var(--mantine-color-violet-2)',
      3: 'var(--mantine-color-violet-3)',
      4: 'var(--mantine-color-violet-4)',
      5: 'var(--mantine-color-violet-5)',
      6: 'var(--mantine-color-violet-6)',
      7: 'var(--mantine-color-violet-7)',
      8: 'var(--mantine-color-violet-8)',
      9: 'var(--mantine-color-violet-9)',
    },
    'mantine-indigo': {
      0: 'var(--mantine-color-indigo-0)',
      1: 'var(--mantine-color-indigo-1)',
      2: 'var(--mantine-color-indigo-2)',
      3: 'var(--mantine-color-indigo-3)',
      4: 'var(--mantine-color-indigo-4)',
      5: 'var(--mantine-color-indigo-5)',
      6: 'var(--mantine-color-indigo-6)',
      7: 'var(--mantine-color-indigo-7)',
      8: 'var(--mantine-color-indigo-8)',
      9: 'var(--mantine-color-indigo-9)',
    },
    'mantine-blue': {
      0: 'var(--mantine-color-blue-0)',
      1: 'var(--mantine-color-blue-1)',
      2: 'var(--mantine-color-blue-2)',
      3: 'var(--mantine-color-blue-3)',
      4: 'var(--mantine-color-blue-4)',
      5: 'var(--mantine-color-blue-5)',
      6: 'var(--mantine-color-blue-6)',
      7: 'var(--mantine-color-blue-7)',
      8: 'var(--mantine-color-blue-8)',
      9: 'var(--mantine-color-blue-9)',
    },
    'mantine-cyan': {
      0: 'var(--mantine-color-cyan-0)',
      1: 'var(--mantine-color-cyan-1)',
      2: 'var(--mantine-color-cyan-2)',
      3: 'var(--mantine-color-cyan-3)',
      4: 'var(--mantine-color-cyan-4)',
      5: 'var(--mantine-color-cyan-5)',
      6: 'var(--mantine-color-cyan-6)',
      7: 'var(--mantine-color-cyan-7)',
      8: 'var(--mantine-color-cyan-8)',
      9: 'var(--mantine-color-cyan-9)',
    },
    'mantine-teal': {
      0: 'var(--mantine-color-teal-0)',
      1: 'var(--mantine-color-teal-1)',
      2: 'var(--mantine-color-teal-2)',
      3: 'var(--mantine-color-teal-3)',
      4: 'var(--mantine-color-teal-4)',
      5: 'var(--mantine-color-teal-5)',
      6: 'var(--mantine-color-teal-6)',
      7: 'var(--mantine-color-teal-7)',
      8: 'var(--mantine-color-teal-8)',
      9: 'var(--mantine-color-teal-9)',
    },
    'mantine-green': {
      0: 'var(--mantine-color-green-0)',
      1: 'var(--mantine-color-green-1)',
      2: 'var(--mantine-color-green-2)',
      3: 'var(--mantine-color-green-3)',
      4: 'var(--mantine-color-green-4)',
      5: 'var(--mantine-color-green-5)',
      6: 'var(--mantine-color-green-6)',
      7: 'var(--mantine-color-green-7)',
      8: 'var(--mantine-color-green-8)',
      9: 'var(--mantine-color-green-9)',
    },
    'mantine-lime': {
      0: 'var(--mantine-color-lime-0)',
      1: 'var(--mantine-color-lime-1)',
      2: 'var(--mantine-color-lime-2)',
      3: 'var(--mantine-color-lime-3)',
      4: 'var(--mantine-color-lime-4)',
      5: 'var(--mantine-color-lime-5)',
      6: 'var(--mantine-color-lime-6)',
      7: 'var(--mantine-color-lime-7)',
      8: 'var(--mantine-color-lime-8)',
      9: 'var(--mantine-color-lime-9)',
    },
    'mantine-yellow': {
      0: 'var(--mantine-color-yellow-0)',
      1: 'var(--mantine-color-yellow-1)',
      2: 'var(--mantine-color-yellow-2)',
      3: 'var(--mantine-color-yellow-3)',
      4: 'var(--mantine-color-yellow-4)',
      5: 'var(--mantine-color-yellow-5)',
      6: 'var(--mantine-color-yellow-6)',
      7: 'var(--mantine-color-yellow-7)',
      8: 'var(--mantine-color-yellow-8)',
      9: 'var(--mantine-color-yellow-9)',
    },
    'mantine-orange': {
      0: 'var(--mantine-color-orange-0)',
      1: 'var(--mantine-color-orange-1)',
      2: 'var(--mantine-color-orange-2)',
      3: 'var(--mantine-color-orange-3)',
      4: 'var(--mantine-color-orange-4)',
      5: 'var(--mantine-color-orange-5)',
      6: 'var(--mantine-color-orange-6)',
      7: 'var(--mantine-color-orange-7)',
      8: 'var(--mantine-color-orange-8)',
      9: 'var(--mantine-color-orange-9)',
    },
  };

  const mantineDefaults = {
    'mantine-default-border': 'var(--mantine-color-default-border)',
    'mantine-default-text': 'var(--mantine-color-text)',
    'mantine-default': 'var(--mantine-color-default)',
    'mantine-default-color': 'var(--mantine-color-default-color)',
    'mantine-default-hover': 'var(--mantine-color-default-hover)',
    'mantine-default-dimmed': 'var(--mantine-color-dimmed)',
    'mantine-nl-bg': 'var(--nl-bg)',
    'mantine-nl-hover': 'var(--nl-hover)',
    'mantine-nl-color': 'var(--nl-color)',
    'mantine-lt-color-white': 'var(--lt-color-white)',
    'mantine-lt-color-black': 'var(--lt-color-black)',
    'mantine-lt-color-transparent': 'var(--lt-color-transparent)',
    'mantine-lt-color-background-light': 'var(--lt-color-background-light)',
    'mantine-lt-color-background-default': 'var(--lt-color-background-default)',
    'mantine-lt-color-background-dark': 'var(--lt-color-background-dark)',
    'mantine-lt-color-border-light': 'var(--lt-color-border-light)',
    'mantine-lt-color-border-default': 'var(--lt-color-border-default)',
    'mantine-lt-color-border-dark': 'var(--lt-color-border-dark)',
    'mantine-lt-color-text-very-light': 'var(--lt-color-text-very-light)',
    'mantine-lt-color-text-light': 'var(--lt-color-text-light)',
    'mantine-lt-color-text-default': 'var(--lt-color-text-default)',
    'mantine-lt-color-text-dark': 'var(--lt-color-text-dark)',
    'mantine-lt-color-overlay-default': 'var(--lt-color-overlay-default)',
    'mantine-lt-color-overlay-dark': 'var(--lt-color-overlay-dark)',
    'mantine-lt-color-overlay-transparent': 'var(--lt-color-overlay-transparent)',
  };

  const customColors = {};

  // Add a tailwind color variant to match the MantineUI theme color for the configured shade
  const hoverLightLighterShade = mantineDefaultShadeLight - 1;
  const hoverLightDarkerShade = mantineDefaultShadeLight + 1;
  const hoverDarkLighterShade = mantineDefaultShadeDark - 1;
  const hoverDarkDarkerShade = mantineDefaultShadeDark + 1;
  for (const [key, value] of Object.entries(mantine)) {
    mantine[key].light = `${value[0].slice(0, -2) + mantineDefaultShadeLight})`;
    mantine[key].dark = `${value[0].slice(0, -2) + mantineDefaultShadeDark})`;
    mantine[key]['light-hover-lighter'] = `${value[0].slice(0, -2) + hoverLightLighterShade})`;
    mantine[key]['light-hover-darker'] = `${value[0].slice(0, -2) + hoverLightDarkerShade})`;
    mantine[key]['dark-hover-lighter'] = `${value[0].slice(0, -2) + hoverDarkLighterShade})`;
    mantine[key]['dark-hover-darker'] = `${value[0].slice(0, -2) + hoverDarkDarkerShade})`;
  }

  return {
    ...config,
    corePlugins: {
      preflight: false, // This line is important
    },
    theme: {
      ...config?.theme,

      extend: {
        ...config?.theme?.extend,
        screens: {
          xs: '480px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        colors: {
          ...config?.theme?.extend?.colors,
          ...mantine,
          ...mantineDefaults,
          ...customColors,
        },
        backgroundImage: {
          'hero-pattern': "url('/graph-paper.svg')",
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'diagonal-lines':
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239a9b9c' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
          'diagonal-lines-dark':
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' fill='%239a9b9c'/%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",

          'polka-dots':
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
          'conic-gradient':
            'conic-gradient(green 0deg 90deg, yellow 90deg 180deg, red 180deg 270deg, blue 270deg 360deg)',
          'sap-gradient': 'linear-gradient(180deg, rgba(3,174,235,1) 0%, rgba(29,97,188,1) 100%)',
        },
      },
    },
  };
};

const base: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx,css,scss,sass}'],
};

export default useMantineColors(base);
