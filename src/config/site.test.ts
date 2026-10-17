import { siteConfig } from './site';
import { expect, test } from 'vitest';

test('siteConfig has correct values', () => {
  expect(siteConfig.title).toBe("Juliano BC");
  expect(siteConfig.description).toBe("Desenvolvedor FullStack focado em construir sistemas escaláveis, resilientes e de alta performance. Uno evolução técnica contínua e pragmatismo para transformar desafios complexos em soluções eficientes.");
  expect(siteConfig.profileImage).toBe("/perfilfacebook.jpg");
  expect(siteConfig.socialLinks.github).toBe("https://github.com/JulianoBC");
  expect(siteConfig.socialLinks.linkedin).toBe("https://www.linkedin.com/in/juliano-beig-capretz/");
});