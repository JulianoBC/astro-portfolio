// Armazena o estado do idioma atual
let currentLanguage = 'pt-BR';

// Função para obter o idioma atual
export const getCurrentLanguage = () => currentLanguage;

// Função para alterar o idioma
export const setLanguage = (lang: 'pt-BR' | 'en') => {
  currentLanguage = lang;
  document.documentElement.setAttribute('lang', lang);
  // Aqui você pode adicionar lógica adicional quando implementar a tradução
};
