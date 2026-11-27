import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SiteHeader } from './SiteHeader';

const items = [
  { label: 'For kids', href: '/kids' },
  { label: 'Family', href: '/family' },
  { label: 'For adults', href: '/adults' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Events', href: '/events' },
  { label: 'Visit & contact', href: '/visit' },
];

const meta = {
  title: 'Components/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  args: {
    homeHref: '/',
    homeLabel: 'Find Balans — home',
    items,
    currentPath: '/kids',
    languages: [
      { code: 'en', name: 'English', href: '/kids' },
      { code: 'pl', name: 'Polski', href: '/pl/kids' },
    ],
    currentLanguage: 'en',
    bookingUrl: 'https://app.fitssey.com/findbalans',
    mainContentId: 'main',
    labels: {
      menu: 'Menu',
      closeMenu: 'Close menu',
      book: 'Book',
      language: 'Language',
      skipToContent: 'Skip to content',
      opensInNewTab: 'opens in a new tab',
      navigation: 'Main',
    },
  },
} satisfies Meta<typeof SiteHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop (≥ 1024px): navigation inline. Resize the canvas to see the mobile menu. */
export const Default: Story = {};

/** Polish version: labels and current language change; the component is the same. */
export const Polish: Story = {
  args: {
    homeHref: '/pl',
    homeLabel: 'Find Balans — strona główna',
    currentPath: '/pl/kids',
    currentLanguage: 'pl',
    items: [
      { label: 'Dla dzieci', href: '/pl/kids' },
      { label: 'Rodzinne', href: '/pl/family' },
      { label: 'Dla dorosłych', href: '/pl/adults' },
      { label: 'Grafik', href: '/pl/schedule' },
      { label: 'Cennik', href: '/pl/pricing' },
      { label: 'Wydarzenia', href: '/pl/events' },
      { label: 'Dojazd i kontakt', href: '/pl/visit' },
    ],
    labels: {
      menu: 'Menu',
      closeMenu: 'Zamknij menu',
      book: 'Zapisz się',
      language: 'Język',
      skipToContent: 'Przejdź do treści',
      opensInNewTab: 'otwiera się w nowej karcie',
      navigation: 'Główna',
    },
  },
};

/** The current page is marked for screen readers (aria-current) and visually. */
export const CurrentPageMarked: Story = {
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: 'Main' });
    await expect(within(nav).getByRole('link', { name: 'For kids' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(canvas.getByRole('link', { name: /Book.*opens in a new tab/ })).toHaveAttribute(
      'target',
      '_blank',
    );
  },
};

/** Mobile: the Menu button opens the navigation; Escape closes it and returns focus. */
export const MobileMenu: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: 'Menu' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('link', { name: 'Schedule' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveFocus();
  },
};
