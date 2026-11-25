import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'error' = accessibility violations fail the test run (and CI).
      test: 'error',
    },
  },
  tags: ['autodocs'],
};

export default preview;
