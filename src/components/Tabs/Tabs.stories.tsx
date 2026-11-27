import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { Tabs, type TabsProps } from './Tabs';

const items = [
  { value: 'all', label: 'All' },
  { value: 'kids', label: 'Kids' },
  { value: 'family', label: 'Family' },
  { value: 'adults', label: 'Adults' },
];

function Controlled(props: Partial<TabsProps>) {
  const [value, setValue] = useState(props.value ?? 'all');
  return (
    <Tabs label="Show classes for" items={items} value={value} onChange={setValue}>
      <p>Showing classes for: {items.find((i) => i.value === value)?.label}</p>
    </Tabs>
  );
}

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  render: (args) => <Controlled value={args.value} />,
  args: { label: 'Show classes for', items, value: 'all', onChange: () => {}, children: null },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const KidsSelected: Story = { args: { value: 'kids' } };

/** Keyboard: arrow keys move the selection; End jumps to the last tab. */
export const KeyboardNavigation: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('tab', { name: 'All' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Kids' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.keyboard('{End}');
    await expect(canvas.getByRole('tab', { name: 'Adults' })).toHaveFocus();
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Adults');
  },
};
