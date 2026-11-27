import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { Accordion } from './Accordion';

const items = [
  {
    id: 'experience',
    title: 'Does my child need experience?',
    content: 'No. All groups are open to all levels.',
  },
  {
    id: 'cancel',
    title: 'What happens if a class is cancelled?',
    content: 'If we cancel a class, we always make it up.',
  },
  { id: 'parking', title: 'Is there parking?', content: 'Yes — a large free car park.' },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: { items },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};
export const OneOpen: Story = { args: { defaultOpenId: 'cancel' } };

/**
 * Keyboard: the question is reachable with Tab, and activating it opens the answer.
 * (Enter/Space on <summary> is native browser behaviour; the simulated keyboard used in
 * tests does not trigger it, so the test activates the focused question with a click.)
 */
export const KeyboardOpen: Story = {
  play: async ({ canvas }) => {
    const summary = canvas.getByText('Does my child need experience?').closest('summary')!;
    await userEvent.tab();
    await expect(summary).toHaveFocus();
    await userEvent.click(summary);
    await expect(summary.closest('details')).toHaveAttribute('open');
  },
};
