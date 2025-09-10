// src/app/data.ts

export type Project = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  clientIcon: string;
  background: string;
  aosDelay: number;
};

export type Partner = {
  id: number;
  src: string;
  alt: string;
  background: string;
};

export type Industry = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  services: string[]; // Добавил поле для уникального списка услуг/пунктов
};

//Партнеры
export const partners: Partner[] = [
  { id: 1, src: '/images/Clients/test.png', alt: 'Партнёр 1 - описание для доступности', background: '/images/Backgrounds/1.png' },
  { id: 2, src: '/images/Clients/test.png', alt: 'Партнёр 2 - описание для доступности', background: '/images/Backgrounds/2.png' },
  { id: 3, src: '/images/Clients/test.png', alt: 'Партнёр 3 - описание для доступности', background: '/images/Backgrounds/3.png' },
  { id: 4, src: '/images/Clients/test.png', alt: 'Партнёр 4 - описание для доступности', background: '/images/Backgrounds/1.png' },
];


//Проекты
export const projects: Project[] = [
  { 
    id: 1, 
    src: '/images/Projects/1.jpg', 
    alt: 'Проект 1 - описание изображения', 
    title: 'Проект 1', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/test.png',
    background: '/images/Backgrounds/1.png',
    aosDelay: 0
  },
  { 
    id: 2, 
    src: '/images/Projects/1.jpg', 
    alt: 'Проект 2 - описание изображения', 
    title: 'Проект 2', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/test.png',
    background: '/images/Backgrounds/2.png',
    aosDelay: 100
  },
  { 
    id: 3, 
    src: '/images/Projects/1.jpg', 
    alt: 'Проект 3 - описание изображения', 
    title: 'Проект 3', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/test.png',
    background: '/images/Backgrounds/3.png',
    aosDelay: 200
  },
  { 
    id: 4,
    src: '/images/Projects/1.jpg',  
    alt: 'Проект 4 - описание изображения', 
    title: 'Проект 4', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/test.png',
    background: '/images/Backgrounds/1.png',  
    aosDelay: 300
  },
  { 
    id: 5,  
    src: '/images/Projects/1.jpg',  
    alt: 'Проект 5 - описание изображения', 
    title: 'Проект 5', 
    description: 'Sed ut perspiciatis,unde omnis iste natus error unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis sit Sed ut perspiciatiSed ut perspiciatis,unde omnis iste natus error unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis sitSed ut perspiciatis,unde omnis iste natus error unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis sits,unde omnis iste natus error unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis sit voluptatem accusantium doloremque laudantium Sed ut perspiciatisunde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium  doloremque laudantium', 
    clientIcon: '/images/Clients/test.png',
    background: '/images/Backgrounds/2.png',
    aosDelay: 400  
  },
  { 
    id: 6,  
    src: '/images/Projects/1.jpg',  
    alt: 'Проект 6 - описание изображения', 
    title: 'Проект 6', 
    description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 
    clientIcon: '/images/Clients/test.png',
    background: '/images/Backgrounds/3.png',
    aosDelay: 500
  },
];


//Направления с добавленными уникальными списками services
export const industries: Industry[] = [
  {
    id: 1,
    src: '/images/Industries/cb.png',
    alt: 'КОМПЛЕКСНАЯ БЕЗОПАСНОСТЬ',
    title: 'КОМПЛЕКСНАЯ БЕЗОПАСНОСТЬ',
    description: 'Комплексная защита бизнеса «под ключ»: от аудита и проектирования до внедрения и 24/7 сопровождения. Снижаем риски, обеспечиваем непрерывность и соответствие требованиям (ФСТЭК/ФСБ/ISO). ',
    services: [
      'Аудит и архитектура',
      'DLP/SIEM/SOAR',
      'СЗИ/КИИ',
      'Пентесты',
      'SOC as a Service'
    ]
  },
  {
    id: 2,
    src: '/images/Industries/str.png',
    alt: 'СТРОИТЕЛЬСТВО',
    title: 'СТРОИТЕЛЬСТВО',
    description: 'Проектируем и строим объекты и инженерные системы с гарантией сроков и бюджета. Полный цикл: П(Д) и СМР, пуско-наладка, ввод в эксплуатацию.',
    services: [
      'МЭП/ОВиК',
      'СКС/электрика',
      'СКУД/Видеонаблюдение',
      'Серверные/ЦОД',
      'Генподряд, технадзор'
    ]
  },
  {
    id: 5,
    src: '/images/Industries/multi.png',
    alt: 'МУЛЬТИМЕДИА',
    title: 'МУЛЬТИМЕДИА',
    description: 'Современный A/V-опыт для офисов, кампусов и публичных пространств — от концепции до сервисного контракта.',
    services: [
      'Переговорные «под ключ»',
      'Видеостены/LED',
      'Digital Signage',
      'Трансляции/вебкасты',
      'Акустика'
    ]
  },
    {
    id: 4,
    src: '/images/Industries/it.png',
    alt: 'IT',
    title: 'IT',
    description: 'Надёжная и масштабируемая инфраструктура для приложений и рабочих мест: on-prem, облако и гибрид. Эксплуатация по SLA. ',
    services: [
      'Сети и Wi-Fi',
      'Виртуализация/VDI',
      'Облака и резервирование',
      'DevOps/SRE',
      'Наблюдаемость/Monitoring'
    ]
  },
  
];