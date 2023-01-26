export function searchParamSolver(param: { [key: string]: string | string[] | undefined }) {
  return Object.fromEntries(
    Object.entries(param).map(([key, value]) => {
      if (typeof value === 'string' && value[0] === '[') {
        return [key, value.slice(1, -1).split(',')];
      }
      return [key, value];
    })
  );
}
