import SmallPreview from '@components/Article/Preview/SmallPreview';
import ArticlePrevSkeleton from '@components/Skeletons/ArticlePrevSkeleton';
import { Card, Stack, Text, Group } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'next-i18next';
import { PinnedOff } from 'tabler-icons-react';
import { useSWRArticle } from '../../hook/swr/useSWRArticle';
import { PinnedArticles } from '../../recoil/PinnedArticles/PinnedArticles';

function FetchingDataWithId({ type, id }: { type: 'recruit' | 'enlist'; id: string }) {
  const { article, isLoading, isError } = useSWRArticle(type, id);
  if (!article) return <></>;
  if (isLoading) return <ArticlePrevSkeleton />;
  return <SmallPreview article={article} id={id} />;
}

function NoPinnedArticles() {
  const { t } = useTranslation('article_prev');
  return (
    <Card>
      <Group
        spacing={8}
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.md,
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: theme.fontSizes.md,
          textAlign: 'center',
          cursor: 'default',
        })}
      >
        <PinnedOff size={20} />
        <Text size={16} weight={500}>
          {t('no_pinned_articles')}
        </Text>
      </Group>
    </Card>
  );
}

export default function IdPreview({ limit }: { limit?: number }) {
  const articles = useRecoilValue(PinnedArticles);
  if (articles.length === 0) return <NoPinnedArticles />;
  return (
    <Stack>
      {articles
        .reverse()
        .slice(0, limit || articles.length)
        .map((v) => (
          <FetchingDataWithId type={v.type === 0 ? 'recruit' : 'enlist'} id={v.id} />
        ))}
    </Stack>
  );
}
