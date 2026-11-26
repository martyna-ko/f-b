import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { Button, ButtonLink } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'See schedule', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

/** Interaction test: the button is reachable by keyboard and calls onClick. */
export const KeyboardActivation: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'See schedule' });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** ButtonLink: same look, but it is a link. External links open Fitssey in a new tab. */
export const ExternalBookingLink: StoryObj<typeof ButtonLink> = {
  render: () => (
    <ButtonLink href="https://app.fitssey.com/findbalans" external>
      Book
    </ButtonLink>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /Book.*opens in a new tab/ });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
