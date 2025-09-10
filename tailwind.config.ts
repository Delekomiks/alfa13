import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Твоя схема из таблицы
        blackDeep: '#1A1A1A', // Глубокий чёрный (header фон, hero)
        grayMedium: '#4F4F4F', // Средний серый (логотип, карточки, формы)
        grayLight: '#B5B5B5', // Светлый серый (текст, подзаголовки)
        gold: '#D4AF37', // Золотой (акценты, заголовки, кнопки)
        goldHover: '#A67C00', // Hover для золотого
        grayDark: '#2B2B2B', // Тёмно-серый (footer, секции body)
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Заголовки (bold)
        roboto: ['Roboto', 'sans-serif'], // Текст (regular)
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Поддержка dark mode
};

export default config;