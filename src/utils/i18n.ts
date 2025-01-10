import { atom } from 'nanostores';

export type Language = 'en' | 'pt-BR';
export type TranslationKey = keyof typeof translations['en'] | 
                           `${keyof typeof translations['en']}.${string}`;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Translation {
  common: {
    name: string;
    email: string;
    message: string;
    send: string;
    loading: string;
    success: string;
    error: string;
  };
  nav: {
    about: string;
    projects: string;
    contact: string;
    title: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    minLength: string;
    maxLength: string;
  };
  projects: {
    filters: {
      all: string;
      frontend: string;
      backend: string;
      tools: string;
    };
  };
}

type Translations = {
  [K in Language]: Translation;
};

const translations: Translations = {
  en: {
    common: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      loading: 'Loading...',
      success: 'Message sent successfully! We\'ll get back to you soon.',
      error: 'Failed to send message. Please try again later.',
    },
    nav: {
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      title: 'FullStack Web Dev',
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      minLength: 'Must be at least {0} characters',
      maxLength: 'Must be less than {0} characters',
    },
    projects: {
      filters: {
        all: 'All',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools',
      },
    },
  },
  'pt-BR': {
    common: {
      name: 'Nome',
      email: 'E-mail',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      loading: 'Carregando...',
      success: 'Mensagem enviada com sucesso! Retornaremos em breve.',
      error: 'Falha ao enviar mensagem. Por favor, tente novamente mais tarde.',
    },
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
      title: 'Desenvolvedor FullStack',
    },
    validation: {
      required: 'Este campo é obrigatório',
      invalidEmail: 'Por favor, insira um e-mail válido',
      minLength: 'Deve ter pelo menos {0} caracteres',
      maxLength: 'Deve ter menos que {0} caracteres',
    },
    projects: {
      filters: {
        all: 'Todos',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Ferramentas',
      },
    },
  },
};

export const currentLanguage = atom<Language>('pt-BR');

/**
 * Gets the initial language based on localStorage or browser settings
 */
function getInitialLanguage(): Language {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'pt-BR')) {
      return saved;
    }
  }

  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language;
    if (browserLang.startsWith('pt')) {
      return 'pt-BR';
    }
  }

  return 'en';
}

/**
 * Initializes the i18n system
 */
export function initializeI18n(): void {
  const initialLang = getInitialLanguage();
  currentLanguage.set(initialLang);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('language', initialLang);
  }
}

/**
 * Switches the current language
 */
export function switchLanguage(lang: Language): void {
  currentLanguage.set(lang);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('language', lang);
  }
  document.documentElement.setAttribute('lang', lang);
}

/**
 * Gets a nested value from an object using a dot-notation path
 */
function getNestedValue(obj: DeepPartial<Translation>, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, part) => acc && acc[part], obj);
}

/**
 * Translates a key with optional parameters
 */
export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const lang = currentLanguage.get();
  const translation = getNestedValue(translations[lang], key);

  if (!translation) {
    console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    return key;
  }

  if (params) {
    return Object.entries(params).reduce(
      (text, [param, value]) => text.replace(`{${param}}`, String(value)),
      translation
    );
  }

  return translation;
}

/**
 * Formats a date according to the current locale
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  const lang = currentLanguage.get();
  return new Intl.DateTimeFormat(lang, options).format(date);
}

/**
 * Formats a number according to the current locale
 */
export function formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
  const lang = currentLanguage.get();
  return new Intl.NumberFormat(lang, options).format(number);
}

// Initialize i18n when the module is imported
if (typeof window !== 'undefined') {
  initializeI18n();
}
