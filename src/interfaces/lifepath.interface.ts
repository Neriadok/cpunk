export interface LifePath {
  gender: boolean;
  ethnic: number;
  family: LifePathFamily;
  motivations: LifePathMotivations;
  events: LifePathEvent[];
}

export interface LifePathFamily {
  familyClass: number;
  parentalTragedy: number;
  familyTragedy: number;
  childhood: number;
  brothers: LifePathBrother[];
}

export interface LifePathBrother {
  gender: boolean;
  age: number;
  feelings: number;
}

export interface LifePathMotivations {
  personality: number;
  lovedPerson: number;
  lovedStuff: number;
  mainMotivation: number;
  societyThought: number;
}

export interface LifePathEvent {
  type: LifePathEventType;
  facts: string[];
  modifiers?: Modifier[];
}

export interface Modifier {
  property: string | string[];
  kind?: 'stats' | 'skills';
  amount: number;
  random?: boolean;
}

export type LifePathEventType =
  | 'none'
  | 'luck-good'
  | 'luck-bad'
  | 'love'
  | 'relation-friend'
  | 'relation-enemy';

export const ethnics = [
  'anglo-american',
  'african',
  'japanese-korean',
  'central-european-soviet',
  'pacific-islander',
  'chinese-southeast-asian',
  'hispanic-american',
  'black-american',
  'central-south-american',
  'european',
];

export const familyClasses = [
  'corporate-executive',
  'corporate-directive',
  'corporate-technician',
  'nomad-pack',
  'pirate-fleet',
  'gang-family',
  'crime-lord',
  'combat-zone-poor',
  'urban-homeless',
  'arcology-family',
];

export const childhoods = [
  'streets',
  'corporative-neighborhood',
  'moving',
  'decaying-neighborhood',
  'city-center',
  'combat-zone',
  'village',
  'arcology',
  'seas',
  'isolated',
];

export const faimilyTragedies = [
  'none',
  'betrayal-lost',
  'administrative-lost',
  'exile',
  'prision',
  'last-member',
  'murdered',
  'conspiration',
  'dispersed',
  'family-war',
  'family-debt',
];

export const parentalTragedies = [
  'none',
  'war-victims',
  'accident-victims',
  'murdered',
  'amnesia',
  'never-known',
  'hidden',
  'left-for-save',
  'street-raised',
  'left-you',
  'sold-you',
];

export const personalities = [
  'shy',
  'violent',
  'arrogant',
  'rash',
  'nervous',
  'serious',
  'silly',
  'sneaky',
  'intellectual',
  'friendly',
];

export const lovedPeople = [
  'parent',
  'brother',
  'lover',
  'friend',
  'self',
  'pet',
  'mentor',
  'famous',
  'hero',
  'none',
];

export const lovedStuffs = [
  'weapon',
  'tool',
  'clothe',
  'photograph',
  'book',
  'recording',
  'instrument',
  'jewelry',
  'toy',
  'letter',
];

export const mainMotivations = [
  'money',
  'honor',
  'word',
  'honesty',
  'knowledge',
  'vengeance',
  'love',
  'power',
  'fun',
  'friendship',
];

export const societyThoughts = [
  'neutral',
  'indifferent',
  'mostly-friendly',
  'mostly-hater',
  'people-r-tools',
  'people-r-valuable',
  'people-r-obstacles',
  'trust-no-one',
  'kill-em-all',
  'save-em-all',
];

export const problematicLove = [
  'friends-family-hate-you',
  'friends-family-want-you-dead',
  'friends-family-hate-lover',
  'rival',
  'separated',
  'fight',
  'professional-rivals',
  'jealous',
  'affair',
  'environments',
];

export const tragicLove = [
  'died',
  'disapeared',
  'unmatch',
  'revenge',
  'kidnaped',
  'crazy',
  'suicide',
  'died-fighting',
  'affair-rival',
  'jail-exile',
];

export const feelings = [
  'lover-love',
  'you-love',
  'still-in-love',
  'you-hate',
  'lover-hate',
  'hate',
  'friends',
  'end',
  'lover-hate-you-love',
  'lover-love-you-hate',
];

export const relationEnemy = [
  'ex-friend',
  'ex-lover',
  'relative',
  'childhood-enemy',
  'person-working-for-you',
  'person-you-work-for',
  'partner-or-co-worker',
  'booster-gang-member',
  'corporate-exec',
  'government-official',
];

export const relationEnemyWhatToExpect = [
  'himself',
  'few-friends',
  'gang',
  'small-corp',
  'large-Corp',
  'government-agency',
];

export const relationEnemyFeelings = ['you', 'both', 'enemy'];

export const relationEnemyCause = [
  'caused-status-lost',
  'caused-loved-person-lost',
  'caused-humiliation',
  'personal-flaw',
  'caused-disability',
  'betrayed',
  'turned-down-others-offer',
  'dislike',
  'romantic-rival',
  'foiled-others-plan',
];

