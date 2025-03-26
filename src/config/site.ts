interface SocialLinks {
  github: string;
  linkedin: string;
}

interface SiteConfig {
  title: string;
  description: string;
  profileImage: "/perfilfacebook.jpg",
  socialLinks: SocialLinks;
}

export const siteConfig: SiteConfig = {
  title: "Juliano BC",
  description: "Desenvolvedor FullStack que transforma curiosidade em código. Meu maior prazer é aprender coisas novas e aplicar esse conhecimento em soluções reais.",
  profileImage: "/perfilfacebook.jpg",
  socialLinks: {
    github: "https://github.com/JulianoBC",
    linkedin: "https://www.linkedin.com/in/juliano-beig-capretz/",
  },
};
