import { SmallAnnounce } from '@components/Announce/SmallAnnounce';
import SmallPreview from '@components/Article/Preview/SmallPreview';
import ArticlePrevSkeleton from '@components/Skeletons/ArticlePrevSkeleton';
import { Stack } from '@mantine/core';
import { ArticleDataWithMeta } from '@type/data/ArticleData';
import { Locale } from '@type/Locale';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSWRBulkArticle, useSWRBulkArticleMainPage } from 'src/hook/swr/useSWRArticle';
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
  if (isLoading) return <></>;
  return (
    <Stack>
      {Object.keys(announces!).map((v, i) => (
        <SmallAnnounce announce={announces![v]} announceId={v} key={i} />
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
  const { articles, users, isLoading, isError } = useSWRBulkArticle(
    type,
    withPage?.page,
    withPage?.number
  );
  if (isError) return <></>;
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
      {Object.keys(articles!).map((v) => (
        <SmallPreview
          key={v}
          articleWithMeta={articles![v]}
          userData={users![articles![v].meta.userId]}
        />
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
