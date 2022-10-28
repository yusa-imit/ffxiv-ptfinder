import SmallPreview from '@components/Article/Preview/SmallPreview';
import { Stack } from '@mantine/core';
import { ArticleDataWithMeta } from '@type/data/ArticleData';
import { useSWRBulkArticle, useSWRBulkArticleMainPage } from 'src/hook/swr/useSWRArticle';

interface PreviewAnnounceProps {}
function PreviewAnnounce() {
  return <></>;
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
  if (isLoading) return <></>;
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

export function Preview({ type, withPage, ...etc }: PreviewProps) {
  return type === 'announce' ? (
    <PreviewAnnounce type={type} {...etc} />
  ) : (
    <PreviewArticle type={type} {...etc} withPage={withPage} />
  );
}
