'use client';
import { useEffect, useState, ReactNode } from 'react';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import AOS from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { projects, partners, industries, Project, Partner, Industry } from './data'; 



const partnersSwiperSettings = {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  speed: 300,
  pagination: { clickable: true },
  navigation: false, 
  autoplay: {
    delay: 18000,
    disableOnInteraction: false
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      navigation: false
    },
    1024: {
      slidesPerView: 2,
      navigation: false
    },
    1280: { 
      slidesPerView: 3,
      navigation: true
    }
  }
};


const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};


const NavLink = ({ href, children, onClick, className = '' }: { href: string; children: ReactNode; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; className?: string }) => (
  <a
    href={href}
    onClick={onClick}
    className={`bg-gold text-blackDeep px-4 py-1 rounded text-sm font-montserrat font-bold hover:bg-goldHover transition ${className}`}
  >
    {children}
  </a>
);
NavLink.displayName = 'NavLink';


const ProjectCard = React.memo(({ project }: { project: Project }) => (
  <div 
    className="px-2 h-full"
    data-aos="zoom-in" 
    data-aos-delay={project.aosDelay}
  >
    <div className="relative p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition  overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex flex-col h-full">
      {project.background ? (
        <Image
          src={project.background}
          alt={`Фон для проекта ${project.title}`}
          fill
          className="object-cover opacity-40 z-[-1]"
          quality={60}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-600/30 opacity-50 z-[-1]" />
      )}
      <div className="absolute inset-0 bg-black/82 z-0" />
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="mb-4">
          {project.src ? (
            <Image 
              src={project.src} 
              alt={project.alt}
              width={400} 
              height={250} 
              className="w-full h-50 sm:h-70 object-cover object-center rounded  mb-2"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
            />
          ) : (
            <div className="w-full h-50 sm:h-70 rounded  bg-transparent mb-2" />
          )}
          <button 
            className="w-full bg-gold text-blackDeep px-4 py-1 rounded text-sm font-montserrat font-bold hover:bg-goldHover transition flex items-center justify-between"
          >
            <span className="flex-1 text-left">
              {project.title}
            </span>
            {project.clientIcon ? (
              <Image 
                src={project.clientIcon} 
                alt={`Иконка клиента для ${project.title}`}
                width={32} 
                height={32} 
                className="ml-2"
                loading="lazy"
                sizes="32px"
              />
            ) : (
              <div className="w-4 h-4 ml-2 bg-gray-500 rounded-full" />
            )}
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-start mb-4">
          <p className="text-grayLight font-roboto line-clamp-10 sm:line-clamp-10 overflow-hidden text-sm sm:text-base">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  </div>
));
ProjectCard.displayName = 'ProjectCard';


const PartnerCard = React.memo(({ partner, index }: { partner: Partner; index: number }) => (
  <div 
    className="px-2 h-full"
    data-aos="zoom-in" 
    data-aos-delay={index * 100}
  >
    <div className="relative p-1 rounded-lg shadow-md hover:shadow-lg transition  overflow-hidden min-h-[120px] sm:min-h-[150px] md:min-h-[200px] flex flex-col h-full">
      {partner.background ? (
        <Image
          src={partner.background}
          alt={`Фон для партнёра ${partner.alt}`}
          fill
          className="object-cover opacity-40 z-[-1]"
          quality={60}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-600/30 opacity-50 z-[-1]" />
      )}
      <div className="absolute inset-0 bg-black/82 z-0" />
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
        {partner.src ? (
          <Image 
            src={partner.src} 
            alt={partner.alt}
            width={100}
            height={100}
            className="w-[100px] h-[100px] sm:w-[175px] sm:h-[175px]"
            loading="lazy"
            sizes="(max-width: 768px) 100px, 175px"
            onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
          />
        ) : (
          <div className="w-full h-[85%] rounded bg-gray-800 flex items-center justify-center" />
        )}
      </div>
    </div>
  </div>
));
PartnerCard.displayName = 'PartnerCard';


