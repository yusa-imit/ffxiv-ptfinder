import { SearchIndexContext } from '@type/SearchIndex';
import { Job } from '@type/data/FFXIVInfo';

function searchUrlParamValidator(context: SearchIndexContext) {
  const newContext = { ...context };
  Object.keys(newContext).forEach((key) => {
    switch (key) {
      case 'articleType':
        return;
      case 'title':
        if (newContext.title !== undefined) {
          newContext.title = newContext.title.trim();
        }
        return;
      case 'isTemporary':
        if ((context.isTemporary as boolean) === false) {
          newContext.isTemporary = null;
        }
        return;
      case 'availableJobs':
        if ((context.availableJobs as Job[]).length === 0) {
          newContext.availableJobs = null;
        }

      default:
        break;
    }
  });
}

export function getSearchUrlParams(context: SearchIndexContext) {
  return Object.entries(context).reduce((makeUrl, [key, value]) => {
    if (key === 'content' && value === -1) return makeUrl;
    if (key === 'availableJobs' && value.length === 0) return makeUrl;
    if (value === null || value === undefined) return makeUrl;
    return `${makeUrl}${makeUrl.length === 1 ? '' : '&'}${key}=${String(value)}`;
  }, '?');
}
