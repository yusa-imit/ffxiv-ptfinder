import { CollapseWithButton } from '@components/CollapseWithButton';
import { Card, Group, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { ArticleDataSummaryWithMeta } from '../../../type/data/ArticleData';
import { User } from '../../../type/data/User';
import ArticleNodeGenerator from '../ArticleView/ArticleNodeGenerator';
import { MetaNodeGenerator } from '../ArticleView/MetaNodeGenerator';

interface SmallPreviewProps {
  articleWithMeta: ArticleDataSummaryWithMeta;
  userData: User;
}
export default function SmallPreview({ articleWithMeta, userData }: SmallPreviewProps) {
  const articleNode = ArticleNodeGenerator(articleWithMeta.article, 'compact');
  const metaNode = MetaNodeGenerator(articleWithMeta.meta, userData);
  const { t } = useTranslation('article_view');
  return (
    <Card
      withBorder
      shadow="md"
      sx={(theme) => ({
        padding: theme.spacing.md,
      })}
    >
      <Stack spacing={5}>
        <Group spacing={2}>
          {articleNode.status}
          {articleNode.default.isTemporary}
        </Group>
        <Group>{articleNode.title}</Group>
        <Group>{articleNode.default.dungeon}</Group>
        <Group>
          {metaNode.userIcon}
          {metaNode.date}
        </Group>
        <Group>{articleNode.default.props}</Group>
        <CollapseWithButton
          defaultState
          textOpen={t('preview_open_jobs')}
          textClose={t('preview_close_jobs')}
        >
          <Stack style={{ paddingTop: 10, paddingBottom: 10 }}>
            {articleNode.jobs.availables}
            {articleNode.jobs.position}
          </Stack>
        </CollapseWithButton>
        <CollapseWithButton
          defaultState={false}
          textOpen={t('preview_open_detail_tags')}
          textClose={t('preview_close_detail_tags')}
        >
          <Stack style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Group>
              {articleNode.details.essentials}
              {articleNode.details.additionals}
            </Group>
            <Group>{articleNode.details.languageRestrictions}</Group>
          </Stack>
        </CollapseWithButton>
      </Stack>
    </Card>
  );
}
