// Project interface definition
export interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  preview?: boolean;
  technologies: string[];
}

// Project data
export const projects: Project[] = [
  {
    title: "Portfolio Astro",
    description: "Site pessoal desenvolvido com AstroJS e TailwindCSS",
    url: "https://julianobc.vercel.app/",
    image: "/projects/portfolio.jpg",
    preview: true,
    technologies: ["astro", "tailwindcss", "typescript", "frontend", "responsive"]
  },
  {
    title: "Pagina de Cancelamento de Matrícula",
    description: "Novo projeto em desenvolvimento",
    url: "https://cancelamento-feedback.vercel.app/cancel",
    image: "/projects/coming-soon.jpg",
    preview: true,
    technologies: ["react", "typescript", "frontend", "forms"]
  },
  {
    title: "Em Breve",
    description: "Novo projeto em desenvolvimento",
    url: "#",
    image: "/projects/coming-soon.jpg",
    preview: false,
    technologies: ["nodejs", "express", "backend", "api", "database"]
  },
  {
    title: "Em Breve",
    description: "Novo projeto em desenvolvimento",
    url: "#",
    image: "/projects/coming-soon.jpg",
    preview: false,
    technologies: ["react", "nodejs", "fullstack", "frontend", "backend"]
  }
];

// Helper functions for filtering projects
export const getAllTechnologies = (): string[] => {
  const techSet = new Set<string>();
  projects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

export const filterProjectsByTechnology = (technology: string): Project[] => {
  if (!technology) return projects;
  return projects.filter(project => 
    project.technologies.includes(technology.toLowerCase())
  );
};

export const filterProjectsByTechnologies = (technologies: string[]): Project[] => {
  if (!technologies.length) return projects;
  return projects.filter(project => 
    technologies.every(tech => 
      project.technologies.includes(tech.toLowerCase())
    )
  );
};

export const getPreviewProjects = (): Project[] => {
  return projects.filter(project => project.preview);
};