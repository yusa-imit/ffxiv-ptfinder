export const Language_Value = ['JP', 'EN', 'FR', 'DE', 'KR', 'CN'] as const;
export const Region_Value = ['JP', 'NA', 'EU', 'OA', 'CN', 'KR'] as const;
export const Tank_Value = ['PLD', 'WAR', 'DRK', 'GNB'] as const;
export const Healer_Value = ['WHM', 'SCH', 'AST', 'SGE'] as const;
export const Melee_Value = ['DRG', 'MNK', 'NIN', 'RPR', 'SAM'] as const;
export const Range_Value = ['BRD', 'MCH', 'DNC'] as const;
export const Caster_Value = ['BLM', 'SMN', 'RDM'] as const;
export const Limited_Value = ['BLU'] as const;

export type Region = typeof Region_Value[number];
export type Job = Tank | Healer | Melee | Range | Caster | Limited;
export type Tank = typeof Tank_Value[number];
export type Healer = typeof Healer_Value[number];
export type Melee = typeof Melee_Value[number];
export type Range = typeof Range_Value[number];
export type Caster = typeof Caster_Value[number];
export type Limited = typeof Limited_Value[number];
export type Language = typeof Language_Value[number];

export type Role = 'TANK' | 'HEALER' | 'DPS' | 'LIMITED';
export type Detail_Role =
  | 'TANK'
  | 'B_HEALER'
  | 'P_HEALER'
  | 'MELEE'
  | 'RANGE'
  | 'CASTER'
  | 'LIMITED';

/**
 * @interface Game
 * @param version 게임 버전 ex) 6, 5, 4, 3, 2
 * @param patch 게임 메이저 패치 버전 ex) .1, .2
 */
export interface Game {
  version: string;
  patch: string;
}

export const DungeonTypeValues = ['raid', 'extreme', 'ultimate', 'alliance', 'etc'] as const;
/**
 * @type DungeonType
 * 어떤 종류의 던전인지 ex) 영식 레이드, 극만신, 절, 24인 레이드, 기타
 */
export type DungeonType = typeof DungeonTypeValues[number];

export const DungeonTypeToNumber: Record<DungeonType, number> = {
  raid: 0,
  extreme: 1,
  alliance: 2,
  ultimate: 3,
  etc: 4,
};
