import { describe, it, expect } from 'vitest';
import { render } from '@astro/test';
import Index from '../pages/index.astro';
import { siteConfig } from '../config/site';

describe('Index Page', () => {
  it('renders with correct title', async () => {
    const { container } = await render(Index);
    expect(container.querySelector('title'))
      .toContain(`${siteConfig.title} - FullStack Web Developer`);
  });

  it('contains main layout sections', async () => {
    const { container } = await render(Index);
    expect(container.querySelector('main')).toBeTruthy();
    expect(container.querySelector('.container')).toBeTruthy();
    expect(container.querySelector('.grid')).toBeTruthy();
  });

  it('renders hero section in correct grid position', async () => {
    const { container } = await render(Index);
    const heroSection = container.querySelector('.lg\\:col-span-2');
    expect(heroSection).toBeTruthy();
  });

  it('renders latest posts in correct grid position', async () => {
    const { container } = await render(Index);
    const postsSection = container.querySelector('.lg\\:col-span-1');
    expect(postsSection).toBeTruthy();
  });

  it('includes about and projects sections', async () => {
    const { container } = await render(Index);
    expect(container.querySelector('#about')).toBeTruthy();
    expect(container.querySelector('#projects')).toBeTruthy();
  });

  it('applies correct responsive container classes', async () => {
    const { container } = await render(Index);
    const mainContainer = container.querySelector('.container');
    expect(mainContainer).toHaveClass('mx-auto');
    expect(mainContainer).toHaveClass('px-4');
  });
});
