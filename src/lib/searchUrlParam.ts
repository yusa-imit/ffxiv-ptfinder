import { SearchIndexContext } from '@type/SearchIndex';
import { Job } from '@type/data/FFXIVInfo';
import { getArticleType } from './getArticleType';

function urlSearchParamValidator(
  key: keyof SearchIndexContext,
  context: Partial<SearchIndexContext>
): null | string {
  if (context[key] === undefined) return null;
  switch (key) {
    case 'title': {
      const value = context[key] as string;
      if (value.length === 0) return null;
      return value;
    }
    case 'content': {
      const value = context[key] as number;
      if (value < 1000) return null;
      return value.toString();
    }
    case 'minimumWeek': {
      const value: number = context[key] as number;
      if (value <= 0 || value > 2) return null;
      return value.toString();
    }
    case 'voiceChat': {
      const value: number[] = context[key] as (0 | 1 | 2)[];
      if (value.length === 0) return null;
      return `[${value.toString()}]`;
    }
    case 'availableJobs': {
      const value: Job[] = context[key] as Job[];
      if (value.length === 0) return null;
      return `[${value.toString()}]`;
    }
    case 'boxNumber': {
      if (context[key]) {
        const value = context[key] as number;
        if (value < 0 || value > 2) return null;
        return value.toString();
      }
      return null;
    }
    default:
      if (typeof context[key] === 'boolean' && context[key] === false) return null;
      return String(context[key]);
  }
}

export function getSearchUrlParams(context: SearchIndexContext) {
  const { articleType, ...inferContext } = context;
  const type = `article/${getArticleType(articleType)}?`;
  const url = Object.keys(inferContext).reduce((makeUrl, key) => {
    const urlValue = urlSearchParamValidator(
      key as Partial<keyof SearchIndexContext>,
      inferContext
    );
    if (urlValue === null) return makeUrl;
    return `${makeUrl}${makeUrl === type ? '' : '&'}${key}=${urlValue}`;
  }, type);
  if (type === url) return url.slice(0, -1);
  return url;
}
