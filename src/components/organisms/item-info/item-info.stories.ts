import type { Meta, StoryObj } from '@storybook/react-vite';
import ItemInfo from './item-info';
import {
  getRandomItem,
  getRandomMeleeWeapon,
  getRandomAmmunition,
  getRandomComplement,
  getRandomFirearm,
  getRandomCyberware,
} from '../../../lib/item.generator';
import { Chance } from 'chance';
const chance = new Chance();

const meta = {
  title: 'ItemInfo',
  component: ItemInfo,
  tags: ['autodocs'],
  args: { item: getRandomItem() },
} satisfies Meta<typeof ItemInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cyberware: Story = {
  args: {
    item: {
      ...getRandomCyberware(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
      extraEffects: chance.paragraph({ sentences: 3 }),
    },
  },
};
export const CyberwareEditable: Story = {
  args: {
    item: {
      ...getRandomCyberware(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
      extraEffects: chance.paragraph({ sentences: 3 }),
    },
    editable: true,
  },
};
export const MeleeWeapon: Story = {
  args: {
    item: {
      ...getRandomMeleeWeapon(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
    },
  },
};
export const MeleeWeaponEditable: Story = {
  args: {
    item: {
      ...getRandomMeleeWeapon(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
    },
    editable: true,
  },
};
export const Firearms: Story = {
  args: {
    item: {
      ...getRandomFirearm(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
    },
  },
};
export const FirearmsEditable: Story = {
  args: {
    item: {
      ...getRandomFirearm(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
    },
    editable: true,
  },
};
export const Ammunition: Story = {
  args: {
    item: {
      ...getRandomAmmunition(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
    },
  },
};
export const AmmunitionEditable: Story = {
  args: {
    item: {
      ...getRandomAmmunition(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
    },
    editable: true,
  },
};
export const Complement: Story = {
  args: {
    item: {
      ...getRandomComplement(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
      extraEffects: chance.paragraph({ sentences: 3 }),
    },
  },
};
export const ComplementEditable: Story = {
  args: {
    item: {
      ...getRandomComplement(),
      name: chance.sentence({ words: 3 }),
      description: chance.paragraph({ sentences: 3 }),
      extraEffects: chance.paragraph({ sentences: 3 }),
    },
    editable: true,
  },
};