const IndustryCard = React.memo(({ industry, index, onOpenModal }: { industry: Industry; index: number; onOpenModal: (industry: Industry) => void }) => (
  <div 
    className="relative rounded-lg shadow-md overflow-hidden h-110 cursor-pointer industry-card"
    data-aos="zoom-in" 
    data-aos-delay={index * 100}
    onClick={() => onOpenModal(industry)}
  >
    <Image 
      src={industry.src} 
      alt={industry.alt}
      fill
      className="object-cover"
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 25vw"
      onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
    />
    <div className="absolute bottom-0 left-0 right-0 bg-blackDeep p-4 text-center opacity-90">
      <h3 className="text-lg font-semibold text-gold font-montserrat">{industry.title}</h3>
    </div>
  </div>
));
IndustryCard.displayName = 'IndustryCard';


const IndustryModal = ({ industry, onClose }: { industry: Industry; onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className={`fixed inset-0 bg-black/85 bg-opacity-20 flex items-center justify-center z-20 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
      <div className={`bg-blackDeep rounded-lg p-6 max-w-lg w-full mx-4 transform transition-transform duration-300 ease-in-out ${isVisible ? 'scale-100' : 'scale-95'}`} onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gold text-2xl" onClick={onClose}>×</button>
        <h3 className="text-xl font-bold mb-2 text-gold font-montserrat">{industry.title}</h3>
        <p className="text-grayLight font-roboto mb-4">{industry.description}</p>
        {industry.services && industry.services.length > 0 && (
          <ul className="list-disc pl-5 space-y-2 text-grayLight font-roboto text-sm sm:text-base">
            {industry.services.map((item, index) => (
              <li key={index} className="marker:text-gold">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


const ContactModal = ({ onClose }: { onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    
    const script = document.createElement('script');
    script.src = 'https://forms.yandex.ru/_static/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 bg-black/85 flex items-center justify-center z-20 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      onClick={onClose}
    >
      <div 
        className={`bg-blackDeep rounded-lg p-4 sm:p-6 max-w-md sm:max-w-xl md:max-w-3xl w-full mx-4 transform transition-transform duration-300 ease-in-out ${isVisible ? 'scale-100' : 'scale-95'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-gold text-2xl" onClick={onClose}>×</button>
        <h3 className="text-xl font-bold mb-4 text-gold font-montserrat text-center">Связаться с нами</h3>
        <div className="w-full flex justify-center items-start overflow-auto max-h-[80vh]">
          <iframe 
            src="https://forms.yandex.ru/cloud/68c1f380068ff0225209a264?iframe=1" 
            frameBorder="0" 
            name="ya-form-68c1f380068ff0225209a264" 
            className="w-full md:w-[650px] min-h-[500px] md:min-h-[600px] h-auto rounded-md"  
            style={{ margin: '0 auto' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <main className="bg-grayDark min-h-screen font-roboto">
        
        <header className={`bg-grayDark/76 shadow-md fixed w-full z-10 top-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-opacity-95' : ''}`}>
          <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-100 transition focus:outline-none" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
              aria-label="Вернуться на главную страницу"
            >
              <Image 
                src="/logo.png" 
                alt="Логотип компании Альфа 13" 
                width={82} 
                height={28} 
                className="logo-highlight-gold" 
                priority 
                sizes="1200px"
              />
              
            </div>
            <ul className="hidden md:flex space-x-4 items-center">
              <li><NavLink href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>О компании</NavLink></li>
              <li><NavLink href="#industries" onClick={(e) => handleSmoothScroll(e, '#industries')}>Отрасли</NavLink></li>
           
              {/*<li><NavLink href="#partners" onClick={(e) => handleSmoothScroll(e, '#partners')}>Партнёры</NavLink></li>*/}
              <li><NavLink href="#contacts" onClick={(e) => handleSmoothScroll(e, '#contacts')}>Контакты</NavLink></li>
              {/*<li><NavLink href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}>Связаться</NavLink></li>*/}
            </ul>
            <button 
              className="md:hidden text-gold text-2xl focus:outline-none focus:ring-2 focus:ring-gold"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMobileMenuOpen}
            >
              ☰
            </button>
          </nav>
          {isMobileMenuOpen && (
            <ul className="md:hidden bg-blackDeep px-4 py-2 space-y-2">
              <li><NavLink href="#about" onClick={(e) => { handleSmoothScroll(e, '#about'); setIsMobileMenuOpen(false); }} className="block w-full text-center">О компании</NavLink></li>
              <li><NavLink href="#industries" onClick={(e) => { handleSmoothScroll(e, '#industries'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Отрасли</NavLink></li>
              <li><NavLink href="#portfolio" onClick={(e) => { handleSmoothScroll(e, '#portfolio'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Портфолио</NavLink></li>
              <li><NavLink href="#partners" onClick={(e) => { handleSmoothScroll(e, '#partners'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Партнёры</NavLink></li>
              <li><NavLink href="#contacts" onClick={(e) => { handleSmoothScroll(e, '#contacts'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Контакты</NavLink></li>
              {/*<li><NavLink href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); setIsMobileMenuOpen(false); }} className="block w-full text-center">Связаться</NavLink></li>*/}
            </ul>
          )}
        </header>

     
        <section id="about" className="min-h-[80vh] sm:min-h-screen flex items-center justify-center pt-24 relative overflow-hidden" data-aos="fade-up">
          <Image 
            src="/images/Backgrounds/about.gif" 
            alt="Фоновое изображение для раздела О компании" 
            fill 
            className="object-cover z-0" 
            priority 
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-black opacity-72 z-10"></div>
          <div className="container mx-auto px-4 text-center relative z-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-gold font-montserrat">Цифровая трансформация с отраслевой глубиной и измеримым ростом</h2>
            <p className="text-base sm:text-xl text-grayLight max-w-2xl mx-auto mb-6 font-roboto line-clamp-[8] sm:line-clamp-none">
              Мы объединяем стратегию и инженерную практику с цифровым мышлением и консультативным подходом — от ИБ и ИТ-инфраструктуры до проектирования/строительства объектов и мультимедийных систем — чтобы переосмысливать бизнес-модели, быстро строить и уверенно управлять решениями, которые ускоряют рост, повышают качество продукта и усиливают клиентский сервис в любой отрасли. 
            </p>
            <p className="text-base sm:text-xl text-grayLight max-w-2xl mx-auto mb-6 font-roboto line-clamp-[8] sm:line-clamp-none">
              Один партнёр, единые SLA, прозрачные метрики.
            </p>
          </div>
        </section>
          
       
        <section id="industries" className="py-10 sm:py-20 bg-grayDark pt-24" data-aos="fade-up">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gold font-montserrat">Отрасли</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 industries-grid">
              {industries.map((industry, index) => (
                <IndustryCard 
                  key={industry.id} 
                  industry={industry} 
                  index={index} 
                  onOpenModal={setSelectedIndustry} 
                />
              ))}
            </div>
          </div>
        </section>

        {selectedIndustry && (
          <IndustryModal 
            industry={selectedIndustry} 
            onClose={() => setSelectedIndustry(null)} 
          />
        )}

        {isContactModalOpen && <ContactModal onClose={() => setIsContactModalOpen(false)} />}
{/*
        <section id="partners" className="py-10 sm:py-20 bg-grayDark pt-24" data-aos="fade-up">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gold font-montserrat">Партнёры</h2>
            <Swiper {...partnersSwiperSettings} aria-label="Карусель партнёров">
              {partners.map((partner, index) => (
                <SwiperSlide key={partner.id}>
                  <PartnerCard partner={partner} index={index} />
                </SwiperSlide>
              ))}
            </Swiper> 
          </div>
        </section> 
*/}
       
<footer id="contacts" className="text-white py-6 sm:py-8 border-t border-blackDeep mt-10 sm:mt-20">
  <div className="container mx-auto px-4 text-center">
    <p className="text-gold text-base sm:text-lg font-montserrat font-bold mb-4 uppercase">Будущее зависит от наших решений сегодня</p>
    <hr className="border-gold my-4 w-24 mx-auto" />
    <p className="text-xs sm:text-sm text-grayLight mb-4 font-roboto">
      Адрес: ул. Примерная, 123 | 
      Тел: <a href="tel:+74951234567" className="hover:text-gold transition font-roboto">+7 (495) 123-45-67</a> | 
      Email: <a href="mailto:info@alfa13.ru" className="hover:text-gold transition font-roboto" aria-label="Отправить email на info@alfa13.ru">info@alfa13.ru</a>
      {/*<a href="/privacy" className="hover:text-gold transition font-roboto" aria-label="Политика конфиденциальности"> Политика конфиденциальности</a>*/}
    
    </p>
    <p className="text-grayLight mt-8 font-roboto text-center">© ООО «Альфа 13». Все права защищены.</p>
  </div>
</footer>
      </main>
    </>
  );
}