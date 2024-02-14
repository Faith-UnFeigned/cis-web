import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Feature } from './Feature';
import { MockColorModeProvider } from '../../../Context/ColorModeMock'; // Assuming you have this mock provider

test('Feature', () => {
  render(
    <MockColorModeProvider>
      <Feature icon={<span>Icon</span>} title="Test Title" subtext="Test Subtext" />
    </MockColorModeProvider>,
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Subtext')).toBeInTheDocument();
  expect(screen.getByText('Icon')).toBeInTheDocument();

  // Add more tests as needed
});
