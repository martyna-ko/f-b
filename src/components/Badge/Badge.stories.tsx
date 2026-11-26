import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: { tone: { control: 'inline-radio', options: ['kids', 'family', 'adults', 'neutral'] } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Kids: Story = { args: { tone: 'kids', children: 'Kids 7–10' } };
export const Family: Story = { args: { tone: 'family', children: 'Family' } };
export const Adults: Story = { args: { tone: 'adults', children: 'Adults' } };
export const Neutral: Story = { args: { tone: 'neutral', children: 'All levels' } };

export const AllTones: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge tone="kids">Kids 5–6</Badge>
      <Badge tone="family">Family</Badge>
      <Badge tone="adults">Adults</Badge>
      <Badge tone="neutral">All levels</Badge>
    </div>
  ),
};
