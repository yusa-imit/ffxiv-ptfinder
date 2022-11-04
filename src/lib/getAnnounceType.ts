const announceTypes = ['notice', 'update', 'maintanence'];

export default function getAnnounceType(type: number) {
  return announceTypes[type];
}
