export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

export const getTheme = (): Theme => {
  if (typeof document !== 'undefined') {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
  }
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};


export const toggleTheme = (): Theme => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, newTheme);
  notifyThemeChange(newTheme);
  return newTheme;
};

const themeChangeListeners: ((theme: Theme) => void)[] = [];

export const onThemeChange = (listener: (theme: Theme) => void) => {
  themeChangeListeners.push(listener);
};

const notifyThemeChange = (theme: Theme) => {
  themeChangeListeners.forEach(listener => listener(theme));
};

// Initialize theme on load
const initialTheme = getTheme();
document.documentElement.classList.add(initialTheme);

window.addEventListener('storage', (event) => {
  if (event.key === THEME_KEY && event.newValue) {
    notifyThemeChange(event.newValue as Theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(event.newValue as Theme);
  }
});
