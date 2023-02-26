import { SmallAnnounce } from '@components/Announce/SmallAnnounce';
import SmallPreview from '@components/Article/Preview/SmallPreview';
import { AnnouncePrevSkeleton } from '@components/Skeletons/AnnouncePrevSkeleton';
import ArticlePrevSkeleton from '@components/Skeletons/ArticlePrevSkeleton';
import { Stack } from '@mantine/core';
import { Locale } from '@type/Locale';
import { useRouter } from 'next/router';
import { useSWRBulkArticle } from 'src/hook/swr/useSWRArticle';
import { useSWRBulkAnnounce } from '../../hook/swr/useSWRAnnounce';

interface PreviewAnnounceProps {
  withPage?: {
    page: number;
    number?: number;
  };
}
function PreviewAnnounce({ withPage }: PreviewAnnounceProps) {
  const router = useRouter();
  const { announces, isLoading, isError } = useSWRBulkAnnounce(
    (router.locale as Locale) || 'en',
    withPage?.page,
    withPage?.number
  );
  if (isError) return <></>;
  if (isLoading)
    return (
      <Stack>
        {new Array(withPage && withPage.number ? withPage.number : 5).fill(null).map((v, i) => (
          <AnnouncePrevSkeleton key={i} />
        ))}
      </Stack>
    );
  return (
    <Stack>
      {announces!.map((v, i) => (
        <SmallAnnounce announce={v} announceId={v.id} key={i} />
      ))}
    </Stack>
  );
}

interface PreviewArticleProps {
  type: 'recruit' | 'enlist';
  withPage?: {
    page: number;
    number?: number;
  };
}

function PreviewArticle({ type, withPage }: PreviewArticleProps) {
  const { articles, isLoading, isError } = useSWRBulkArticle(
    type,
    withPage?.page,
    withPage?.number
  );
  if (isError || articles === null || articles === undefined) return <></>;
  if (isLoading)
    return (
      <Stack>
        {new Array(withPage && withPage.number ? withPage.number : 5).fill(null).map((v, i) => (
          <ArticlePrevSkeleton key={i} />
        ))}
      </Stack>
    );
  return (
    <Stack>
      {articles!.map((v) => (
        <SmallPreview key={v.id} id={v.id} article={v} />
      ))}
    </Stack>
  );
}

interface PreviewProps {
  type: 'recruit' | 'announce' | 'enlist';
  withPage?: {
    page: number;
    number?: number;
  };
}

export function BulkPreview({ type, withPage, ...etc }: PreviewProps) {
  return type === 'announce' ? (
    <PreviewAnnounce {...etc} withPage={withPage} />
  ) : (
    <PreviewArticle type={type} {...etc} withPage={withPage} />
  );
}
