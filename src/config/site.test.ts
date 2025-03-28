import { siteConfig } from './site';
import { expect, test } from 'vitest';

test('siteConfig has correct values', () => {
  expect(siteConfig.title).toBe("Juliano BC");
  expect(siteConfig.description).toBe("Desenvolvedor FullStack que transforma curiosidade em código. Meu maior prazer é aprender coisas novas e aplicar esse conhecimento em soluções reais.");
  expect(siteConfig.profileImage).toBe("/perfilfacebook.jpg");
  expect(siteConfig.socialLinks.github).toBe("https://github.com/JulianoBC");
  expect(siteConfig.socialLinks.linkedin).toBe("https://www.linkedin.com/in/juliano-beig-capretz/");
});