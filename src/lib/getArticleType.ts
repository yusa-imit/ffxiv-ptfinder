export function getArticleType(type: 0 | 1) {
  if (![0, 1].includes(type)) throw new Error(`Type ${type} is not available.`);
  return type === 0 ? 'recruit' : 'enlist';
}

export function getNumberedArticleType(type: 'recruit' | 'enlist') {
  if (!['enlist', 'recruit'].includes(type)) throw Error(`Type ${type} is not available.`);
  return type === 'recruit' ? 0 : 1;
}
