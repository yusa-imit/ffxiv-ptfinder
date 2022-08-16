import { Role, Detail_Role, Job } from '../type/data/FFXIVInfo';

export const JobSort: { [key in Job]: { role: Role; d_role: Detail_Role } } = {
  DRK: {
    role: 'TANK',
    d_role: 'TANK',
  },
  GNB: {
    role: 'TANK',
    d_role: 'TANK',
  },
  PLD: {
    role: 'TANK',
    d_role: 'TANK',
  },
  WAR: {
    role: 'TANK',
    d_role: 'TANK',
  },
  AST: {
    role: 'HEALER',
    d_role: 'P_HEALER',
  },
  SCH: {
    role: 'HEALER',
    d_role: 'B_HEALER',
  },
  SGE: {
    role: 'HEALER',
    d_role: 'B_HEALER',
  },
  WHM: {
    role: 'HEALER',
    d_role: 'P_HEALER',
  },
  BLM: {
    role: 'DPS',
    d_role: 'CASTER',
  },
  BRD: {
    role: 'DPS',
    d_role: 'RANGE',
  },
  DNC: {
    role: 'DPS',
    d_role: 'RANGE',
  },
  DRG: {
    role: 'DPS',
    d_role: 'MELEE',
  },
  MCH: {
    role: 'DPS',
    d_role: 'RANGE',
  },
  MNK: {
    role: 'DPS',
    d_role: 'MELEE',
  },
  NIN: {
    role: 'DPS',
    d_role: 'MELEE',
  },
  RDM: {
    role: 'DPS',
    d_role: 'CASTER',
  },
  RPR: {
    role: 'DPS',
    d_role: 'MELEE',
  },
  SAM: {
    role: 'DPS',
    d_role: 'MELEE',
  },
  SMN: {
    role: 'DPS',
    d_role: 'CASTER',
  },
  BLU: {
    role: 'LIMITED',
    d_role: 'LIMITED',
  },
};
