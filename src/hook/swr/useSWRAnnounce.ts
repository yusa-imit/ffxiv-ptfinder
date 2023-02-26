import useSWR from 'swr';
import { SWRFetchError } from '@lib/error/SWRFetchError';
import { Locale } from '@type/Locale';
import { baseUrl } from '../../constant/baseUrl';
import { GetArticleReturnType, GetArticleBulkReturnType } from '../../type/api/article/get';
import { swrFetcher } from '../../lib/swrFetcher';
import { GetAnnounceBulkReturnType } from '../../type/api/annouce/get';

export function useSWRAnnounce(id: string, locale: Locale) {
  const { data, error, isValidating, mutate } = useSWR<GetArticleReturnType, SWRFetchError>(
    `${baseUrl}/api/announce/${id}?locale=${locale}`,
    swrFetcher
  );
  return {
    announce: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useSWRBulkAnnounce(locale: Locale, page?: number, number?: number) {
  const query: Record<string, Locale | number | undefined> = { locale, page, number };
  const uriString = Object.keys(query)
    .map((v) => {
      if (query[v] !== undefined) return `${v}=${query[v]}`;
      return '';
    })
    .filter((v) => v !== '')
    .join('&');
  const queryString = `${baseUrl}/api/announce${uriString.length > 0 ? `?${uriString}` : ''}`;
  const { data, error, isValidating, mutate } = useSWR<GetAnnounceBulkReturnType, SWRFetchError>(
    queryString,
    swrFetcher
  );
  return {
    announces: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useSWRBulkAnnounceMainPage(locale: Locale) {
  return useSWRBulkAnnounce(locale, 0, 5);
}
