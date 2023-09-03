import {Skill} from "./skills.interface";

export interface Role {
  key: string;
  skills: Skill[],
  money: number[]
}

export const roles: Role[] = [
  {
    key: 'rockerboys',
    skills: [
      'charisma',
      'awareness',
      'perform',
      'wardrobe',
      'composition',
      'brawling',
      'instrument',
      'streetwise',
      'persuasion',
      'seduction'
    ],
    money: [
      1000,
      1500,
      2000,
      5000,
      8000,
      12000
    ]
  },
  {
    key: 'solos',
    skills: [
      'combat-sense',
      'awareness',
      'handgun',
      'brawling',
      'melee',
      'weaponsmith',
      'rifle',
      'athletics',
      'submachinegun',
      'stealth'
    ],
    money: [
      2000,
      3000,
      4500,
      7000,
      9000,
      12000
    ]
  },
  {
    key: 'netrunners',
    skills: [
      'interface',
      'awareness',
      'basic-tech',
      'education',
      'system-knowledge',
      'cybertech',
      'cyberdeck-design',
      'composition',
      'electronics',
      'programming'
    ],
    money: [
      1000,
      2000,
      3000,
      5000,
      7000,
      10000
    ]
  },
  {
    key: 'techies',
    skills: [
      'jury-rig',
      'awareness',
      'basic-tech',
      'cybertech',
      'teaching',
      'education',
      'electronics',
      'gyro-tech',
      'av-tech',
      'aero-tech'
    ],
    money: [
      1000,
      2000,
      3000,
      4000,
      5000,
      8000
    ]
  },
  {
    key: 'medias',
    skills: [
      'credibility',
      'awareness',
      'composition',
      'education',
      'persuasion',
      'human-perception',
      'social',
      'streetwise',
      'photo-film'
    ],
    money: [
      1000,
      1200,
      3000,
      5000,
      7000,
      10000
    ]
  },
  {
    key: 'cops',
    skills: [
      'authority',
      'awareness',
      'handgun',
      'human-perception',
      'athletics',
      'education',
      'brawling',
      'melee',
      'interrogation',
      'streetwise'
    ],
    money: [
      1000,
      1200,
      3000,
      5000,
      7000,
      9000
    ]
  },
  {
    key: 'corporates',
    skills: [
      'resources',
      'awareness',
      'human-perception',
      'education',
      'library-search',
      'social',
      'persuasion',
      'stock-market',
      'wardrobe',
      'grooming'
    ],
    money: [
      1500,
      3000,
      5000,
      7000,
      9000,
      12000
    ]
  },
  {
    key: 'fixers',
    skills: [
      'streetdeal',
      'awareness',
      'forgery',
      'handgun',
      'brawling',
      'melee',
      'pick-lock',
      'pick-pocket',
      'intimidate',
      'persuasion'
    ],
    money: [
      1500,
      3000,
      5000,
      7000,
      8000,
      10000
    ]
  },
  {
    key: 'nomads',
    skills: [
      'family',
      'awareness',
      'endurance',
      'melee',
      'rifle',
      'driving',
      'basic-tech',
      'survival',
      'brawling',
      'athletics'
    ],
    money: [
      1000,
      1500,
      2000,
      3000,
      4000,
      5000
    ]
  },
]
