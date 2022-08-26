import { Role, Detail_Role, Job } from '../type/data/FFXIVInfo';

export const JobSort: { [key in Job]: { role: Role; d_role: Detail_Role; sort: number } } = {
  DRK: {
    role: 'TANK',
    d_role: 'TANK',
    sort: 0,
  },
  GNB: {
    role: 'TANK',
    d_role: 'TANK',
    sort: 1,
  },
  PLD: {
    role: 'TANK',
    d_role: 'TANK',
    sort: 2,
  },
  WAR: {
    role: 'TANK',
    d_role: 'TANK',
    sort: 3,
  },
  AST: {
    role: 'HEALER',
    d_role: 'P_HEALER',
    sort: 5,
  },
  SCH: {
    role: 'HEALER',
    d_role: 'B_HEALER',
    sort: 6,
  },
  SGE: {
    role: 'HEALER',
    d_role: 'B_HEALER',
    sort: 7,
  },
  WHM: {
    role: 'HEALER',
    d_role: 'P_HEALER',
    sort: 4,
  },
  BLM: {
    role: 'DPS',
    d_role: 'CASTER',
    sort: 8,
  },
  BRD: {
    role: 'DPS',
    d_role: 'RANGE',
    sort: 9,
  },
  DNC: {
    role: 'DPS',
    d_role: 'RANGE',
    sort: 10,
  },
  DRG: {
    role: 'DPS',
    d_role: 'MELEE',
    sort: 11,
  },
  MCH: {
    role: 'DPS',
    d_role: 'RANGE',
    sort: 12,
  },
  MNK: {
    role: 'DPS',
    d_role: 'MELEE',
    sort: 13,
  },
  NIN: {
    role: 'DPS',
    d_role: 'MELEE',
    sort: 14,
  },
  RDM: {
    role: 'DPS',
    d_role: 'CASTER',
    sort: 15,
  },
  RPR: {
    role: 'DPS',
    d_role: 'MELEE',
    sort: 16,
  },
  SAM: {
    role: 'DPS',
    d_role: 'MELEE',
    sort: 17,
  },
  SMN: {
    role: 'DPS',
    d_role: 'CASTER',
    sort: 18,
  },
  BLU: {
    role: 'LIMITED',
    d_role: 'LIMITED',
    sort: 19,
  },
};
