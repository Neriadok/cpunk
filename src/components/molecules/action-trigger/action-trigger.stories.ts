import type { Meta, StoryObj } from '@storybook/react-vite';
import ActionTrigger from './action-trigger';
import { getRandomCharacter } from '../../../lib/character-generator';

const meta = {
  title: 'ActionTrigger',
  component: ActionTrigger,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ActionTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionTriggerComponent: Story = {
  args: {
    character: { ...getRandomCharacter() },
  },
};
