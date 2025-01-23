interface SocialLinks {
  github: string;
  linkedin: string;
}

interface SiteConfig {
  title: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLinks;
}

export const siteConfig: SiteConfig = {
  title: "Juliano BC",
  description: "Desenvolvedor FullStack que transforma curiosidade em código. Meu maior prazer é aprender coisas novas e aplicar esse conhecimento em soluções reais.",
  profileImage: "https://media.licdn.com/dms/image/v2/D4D03AQG_9cJVEwqgzQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666726671679?e=1738195200&v=beta&t=2VXRQu1nrejHTIUAEOT-oouCvKUV8rBtTU7krzGnbCs",
  socialLinks: {
    github: "https://github.com/JulianoBC",
    linkedin: "https://www.linkedin.com/in/juliano-beig-capretz/",
  },
};
