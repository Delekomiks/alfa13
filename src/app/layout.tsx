import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google'; // Импорт шрифтов из таблицы
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Regular и bold для заголовков
  variable: '--font-montserrat',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'], // Regular для текста
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Ваш Бизнес - Сайт-визитка',
  description: 'Современный одностраничный сайт для малого бизнеса с разделами О компании, Портфолио и Партнёры',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}