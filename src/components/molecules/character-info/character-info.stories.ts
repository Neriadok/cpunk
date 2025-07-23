import type { Meta, StoryObj } from '@storybook/react-vite';

import CharacterInfo from './character-info';
import { getRandomCharacter } from '../../../lib/character-generator';

const meta = {
  title: 'CharacterInfo',
  component: CharacterInfo,
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { character: getRandomCharacter() },
} satisfies Meta<typeof CharacterInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    character: getRandomCharacter(),
  },
};
