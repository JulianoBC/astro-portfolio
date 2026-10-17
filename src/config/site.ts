interface SocialLinks {
  github: string;
  linkedin: string;
}

interface NavigationLink {
  key: string;
  label: string;
  path: string;
}

interface SupportedLanguage {
  code: string;
  label: string;
}

interface SiteConfig {
  title: string;
  description: string;
  profileImage: "/perfilfacebook.jpg",
  socialLinks: SocialLinks;
  navigationLinks: NavigationLink[];
  supportedLanguages: SupportedLanguage[];
}

export const siteConfig: SiteConfig = {
  title: "Juliano BC",
  description: "Desenvolvedor FullStack focado em construir sistemas escaláveis, resilientes e de alta performance. Uno evolução técnica contínua e pragmatismo para transformar desafios complexos em soluções eficientes.",
  profileImage: "/perfilfacebook.jpg",
  socialLinks: {
    github: "https://github.com/JulianoBC",
    linkedin: "https://www.linkedin.com/in/juliano-beig-capretz/",
  },
  navigationLinks: [
    { key: "home", label: "Home", path: "/" },
    { key: "blog", label: "Blog", path: "/blog" },
    { key: "about", label: "Sobre", path: "/#about" },
    { key: "contact", label: "Contato", path: "/contact" }
  ],
  supportedLanguages: [
    { code: "pt-BR", label: "Português" },
    { code: "en", label: "English" }
  ]
};
