import { SWRFetchError } from '@lib/error/SWRFetchError';
import useSWR from 'swr';
import { baseUrl } from '../../constant/baseUrl';
import { swrFetcher } from '../../lib/swrFetcher';
import { GetArticleBulkReturnType, GetArticleReturnType } from '../../type/api/article/get';

export function useSWRArticle(type: 'recruit' | 'enlist', id: string) {
  const { data, error } = useSWR<GetArticleReturnType, SWRFetchError>(
    `${baseUrl}/api/article/${type}/${id}`,
    swrFetcher
  );
  return {
    article: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSWRBulkArticle(type: 'recruit' | 'enlist', page?: number, number?: number) {
  const query: Record<string, number | undefined> = { page, number };
  const uriString = Object.keys(query)
    .map((v) => {
      if (query[v] !== undefined) return `${v}=${query[v]}`;
      return '';
    })
    .filter((v) => v !== '')
    .join('&');
  const queryString = `${baseUrl}/api/article/${type}${
    uriString.length > 0 ? `?${uriString}` : ''
  }`;
  const { data, error } = useSWR<GetArticleBulkReturnType, SWRFetchError>(queryString, swrFetcher);
  return {
    articles: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSWRBulkArticleMainPage(type: 'recruit' | 'enlist') {
  return useSWRBulkArticle(type, 0, 5);
}
