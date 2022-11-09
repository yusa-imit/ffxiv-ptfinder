import { announceTypes } from '@constant/announceTypes';

export default function getAnnounceType(type: number) {
  return announceTypes[type];
}
