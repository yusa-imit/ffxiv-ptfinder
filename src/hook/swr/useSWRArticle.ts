import { ArticleDataWithMeta } from '@type/data/ArticleData';
import useSWR from 'swr';
import { SWRFetchError } from '@lib/error/SWRFetchError';
import { baseUrl } from '../../constant/baseUrl';
import { GetArticleReturnType, GetArticleBulkReturnType } from '../../type/api/article/get';
import { swrFetcher } from '../../lib/swrFetcher';

export function useSWRArticle(type: 'recruit' | 'enlist', id: string) {
  const { data, error } = useSWR<GetArticleReturnType, SWRFetchError>(
    `${baseUrl}/api/article/${type}/${id}`,
    swrFetcher
  );
  return {
    article: data?.data[0],
    user: data?.data[1],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSWRBulkArticle(type: 'recruit' | 'enlist', page?: number, number?: number) {
  const query: Record<string, number | undefined> = { page, number };
  const uriString = Object.keys(query)
    .map((v) => {
      if (!query[v]) return `${v}=${query[v]}`;
      return '';
    })
    .filter((v) => v !== '')
    .join('&');
  const queryString = `${baseUrl}/api/article/${type}${
    uriString.length > 0 ? `?${uriString}` : ''
  }`;
  const { data, error } = useSWR<GetArticleBulkReturnType, SWRFetchError>(queryString, swrFetcher);
  return {
    articles: data?.data[0],
    users: data?.data[1],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSWRBulkArticleMainPage(type: 'recruit' | 'enlist') {
  return useSWRBulkArticle(type, 0, 5);
}
