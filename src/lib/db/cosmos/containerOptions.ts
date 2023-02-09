import { ContainerRequest, RequestOptions } from '@azure/cosmos';

type ContainerKeys = 'article' | 'announce' | 'instance';

export const containerOptions: Record<ContainerKeys, [ContainerRequest, RequestOptions]> = {
  article: [{ id: 'article', partitionKey: '/articleType' }, {}],
  announce: [{ id: 'announce' }, {}],
  instance: [{ id: 'instance' }, {}],
};
