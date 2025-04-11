import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import UnderConstruction from './UnderConstruction.astro';

test('UnderConstruction component renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(UnderConstruction as any);
  expect(result).toContain('under-construction');
});