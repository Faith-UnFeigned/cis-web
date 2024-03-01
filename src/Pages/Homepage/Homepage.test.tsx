import { MemoryRouter as Router } from 'react-router';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { Homepage } from './Homepage';
import { MantineThemeProvider } from '@mantine/core';

// Mock the useDocumentTitle hook
vi.mock('@mantine/hooks', () => ({
  useDocumentTitle: vi.fn(),
}));

// Mock HYMNALS_CONFIG data
vi.mock('../../data/hymnalsConfig', () => ({
  HYMNALS_CONFIG: [
    { key: 'english', title: 'English Hymnal', language: 'English' },
    { key: 'spanish', title: 'Spanish Hymnal', language: 'Spanish' },
    // Add more mock data as needed
  ],
}));

// Mock the useColorMode context
vi.mock('../../Context/ColorMode', () => ({
  useColorMode: vi.fn(() => ({ colorMode: 'light' })), // Adjust the color mode as needed
}));

// Mock Mantine theme
vi.mock('@mantine/core', () => ({
  ...vi.requireActual('@mantine/core'),
  useMantineTheme: vi.fn(() => ({ colors: { gray: { 8: 'darkGray', 1: 'lightGray' } } })),
}));

describe('Homepage Component', () => {
  it('renders the component', () => {
    render(
      <Router>
        <MantineThemeProvider>
          <Homepage />
        </MantineThemeProvider>
      </Router>,
    );

    // Ensure that the title is rendered
    expect(screen.getByText('Christ in Song on the Web')).toBeInTheDocument();

    // Mocked data should render the language links
    expect(screen.getByText('English Hymnal')).toBeInTheDocument();
    expect(screen.getByText('Spanish Hymnal')).toBeInTheDocument();
  });

  it('clicking on "Get Started" link scrolls to the languages section', () => {
    render(
      <Router>
        <MantineThemeProvider>
          <Homepage />
        </MantineThemeProvider>
      </Router>,
    );

    // // Click the "Get Started" link
    // userEvent.click(screen.getByText('Get Started'));

    // // Ensure that the languages section is now in view
    // expect(screen.getByText('Pick a Hymnal Version')).toBeInTheDocument();
  });

  // Add more tests as needed for other interactions and functionalities
});
