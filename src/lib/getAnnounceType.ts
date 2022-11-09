import { announceTypes } from '@constant/announceTypes';
import { ValueOf } from '../type/ValueOf';

export default function getAnnounceType(
  type: keyof typeof announceTypes
): ValueOf<typeof announceTypes> {
  return announceTypes[type];
}
