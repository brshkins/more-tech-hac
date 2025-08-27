import { Vacancy } from "../types/types";

export const mockVacancies: Vacancy[] = [
  {
    id: "vac-001",
    company: {
      id: "comp-001",
      name: "ВТБ",
      iconUrl: "/images/company/vtb.png",
      industry: "FinTech",
      siteUrl: "https://www.vtb.ru",
    },
    post: "UX/UI Дизайнер",
    salary: "120000 – 150000 ₽",
    tags: ["Фултайм", "Офис"],
    isFavorite: true,
    responsibilities: {
      title: "Обязанности",
      description: [
        "разработка UX/UI концепций для веб- и мобильных приложений;",
        "создание прототипов различной степени детализации (от low- до high-fidelity);",
        "разработка дизайн-макетов интерфейсов в Figma/Pixso;",
        "проведение UX-исследований (интервью, юзабилити-тестирование);",
        "взаимодействие с командами разработки, аналитики и продуктовыми менеджерами;",
        "поддержка и развитие существующей дизайн-системы.",
      ],
    },
    requirements: {
      title: "Требования",
      description: [
        "опыт работы дизайнером от 2 лет;",
        "уверенное владение Figma или Pixso;",
        "проведения UX исследований;",
        "понимание принципов UX и продуктовой аналитики;",
        "наличие портфолио реализованных проектов.",
      ],
    },
  },
  {
    id: "vac-002",
    company: {
      id: "comp-002",
      name: "Почта Банк",
      iconUrl: "/images/company/pochta.png",
      industry: "FinTech",
      siteUrl: "https://www.pochtabank.ru",
    },
    post: "Продуктовый Дизайнер",
    salary: "200 000 - 250 000 ₽",
    tags: ["Гибрид", "Senior"],
    isFavorite: false,
    responsibilities: {
      title: "Обязанности",
      description: [
        "ведение полного цикла продуктового дизайна;",
        "разработка CJM и пользовательских сценариев;",
        "создание дизайн-системы с нуля;",
        "работа в кросс-функциональной команде с продуктами и разработкой.",
      ],
    },
    requirements: {
      title: "Требования",
      description: [
        "опыт работы от 3 лет в продуктовых командах;",
        "умение работать с CJM, JTBD;",
        "уверенное владение Figma;",
        "опыт построения и внедрения дизайн-систем.",
      ],
    },
  },
  {
    id: "vac-003",
    company: {
      id: "comp-003",
      name: "БМ-банк",
      iconUrl: "/images/company/bm.png",
      industry: "FinTech",
      siteUrl: "https://www.bm-bank.ru/",
    },
    post: "Frontend разработчик",
    salary: "от 180 000 ₽",
    tags: ["Офис", "Гибкий график"],
    isFavorite: true,
    responsibilities: {
      title: "Обязанности",
      description: [
        "разработка интерфейсов аналитических систем;",
        "оптимизация производительности SPA;",
        "интеграция с backend-сервисами;",
        "поддержка и улучшение UI-библиотеки компании.",
      ],
    },
    requirements: {
      title: "Требования",
      description: [
        "опыт работы с React, TypeScript;",
        "знание принципов оптимизации фронтенд-приложений;",
        "опыт работы с REST и GraphQL;",
        "понимание принципов CI/CD.",
      ],
    },
  },
  {
    id: "vac-004",
    company: {
      id: "comp-004",
      name: "ВТБ Лизинг",
      iconUrl: "/images/company/vtb (2).png",
      industry: "Big Data",
      siteUrl: "https://www.vtb-leasing.ru",
    },
    post: "Backend разработчик",
    salary: "по договорённости",
    tags: ["Удалённо", "Международный проект"],
    isFavorite: false,
    responsibilities: {
      title: "Обязанности",
      description: [
        "разработка высоконагруженных API;",
        "обеспечение безопасности серверных приложений;",
        "работа с базами данных (PostgreSQL, MongoDB);",
        "внедрение CI/CD практик.",
      ],
    },
    requirements: {
      title: "Требования",
      description: [
        "опыт работы с Node.js, Go или Java;",
        "понимание принципов информационной безопасности;",
        "знание SQL и NoSQL баз данных;",
        "опыт проектирования архитектуры сервисов.",
      ],
    },
  },
  {
    id: "vac-005",
    company: {
      id: "comp-005",
      name: "Саров бизнесбанк",
      iconUrl: "/images/company/sarov.png",
      industry: "Робототехника",
      siteUrl: "https://sbb.bm-bank.ru",
    },
    post: "ML engineer",
    salary: "от 220 000 ₽",
    tags: ["Офис", "Опыт 3+ года"],
    isFavorite: true,
    responsibilities: {
      title: "Обязанности",
      description: [
        "разработка и обучение ML-моделей;",
        "оптимизация алгоритмов компьютерного зрения;",
        "разработка пайплайнов для обработки данных;",
        "коллаборация с командой робототехников и инженеров.",
      ],
    },
    requirements: {
      title: "Требования",
      description: [
        "опыт работы с Python, PyTorch или TensorFlow;",
        "понимание алгоритмов машинного обучения;",
        "опыт работы с большими данными;",
        "знание методов оптимизации ML-моделей.",
      ],
    },
  },
];
