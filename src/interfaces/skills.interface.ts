import { Stat } from './stats.interface';

export const maxRoleSkillPoints: number = 40;

export type Skill =
  | 'authority'
  | 'charisma'
  | 'combat-sense'
  | 'credibility'
  | 'family'
  | 'interface'
  | 'jury-rig'
  | 'medical-tech'
  | 'resources'
  | 'streetdeal'
  | 'grooming'
  | 'wardrobe'
  | 'endurance'
  | 'strength-feat'
  | 'swimming'
  | 'interrogation'
  | 'intimidate'
  | 'oratory'
  | 'resist'
  | 'streetwise'
  | 'human-perception'
  | 'interview'
  | 'leadership'
  | 'seduction'
  | 'social'
  | 'persuasion'
  | 'perform'
  | 'accounting'
  | 'anthropology'
  | 'awareness'
  | 'biology'
  | 'botany'
  | 'chemistry'
  | 'composition'
  | 'diagnose'
  | 'education'
  | 'expert'
  | 'gamble'
  | 'geology'
  | 'evade'
  | 'history'
  | 'language'
  | 'library-search'
  | 'mathematics'
  | 'physics'
  | 'programming'
  | 'track'
  | 'stock-market'
  | 'system-knowledge'
  | 'teaching'
  | 'survival'
  | 'zoology'
  | 'archery'
  | 'athletics'
  | 'brawling'
  | 'dance'
  | 'dodge'
  | 'driving'
  | 'fencing'
  | 'handgun'
  | 'heavy-weapons'
  | 'martial-art'
  | 'melee'
  | 'motorcycle'
  | 'operate-machinery'
  | 'pilot-gyro'
  | 'pilot-fixed-wing'
  | 'pilot-dirigible'
  | 'pilot-vect-vehicle'
  | 'rifle'
  | 'stealth'
  | 'submachinegun'
  | 'aero-tech'
  | 'av-tech'
  | 'electronics'
  | 'basic-tech'
  | 'cryotank-operation'
  | 'cyberdeck-design'
  | 'cybertech'
  | 'demolitions'
  | 'disguise'
  | 'elect-security'
  | 'first-aid'
  | 'forgery'
  | 'gyro-tech'
  | 'paint'
  | 'photo-film'
  | 'pharmaceuticals'
  | 'pick-lock'
  | 'pick-pocket'
  | 'instrument'
  | 'weaponsmith';

export interface SkillFamily {
  stat: Stat | 'special';
  skill: Skill;
}

export const skillFamilies: SkillFamily[] = [
  { stat: 'special', skill: 'authority' },
  { stat: 'special', skill: 'charisma' },
  { stat: 'special', skill: 'combat-sense' },
  { stat: 'special', skill: 'credibility' },
  { stat: 'special', skill: 'family' },
  { stat: 'special', skill: 'interface' },
  { stat: 'special', skill: 'jury-rig' },
  { stat: 'special', skill: 'medical-tech' },
  { stat: 'special', skill: 'resources' },
  { stat: 'special', skill: 'streetdeal' },

  { stat: 'ATR', skill: 'grooming' },
  { stat: 'ATR', skill: 'wardrobe' },

  { stat: 'TCO', skill: 'endurance' },
  { stat: 'TCO', skill: 'strength-feat' },
  { stat: 'TCO', skill: 'swimming' },

  { stat: 'FRI', skill: 'interrogation' },
  { stat: 'FRI', skill: 'intimidate' },
  { stat: 'FRI', skill: 'oratory' },
  { stat: 'FRI', skill: 'resist' },
  { stat: 'FRI', skill: 'streetwise' },

  { stat: 'EMP', skill: 'human-perception' },
  { stat: 'EMP', skill: 'interview' },
  { stat: 'EMP', skill: 'leadership' },
  { stat: 'EMP', skill: 'seduction' },
  { stat: 'EMP', skill: 'social' },
  { stat: 'EMP', skill: 'persuasion' },
  { stat: 'EMP', skill: 'perform' },

  { stat: 'INT', skill: 'accounting' },
  { stat: 'INT', skill: 'anthropology' },
  { stat: 'INT', skill: 'awareness' },
  { stat: 'INT', skill: 'biology' },
  { stat: 'INT', skill: 'botany' },
  { stat: 'INT', skill: 'chemistry' },
  { stat: 'INT', skill: 'composition' },
  { stat: 'INT', skill: 'diagnose' },
  { stat: 'INT', skill: 'education' },
  { stat: 'INT', skill: 'expert' },
  { stat: 'INT', skill: 'gamble' },
  { stat: 'INT', skill: 'geology' },
  { stat: 'INT', skill: 'evade' },
  { stat: 'INT', skill: 'history' },
  { stat: 'INT', skill: 'language' },
  { stat: 'INT', skill: 'library-search' },
  { stat: 'INT', skill: 'mathematics' },
  { stat: 'INT', skill: 'physics' },
  { stat: 'INT', skill: 'programming' },
  { stat: 'INT', skill: 'track' },
  { stat: 'INT', skill: 'stock-market' },
  { stat: 'INT', skill: 'system-knowledge' },
  { stat: 'INT', skill: 'teaching' },
  { stat: 'INT', skill: 'survival' },
  { stat: 'INT', skill: 'zoology' },

  { stat: 'REF', skill: 'archery' },
  { stat: 'REF', skill: 'athletics' },
  { stat: 'REF', skill: 'brawling' },
  { stat: 'REF', skill: 'dance' },
  { stat: 'REF', skill: 'dodge' },
  { stat: 'REF', skill: 'driving' },
  { stat: 'REF', skill: 'fencing' },
  { stat: 'REF', skill: 'handgun' },
  { stat: 'REF', skill: 'heavy-weapons' },
  { stat: 'REF', skill: 'martial-art' },
  { stat: 'REF', skill: 'melee' },
  { stat: 'REF', skill: 'motorcycle' },
  { stat: 'REF', skill: 'operate-machinery' },
  { stat: 'REF', skill: 'pilot-gyro' },
  { stat: 'REF', skill: 'pilot-fixed-wing' },
  { stat: 'REF', skill: 'pilot-dirigible' },
  { stat: 'REF', skill: 'pilot-vect-vehicle' },
  { stat: 'REF', skill: 'rifle' },
  { stat: 'REF', skill: 'stealth' },
  { stat: 'REF', skill: 'submachinegun' },

  { stat: 'TEC', skill: 'aero-tech' },
  { stat: 'TEC', skill: 'av-tech' },
  { stat: 'TEC', skill: 'electronics' },
  { stat: 'TEC', skill: 'basic-tech' },
  { stat: 'TEC', skill: 'cryotank-operation' },
  { stat: 'TEC', skill: 'cyberdeck-design' },
  { stat: 'TEC', skill: 'cybertech' },
  { stat: 'TEC', skill: 'demolitions' },
  { stat: 'TEC', skill: 'disguise' },
  { stat: 'TEC', skill: 'elect-security' },
  { stat: 'TEC', skill: 'first-aid' },
  { stat: 'TEC', skill: 'forgery' },
  { stat: 'TEC', skill: 'gyro-tech' },
  { stat: 'TEC', skill: 'paint' },
  { stat: 'TEC', skill: 'photo-film' },
  { stat: 'TEC', skill: 'pharmaceuticals' },
  { stat: 'TEC', skill: 'pick-lock' },
  { stat: 'TEC', skill: 'pick-pocket' },
  { stat: 'TEC', skill: 'instrument' },
  { stat: 'TEC', skill: 'weaponsmith' },
];
