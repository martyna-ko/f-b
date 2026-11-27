import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { expect, userEvent, within } from 'storybook/test';
import { AppRoutes } from '../AppRoutes';

/**
 * Whole pages, rendered with the real routes, layout and content.
 * Each story is also an automatic accessibility test (axe) in CI.
 */
const meta = {
  title: 'Pages',
  parameters: { layout: 'fullscreen' },
  render: (_args, { parameters }) => (
    <MemoryRouter initialEntries={[parameters.path as string]}>
      <AppRoutes />
    </MemoryRouter>
  ),
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const page = (path: string): Story => ({ parameters: { path } });

export const Home = page('/');
export const Kids = page('/kids');
export const Family = page('/family');
export const Adults = page('/adults');
export const Schedule = page('/schedule');
export const Pricing = page('/pricing');
export const Events = page('/events');
export const Visit = page('/visit');
export const NotFound = page('/does-not-exist');
export const HomePolish = page('/pl');
export const KidsPolish = page('/pl/kids');

/** Language switch keeps you on the same page: /kids → /pl/kids. */
export const LanguageSwitch: Story = {
  parameters: { path: '/kids' },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { level: 1, name: 'Classes for kids' }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('link', { name: 'Polski' }));
    await expect(
      await canvas.findByRole('heading', { level: 1, name: 'Zajęcia dla dzieci' }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/kids');
  },
};

/** Schedule filter: "Adults" shows only adult classes; "Kids" hides them. */
export const ScheduleFilter: Story = {
  parameters: { path: '/schedule' },
  play: async ({ canvas }) => {
    const tabs = canvas.getByRole('tablist', { name: 'Show classes for' });
    await userEvent.click(within(tabs).getByRole('tab', { name: 'Adults' }));
    const panel = canvas.getByRole('tabpanel');
    await expect(
      within(panel).getAllByRole('heading', { name: 'Aerial hoop' }).length,
    ).toBeGreaterThan(0);
    await expect(within(panel).queryByRole('heading', { name: 'Disco dance' })).toBeNull();
    await userEvent.click(within(tabs).getByRole('tab', { name: 'Kids' }));
    await expect(within(panel).queryByRole('heading', { name: 'Aerial hoop' })).toBeNull();
  },
};