export const relationEnemyWhatToDo = [
  'rage-against',
  'avoid',
  'backstab',
  'ignore',
  'insult',
];

export const relationFriend = [
  'like-big-brosis',
  'like-kid-brosis',
  'mentor',
  'partner',
  'lover',
  'enemy',
  'parent',
  'relative',
  'childhood',
  'common-interest',
];

export const badLuck: LuckEvent[] = [
  {
    label: 'debt',
    modifiers: [{ property: 'money', amount: -1000, random: true }],
  },
  { label: 'prison' },
  {
    label: 'illness',
    modifiers: [{ property: 'REF', amount: -1 }],
    extraFact: [{ label: 'illness-illness' }, { label: 'illness-addiction' }],
  },
  {
    label: 'betray',
    extraFact: [
      { label: 'betray-blackmail' },
      { label: 'betray-reveal' },
      { label: 'betray-love' },
      { label: 'betray-job' },
    ],
  },
  {
    label: 'accident',
    extraFact: [
      {
        label: 'accident-disfigurement',
        modifiers: [
          { property: 'ATR', amount: -5, random: true, kind: 'stats' },
        ],
      },
      { label: 'accident-memory-lost' },
      { label: 'accident-hospitalization' },
      { label: 'accident-nightmares' },
    ],
  },
  {
    label: 'loved-one-killed',
    extraFact: [
      { label: 'loved-one-killed-accident' },
      { label: 'loved-one-killed-unknown' },
      { label: 'loved-one-killed-known' },
    ],
  },
  {
    label: 'fake-accusation',
    extraFact: [
      { label: 'fake-accusation-steal' },
      { label: 'fake-accusation-coward' },
      { label: 'fake-accusation-murder' },
      { label: 'fake-accusation-violation' },
      { label: 'fake-accusation-betray' },
    ],
  },
  {
    label: 'law-wanted',
    extraFact: [
      { label: 'law-wanted-local' },
      { label: 'law-wanted-city' },
      { label: 'law-wanted-national' },
      { label: 'law-wanted-international' },
    ],
  },
  {
    label: 'corporate-wanted',
    extraFact: [
      { label: 'corporate-wanted-local' },
      { label: 'corporate-wanted-city' },
      { label: 'corporate-wanted-national' },
      { label: 'corporate-wanted-international' },
    ],
  },
  {
    label: 'incapacitation',
    extraFact: [
      {
        label: 'corporate-wanted-nervous',
        modifiers: [{ property: 'REF', amount: -1, kind: 'stats' }],
      },
      {
        label: 'corporate-wanted-anxiety',
        modifiers: [{ property: 'FRI', amount: -1, kind: 'stats' }],
      },
      {
        label: 'corporate-wanted-psycho',
        modifiers: [
          { property: 'FRI', amount: -1, kind: 'stats' },
          { property: 'REF', amount: -1, kind: 'stats' },
        ],
      },
    ],
  },
];

export const goodLuck: LuckEvent[] = [
  {
    label: 'contact',
    extraFact: [
      { label: 'contact-cop' },
      { label: 'contact-attorney' },
      { label: 'contact-major-office' },
    ],
  },
  {
    label: 'money',
    modifiers: [{ property: 'money', amount: 1000, random: true }],
  },
  {
    label: 'success',
    modifiers: [{ property: 'money', amount: 2000, random: true }],
  },
  {
    label: 'master',
    modifiers: [
      {
        property: ['brawling', 'martial-art'],
        amount: 1,
        kind: 'skills',
      },
    ],
  },
  {
    label: 'teacher',
    modifiers: [
      {
        property: [
          'accounting',
          'anthropology',
          'awareness',
          'biology',
          'botany',
          'chemistry',
          'composition',
          'diagnose',
          'education',
          'expert',
          'gamble',
          'geology',
          'evade',
          'history',
          'language',
          'library-search',
          'mathematics',
          'physics',
          'programming',
          'track',
          'stock-market',
          'system-knowledge',
          'teaching',
          'survival',
          'zoology',
        ],
        amount: 1,
        kind: 'skills',
      },
    ],
  },
  { label: 'corporate-favour' },
  {
    label: 'nomads-favours',
    modifiers: [{ property: 'streetwise', amount: 2, kind: 'skills' }],
  },
  {
    label: 'cops-favours',
    modifiers: [{ property: 'streetwise', amount: 2, kind: 'skills' }],
  },
  {
    label: 'local-gang-favours',
    modifiers: [{ property: 'streetwise', amount: 2, kind: 'skills' }],
  },
  {
    label: 'veteran',
    modifiers: [
      {
        property: [
          'fencing',
          'melee',
          'archery',
          'heavy-weapons',
          'headgun',
          'rifle',
          'submachinegun',
        ],
        amount: 1,
        kind: 'skills',
      },
    ],
  },
];

export interface LuckEvent {
  label: string;
  modifiers?: Modifier[];
  extraFact?: LuckEvent[];
}
