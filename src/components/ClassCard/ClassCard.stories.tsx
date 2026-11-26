import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ClassCard } from './ClassCard';

const FITSSEY = 'https://app.fitssey.com/findbalans';

const meta = {
  title: 'Components/ClassCard',
  component: ClassCard,
  decorators: [(Story) => <div style={{ maxWidth: 420 }}>{Story()}</div>],
  args: {
    title: 'Aerial hammocks',
    audience: 'kids',
    audienceLabel: 'Kids 7–10',
    day: 'Wednesday',
    startTime: '16:00',
    endTime: '16:50',
    instructor: 'Zosia',
    level: 'All levels',
    spotsLeft: 4,
    bookingUrl: FITSSEY,
  },
  argTypes: { audience: { control: 'inline-radio', options: ['kids', 'family', 'adults'] } },
} satisfies Meta<typeof ClassCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Children's closed group with places available. */
export const Kids: Story = {};

/** Family class: children 5+ with an adult. */
export const Family: Story = {
  args: {
    title: 'Family aerial hammocks',
    audience: 'family',
    audienceLabel: 'Family · kids 5+',
    day: 'Monday',
    startTime: '19:00',
    endTime: '19:50',
    instructor: 'Marta',
    price: '75 zł per person',
    spotsLeft: 3,
  },
};

/** Adult class with a requirement shown before booking. */
export const AdultsWithNote: Story = {
  args: {
    title: 'Aerial hoop',
    audience: 'adults',
    audienceLabel: 'Adults',
    day: 'Friday',
    startTime: '19:00',
    endTime: '19:55',
    instructor: 'Ania',
    price: '60 zł',
    note: 'Minimum height 140 cm',
    spotsLeft: 4,
  },
};

/** Only a few places left: status is emphasised. */
export const FewPlacesLeft: Story = { args: { spotsLeft: 1 } };

/** Full: the call to action changes to a low-emphasis link to Fitssey. */
export const Full: Story = {
  args: { spotsLeft: 0 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Full')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: /See in Fitssey/ })).toBeInTheDocument();
  },
};

/** Places unknown: no status line. */
export const WithoutPlaces: Story = { args: { spotsLeft: undefined } };

/** Polish labels — the component itself has no hard-coded language. */
export const Polish: Story = {
  args: {
    title: 'Hamaki',
    audienceLabel: 'Dzieci 7–10',
    day: 'Środa',
    level: 'Wszystkie poziomy',
    labels: {
      book: 'Zapisz się',
      seeInBooking: 'Zobacz w Fitssey',
      full: 'Brak miejsc',
      spotsLeft: (n) => `Wolne miejsca: ${n}`,
      fewSpotsLeft: (n) => (n === 1 ? 'Ostatnie miejsce!' : `Tylko ${n} wolne miejsca`),
      newTab: 'otwiera się w nowej karcie',
      instructor: 'Prowadzi',
    },
  },
};

/** Narrow mobile screen (320px): content stacks, button is full width. */
export const Mobile320: Story = {
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

/** The booking link names the class, so screen-reader users hear which class they book. */
export const AccessibleBookingLink: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /Book: Aerial hammocks, Wednesday 16:00/ });
    await expect(link).toHaveAttribute('href', FITSSEY);
    await expect(link).toHaveAttribute('target', '_blank');
  },
};
