import { Interview } from "../types/types";

export const mockInterviews: Interview[] = [
  {
    id: "vac-001",
    post: "UX/UI Дизайнер",
    company: {
      id: "comp-001",
      name: "ВТБ",
      iconUrl: "/images/company/vtb.png",
      industry: "FinTech",
      siteUrl: "https://www.vtb.ru",
    },
    candidate: "Даниил Хатунцев",
    date: "15.07.2025",
    status: "completed",
  },
  {
    id: "vac-002",
    post: "Продуктовый Дизайнер",
    company: {
      id: "comp-002",
      name: "Почта Банк",
      iconUrl: "/images/company/pochta.png",
      industry: "FinTech",
      siteUrl: "https://www.pochtabank.ru",
    },
    candidate: "Анастасия Иванова",
    date: "10.08.2025",
    status: "cancelled",
  },
  {
    id: "vac-003",
    post: "Frontend разработчик",
    company: {
      id: "comp-003",
      name: "БМ-банк",
      iconUrl: "/images/company/bm.png",
      industry: "FinTech",
      siteUrl: "https://www.bm-bank.ru/",
    },
    candidate: "Игорь Смирнов",
    date: "18.08.2025",
    status: "completed",
  },
  {
    id: "vac-004",
    post: "Backend разработчик",
    company: {
      id: "comp-004",
      name: "ВТБ Лизинг",
      iconUrl: "/images/company/vtb (2).png",
      industry: "Big Data",
      siteUrl: "https://www.vtb-leasing.ru",
    },
    candidate: "Екатерина Петрова",
    date: "05.06.2025",
    status: "cancelled",
  },
  {
    id: "vac-005",
    post: "ML engineer",
    company: {
      id: "comp-005",
      name: "Саров бизнесбанк",
      iconUrl: "/images/company/sarov.png",
      industry: "Робототехника",
      siteUrl: "https://sbb.bm-bank.ru",
    },
    candidate: "Алексей Кузнецов",
    date: "19.08.2025",
    status: "completed",
  },
];
