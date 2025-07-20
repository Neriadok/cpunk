import { BodyPart, Dificulty, LowValue } from './game.interface';
import { AnyStat } from './stats.interface';

/**
 * Defines the different types of Cyberware.
 */
export type CyberwareType =
  | 'sandevistan'
  | 'berserker'
  | 'netnexus'
  | 'mechanical-limb'
  | 'nanofiber-muscles'
  | 'articular-rotors'
  | 'reinforced-bones'
  | 'subcutaneous-armor'
  | 'adrenaline-pump'
  | 'facial-redesign'
  | 'sony-optics'
  | 'technical-optics'
  | 'stimulant-pump'
  | 'quick-seal-skin'
  | 'intravenous-filters'
  | 'grounding-plug';

export interface Cyberware {
  cyberwareType: CyberwareType;
  location: BodyPart;
  level: LowValue;
  hardIceDificulty: Dificulty;
  bonifications: AnyStat[];
  activable: boolean;
  extraEffects: string;
  militar: boolean;
  price: number;
}

export const SandevistanBonifications: AnyStat[] = ['REF', 'actions'];
export const BerserkerBonifications: AnyStat[] = ['REF', 'TCO'];
export const NetnexusBonifications: AnyStat[] = ['CPU'];
export const MechanicalLimbBonifications: AnyStat[] = ['TCO', 'armor'];
export const NanofiberMusclesBonifications: AnyStat[] = ['REF'];
export const ArticularRotorsBonifications: AnyStat[] = ['movement'];
export const ReinforcedBonesBonifications: AnyStat[] = ['TCO'];
export const SubcutaneousArmorBonifications: AnyStat[] = ['armor'];
export const FacialRedesignBonifications: AnyStat[] = ['ATR'];
export const SonyOpticsBonifications: AnyStat[] = ['precision'];
export const AdrenalinePumpBonifications: AnyStat[] = ['shock', 'REF'];
export const QuickSealSkinBonifications: AnyStat[] = ['bleed'];
export const IntravenousFiltersBonifications: AnyStat[] = ['poison'];
