import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingCard } from './PricingCard';

const meta = {
  title: 'Components/PricingCard',
  component: PricingCard,
  decorators: [(Story) => <div style={{ maxWidth: 320 }}>{Story()}</div>],
  args: {
    title: 'Closed group — monthly',
    price: '330 zł',
    per: 'per month',
    audience: 'kids',
    audienceLabel: 'Kids',
  },
  argTypes: { audience: { control: 'inline-radio', options: ['kids', 'family', 'adults'] } },
} satisfies Meta<typeof PricingCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Kids: Story = {};
export const Highlighted: Story = {
  args: {
    title: 'Closed group — every 2 months',
    price: '600 zł',
    per: 'per 2 months (save 60 zł)',
    highlight: true,
    highlightLabel: 'Best value',
  },
};
export const Family: Story = {
  args: {
    title: 'Family class',
    price: '75 zł',
    per: 'per person',
    audience: 'family',
    audienceLabel: 'Family',
  },
};
export const Adults: Story = {
  args: {
    title: 'Single class',
    price: '60 zł',
    per: 'one class',
    audience: 'adults',
    audienceLabel: 'Adults',
  },
};
export const Polish: Story = {
  args: {
    title: 'Karnet 8 wejść',
    price: '380 zł',
    per: 'ważny 1 miesiąc',
    audience: 'adults',
    audienceLabel: 'Dorośli',
    highlight: true,
    highlightLabel: 'Najkorzystniej',
  },
};
