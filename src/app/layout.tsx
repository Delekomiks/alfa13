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
  title: 'ООО "Альфа 13" — интегратор полного цикла',
  description: 'Мы объединяем стратегию и инженерную практику с цифровым мышлением и консультативным подходом — от ИБ и ИТ-инфраструктуры до проектирования/строительства объектов и мультимедийных систем',
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