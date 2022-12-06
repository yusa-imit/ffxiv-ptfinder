import useSWRMutation from 'swr/mutation';
import { FetcherResponse } from 'swr/_internal';
import { baseUrl } from '../../constant/baseUrl';

export function useSWRPost(
  url: string,
  fetchFunction?: (key: string, options: Readonly<{ arg: any }>) => FetcherResponse<{}>,
  requestInit?: RequestInit
) {
  const defaultFetchFunction = (_key: string, { arg }: Readonly<{ arg: any }>) => {
    return fetch(baseUrl + _key, { method: 'POST', body: JSON.stringify(arg), ...requestInit });
  };
  const { trigger, isMutating, error } = useSWRMutation(url, fetchFunction || defaultFetchFunction);
  return { trigger, isSuccess: !isMutating && !error, isLoading: isMutating, isError: error };
}
