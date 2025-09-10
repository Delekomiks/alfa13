'use client';
import { useEffect, useState, ReactNode } from 'react';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import AOS from 'aos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Type definitions
type Project = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  clientIcon: string;
  background: string;
  aosDelay: number;
};

type Partner = {
  id: number;
  src: string;
  alt: string;
  background: string;
};

// Data arrays
const partners: Partner[] = [
  { id: 1, src: '/images/clients/3.png', alt: 'Партнёр 1 - описание для доступности', background: '/images/2port.png' },
  { id: 2, src: '/images/clients/2.png', alt: 'Партнёр 2 - описание для доступности', background: '/images/2port.png' },
  { id: 3, src: '/images/clients/2.png', alt: 'Партнёр 3 - описание для доступности', background: '/images/2port.png' },
  { id: 4, src: '/images/clients/3.png', alt: 'Партнёр 4 - описание для доступности', background: '/images/2port.png' },
];

const projects: Project[] = [
  { 
    id: 1, 
    src: '/images/ProjectImg/1.jpg', 
    alt: 'Проект 1 - описание изображения', 
    title: 'Проект 1', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/1.png',
    background: '/images/1port.png',
    aosDelay: 0
  },
  { 
    id: 2, 
    src: '/images/ProjectImg/1.jpg', 
    alt: 'Проект 2 - описание изображения', 
    title: 'Проект 2', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/2.png',
    background: '/images/2port.png',
    aosDelay: 100
  },
  { 
    id: 3, 
    src: '/images/ProjectImg/1.jpg', 
    alt: 'Проект 3 - описание изображения', 
    title: 'Проект 3', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/1.png',
    background: '/images/3port.png',
    aosDelay: 200
  },
  { 
    id: 4,
    src: '/images/ProjectImg/1.jpg',  
    alt: 'Проект 4 - описание изображения', 
    title: 'Проект 4', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/1.png',
    background: '/images/1port.png',  
    aosDelay: 300
  },
  { 
    id: 5,  
    src: '/images/ProjectImg/1.jpg',  
    alt: 'Проект 5 - описание изображения', 
    title: 'Проект 5', 
    description: 'Sed ut perspiciatis,unde omnis iste natus error unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis sit voluptatem accusantium doloremque laudantium Sed ut perspiciatisunde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/1.png',
    background: '/images/2port.png',
    aosDelay: 400  
  },
  { 
    id: 6,  
    src: '/images/ProjectImg/1.jpg',  
    alt: 'Проект 6 - описание изображения', 
    title: 'Проект 6', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/1.png',
    background: '/images/3port.png',
    aosDelay: 500
  },
];

// Полностью независимые настройки для портфолио
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const portfolioSliderSettings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: isMobile ? 1 : 3,
  slidesToScroll: 1,
  arrows: !isMobile,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
};

const partnersSliderSettings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 18000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
};

// Smooth scroll handler
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

// Reusable NavLink
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

// Memoized ProjectCard
const ProjectCard = React.memo(({ project }: { project: Project }) => (
  <div 
    className="px-2 h-full"
    data-aos="zoom-in" 
    data-aos-delay={project.aosDelay}
  >
    <div className="relative p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition border border-blackDeep overflow-hidden min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex flex-col h-full">
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
              className="w-full h-32 sm:h-48 object-cover object-center rounded border border-blackDeep mb-2"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
            />
          ) : (
            <div className="w-full h-32 sm:h-48 rounded border border-blackDeep bg-transparent mb-2" />
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
          <p className="text-grayLight font-roboto line-clamp-4 sm:line-clamp-6 overflow-hidden text-sm sm:text-base">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  </div>
));
ProjectCard.displayName = 'ProjectCard';

