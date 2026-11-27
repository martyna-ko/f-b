import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { SiteFooter } from './SiteFooter';

const meta = {
  title: 'Components/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  args: {
    name: 'Find Balans',
    addressLines: [
      'ul. Świętego Mikołaja 1, 2nd floor',
      'Bemowo (Blizne Łaszczyńskiego)',
      '05-082 Warsaw',
    ],
    email: 'findbalans@gmail.com',
    followLabel: 'Follow us',
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/findbalans/' },
      { label: 'Facebook', href: 'https://www.facebook.com/findbalanspage/' },
    ],
    newTabLabel: 'opens in a new tab',
    notice:
      "Portfolio case study. Content reflects the 2026/27 season. Booking links open the studio's real booking system (Fitssey).",
  },
} satisfies Meta<typeof SiteFooter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'findbalans@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:findbalans@gmail.com',
    );
    await expect(
      canvas.getByRole('link', { name: /Instagram.*opens in a new tab/ }),
    ).toHaveAttribute('target', '_blank');
  },
};

export const Polish: Story = {
  args: {
    addressLines: [
      'ul. Świętego Mikołaja 1, II piętro',
      'Bemowo (Blizne Łaszczyńskiego)',
      '05-082 Warszawa',
    ],
    followLabel: 'Obserwuj nas',
    newTabLabel: 'otwiera się w nowej karcie',
    notice:
      'Projekt portfolio (case study). Treści dotyczą sezonu 2026/27. Linki do zapisów otwierają prawdziwy system rezerwacji studia (Fitssey).',
  },
};
