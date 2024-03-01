import { ColorModeContext, ColorModeContextType } from './ColorMode';
import { vi } from 'vitest';

export const MockColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const mockToggleColorMode = vi.fn();

  const mockValue: ColorModeContextType = {
    colorMode: 'light',
    toggleColorMode: mockToggleColorMode,
  };

  return <ColorModeContext.Provider value={mockValue}>{children}</ColorModeContext.Provider>;
};
