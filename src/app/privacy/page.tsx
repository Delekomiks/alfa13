'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import Head from 'next/head';

export default function Privacy() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Head>
        <title>Политика конфиденциальности | ООО «Альфа 13»</title>
        <meta name="description" content="Политика конфиденциальности и обработки персональных данных на сайте Альфа 13." />
      </Head>
      <main className="bg-grayDark min-h-screen font-roboto py-24 px-4 sm:px-8">
        <div className="container mx-auto max-w-4xl bg-blackDeep rounded-lg p-6 sm:p-8 shadow-lg" data-aos="fade-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gold font-montserrat text-center">Политика конфиденциальности</h1>
          <p className="text-grayLight mb-4 font-roboto text-sm sm:text-base">Тут должен быть текст</p>
          

          {/* Продолжай с остальными разделами: Сбор данных, Использование, Защита, Изменения и т.д. — заполни по шаблону */}

          <p className="text-grayLight mt-8 font-roboto text-center">© 2025 ООО «Альфа 13». Все права защищены.</p>
        </div>
      </main>
    </>
  );
}