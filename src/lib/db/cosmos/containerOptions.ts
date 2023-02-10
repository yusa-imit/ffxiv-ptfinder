import { ContainerRequest, RequestOptions } from '@azure/cosmos';

type ContainerKeys = 'article' | 'announce' | 'instance';

export const containerOptions: Record<
  ContainerKeys,
  [ContainerRequest, RequestOptions | undefined]
> = {
  article: [{ id: 'article', partitionKey: '/articleType' }, undefined],
  announce: [{ id: 'announce' }, undefined],
  instance: [{ id: 'instance' }, undefined],
};
