type Language = 'pt-BR' | 'en';

let currentLanguage: Language = (localStorage.getItem('language') as Language) || 'pt-BR';

const subscribers: Array<(lang: Language) => void> = [];

function notify() {
  subscribers.forEach((callback) => callback(currentLanguage));
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.setAttribute('lang', lang);
  notify();
}

export function subscribe(callback: (lang: Language) => void) {
  subscribers.push(callback);
  // Call immediately with current language
  callback(currentLanguage);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
}
