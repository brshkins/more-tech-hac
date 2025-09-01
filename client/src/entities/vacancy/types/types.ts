export interface Company {
  id: string;
  name: string;
  icon_url: string;
  industry: string;
  site_url: string;
}

export interface VacancySection {
  title: string;
  description: string[];
}

export interface CreateVacancyDto {
  company_id: string;
  region: string;
  post: string;
  salary: string;
  tags: string[];
  is_favorite: boolean;
  responsibilities: VacancySection;
  requirements: VacancySection;
}

export interface Vacancy {
  id: number;
  company: Company;
  region: string;
  post: string;
  salary: string;
  tags: Array<string>;
  isFavorite: boolean;
  responsibilities: VacancySection;
  requirements: VacancySection;
}

export interface VacancyFilter {
  /**
   * Подходит ли вакансия пользователю
   * true  – если соответствует параметрам профиля / предпочтениям
   * false – если не соответствует
   */
  is_suitable: boolean;

  /**
   * Формат работы
   * Возможные значения: "Офис", "Гибрид", "Удалённо"
   */
  format: string;

  /**
   * Тип занятости
   * Возможные значения: "Фултайм", "Частичная", "Стажировка"
   */
  busyness: string;

  /**
   * Желаемая зарплата (строка для удобства хранения диапазона)
   * Например: "40000-120000"
   */
  salary: string;

  /**
   * Ключевые слова для поиска
   * Например: "React", "UI/UX", "Product Designer"
   */
  tags: string;

  /**
   * Регион/локация
   * Например: "Москва", "Санкт-Петербург", "Удалённо"
   */
  region: string;

  /**
   * Уровень опыта
   * Возможные значения: "Junior", "Middle", "Senior", "Lead"
   */
  experience: string;
}