// Memoized PartnerCard
const PartnerCard = React.memo(({ partner, index }: { partner: Partner; index: number }) => (
  <div 
    className="px-2 h-full"
    data-aos="zoom-in" 
    data-aos-delay={index * 100}
  >
    <div className="relative p-1 rounded-lg shadow-md hover:shadow-lg transition border border-blackDeep overflow-hidden min-h-[120px] sm:min-h-[150px] md:min-h-[200px] flex flex-col h-full">
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

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {/* Header */}
        <header className={`bg-blackDeep shadow-md fixed w-full z-10 top-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-opacity-95' : ''}`}>
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
                src="/logo.svg" 
                alt="Логотип компании Альфа 13" 
                width={82} 
                height={28} 
                className="filter grayscale invert-[0.6] logo-highlight-gold" 
                priority 
                sizes="82px"
              />
              <span className="text-gold text-sm font-montserrat font-bold select-none">ООО «Альфа 13»</span>
            </div>
            <ul className="hidden md:flex space-x-4 items-center">
              <li><NavLink href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>О компании</NavLink></li>
              <li><NavLink href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')}>Портфолио</NavLink></li>
              <li><NavLink href="#partners" onClick={(e) => handleSmoothScroll(e, '#partners')}>Партнёры</NavLink></li>
              <li><NavLink href="#contacts" onClick={(e) => handleSmoothScroll(e, '#contacts')}>Контакты</NavLink></li>
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
              <li><NavLink href="#portfolio" onClick={(e) => { handleSmoothScroll(e, '#portfolio'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Портфолио</NavLink></li>
              <li><NavLink href="#partners" onClick={(e) => { handleSmoothScroll(e, '#partners'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Партнёры</NavLink></li>
              <li><NavLink href="#contacts" onClick={(e) => { handleSmoothScroll(e, '#contacts'); setIsMobileMenuOpen(false); }} className="block w-full text-center">Контакты</NavLink></li>
            </ul>
          )}
        </header>

        {/* Hero */}
        <section id="about" className="min-h-[80vh] sm:min-h-screen flex items-center justify-center pt-24 relative overflow-hidden" data-aos="fade-up">
          <Image 
            src="/images/test.gif" 
            alt="Фоновое изображение для раздела О компании" 
            fill 
            className="object-cover z-0" 
            priority 
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-black opacity-72 z-10"></div>
          <div className="container mx-auto px-4 text-center relative z-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-gold font-montserrat">Умный текст</h2>
            <p className="text-base sm:text-xl text-grayLight max-w-2xl mx-auto mb-6 font-roboto line-clamp-[8] sm:line-clamp-none">
              Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
            </p>
          </div>
        </section>

{/* Portfolio */}
<section id="portfolio" className="py-10 sm:py-20 bg-grayDark pt-24" data-aos="fade-up">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gold font-montserrat">Портфолио</h2>
    <Slider key="portfolio-slider" {...portfolioSliderSettings} aria-label="Карусель портфолио">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Slider>
  </div>
</section>

        {/* Partners */}
        <section id="partners" className="py-10 sm:py-20 bg-grayDark pt-24" data-aos="fade-up">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gold font-montserrat">Партнёры</h2>
            <Slider {...partnersSliderSettings} aria-label="Карусель партнёров">
              {partners.map((partner, index) => (
                <PartnerCard key={partner.id} partner={partner} index={index} />
              ))}
            </Slider>
          </div>
        </section>

        {/* Footer */}
        <footer id="contacts" className="relative text-white py-6 sm:py-8 border-t border-blackDeep overflow-hidden mt-10 sm:mt-20">
          <Image
            src="/images/footer-bg.jpg"
            alt="Фоновое изображение для футера"
            fill
            className="object-cover z-[-1]"
            quality={70}
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-grayDark opacity-80 z-0" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <hr className="border-gold my-4 w-24 mx-auto" />
            <p className="text-xs sm:text-sm text-grayLight mb-4 font-roboto">
              Адрес: ул. Примерная, 123 | 
              Тел: <a href="tel:+74951234567" className="hover:text-gold transition font-roboto">+7 (495) 123-45-67</a> | 
              Email: <a href="mailto:info@alfa13.ru" className="hover:text-gold transition font-roboto" aria-label="Отправить email на info@alfa13.ru">info@alfa13.ru</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}