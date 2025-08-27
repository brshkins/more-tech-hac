import { Message } from "../types/types";

export const voiceQuestions: Message[] = [
  {
    id: "q2",
    text: "Какой у тебя опыт в UX/UI дизайне?",
    clarificationMessages: [
      {
        id: "clarif-q2-1",
        text: "Расскажи о проектах, где применял UX/UI практики: работа с пользовательскими сценариями, создание прототипов, проведение тестирования. Упомяни используемые инструменты (Figma, Sketch и др.).",
        from_user: false,
        created_at: "",
        type: "assistant",
      },
    ],
    questions: [
      "Какие проекты с UX/UI?",
      "Инструменты для дизайна?",
      "Как проводил тестирование?",
    ],
    from_user: false,
    created_at: "",
    type: "question",
  },
  {
    id: "q3",
    text: "Расскажи о самом интересном проекте, над которым ты работал.",
    clarificationMessages: [
      {
        id: "clarif-q3-1",
        text: "Опиши проект, который для тебя был наиболее значимым или интересным. Можно указать твою роль, задачи, технологии и ключевые результаты. Особенно ценно упоминание о вызовах и том, как ты их решил.",
        from_user: false,
        created_at: "",
        type: "assistant",
      },
    ],
    questions: [
      "Какова твоя роль в проекте?",
      "Какие технологии использовал?",
      "Как решил вызовы?",
    ],
    from_user: false,
    created_at: "",
    type: "question",
  },
  {
    id: "q4",
    text: "Что ты знаешь о нашей компании и вакансии?",
    clarificationMessages: [
      {
        id: "clarif-q4-1",
        text: "Покажи, что ты изучил компанию заранее: чем она занимается, какие продукты или услуги предоставляет. Упомяни, что тебя заинтересовало именно в этой вакансии.",
        from_user: false,
        created_at: "",
        type: "assistant",
      },
    ],
    questions: [
      "Чем занимается компания?",
      "Что в вакансии заинтересовало?",
      "Какие продукты компании?",
    ],
    from_user: false,
    created_at: "",
    type: "question",
  },
  {
    id: "q5",
    text: "Есть ли у тебя вопросы ко мне?",
    clarificationMessages: [
      {
        id: "clarif-q5-1",
        text: "Это возможность проявить заинтересованность. Можно спросить о команде, процессах, ожидаемых результатах на первые месяцы работы или перспективах развития компании.",
        from_user: false,
        created_at: "",
        type: "assistant",
      },
    ],
    questions: [
      "Расскажи о команде?",
      "Какие процессы в работе?",
      "Перспективы развития?",
    ],
    from_user: false,
    created_at: "",
    type: "question",
  },
];

export const helloMessage: Message = {
  id: "mess-02",
  text: "Привет! Сегодня я буду проводить тебе собеседование на вакансию «UX/UI Дизайнер». Желаю тебе успешного прохождения собеседования! Для того, чтобы начать, потяни вправо кнопку внизу экрана.",
  created_at: "12:00",
  from_user: false,
  type: "assistant",
};

export const initialMessages: Message[] = [
  {
    id: "q1",
    text: "Расскажи немного о себе.",
    clarificationMessages: [
      {
        id: "clarif-q1-1",
        text: "Кратко опиши свой профессиональный путь: образование, ключевые навыки, опыт в сфере разработки или дизайна. Лучше избегать слишком длинных рассказов, выдели самое важное.",
        from_user: false,
        created_at: "",
        type: "assistant",
      },
    ],
    questions: [
      "Расскажи подробнее о своем образовании?",
      "Какие ключевые навыки у тебя есть?",
      "Какой опыт в разработке?",
    ],
    from_user: false,
    created_at: "12:01",
    type: "question",
  },
];

export const finalMessageText =
  "Спасибо за ответы! Собеседование завершено. Мы свяжемся с тобой позже.";
