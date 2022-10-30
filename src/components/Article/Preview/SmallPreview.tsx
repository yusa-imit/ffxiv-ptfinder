import { CollapseWithButton } from '@components/CollapseWithButton';
import { Box, Card, Divider, Group, Space, Stack, useMantineTheme } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { ArticleDataSummaryWithMeta } from '../../../type/data/ArticleData';
import { User } from '../../../type/data/User';
import ArticleNodeGenerator from '../ArticleView/ArticleNodeGenerator';
import { MetaNodeGenerator } from '../ArticleView/MetaNodeGenerator';
import SubGroup from '../ArticleView/SubGroup';
import SubTitle from '../ArticleView/SubTitle';

interface SmallPreviewProps {
  articleWithMeta: ArticleDataSummaryWithMeta;
  userData: User;
}
export default function SmallPreview({ articleWithMeta, userData }: SmallPreviewProps) {
  const articleNode = ArticleNodeGenerator(articleWithMeta.article, 'compact');
  const metaNode = MetaNodeGenerator(articleWithMeta.meta, userData);
  const MantineTheme = useMantineTheme();
  const { t } = useTranslation('article_view');
  return (
    <Card
      withBorder
      sx={(theme) => ({
        padding: theme.spacing.md,
        cursor: 'pointer',
      })}
    >
      <Stack spacing={5}>
        <Stack
          sx={(theme) => ({
            width: '100%',
          })}
          spacing={5}
        >
          <Group spacing={2}>
            {articleNode.status}
            {articleNode.default.isTemporary}
          </Group>
          {articleNode.title}
          {articleNode.default.dungeon}
          <Group>
            {metaNode.userIcon}
            {metaNode.date}
            <Group>{articleNode.default.props}</Group>
          </Group>
        </Stack>

        <CollapseWithButton
          defaultState
          textOpen={t('preview_open_jobs')}
          textClose={t('preview_close_jobs')}
        >
          <Stack style={{ paddingTop: 10, paddingBottom: 10 }} spacing={2}>
            <SubTitle>{t('preview_tag_available_jobs')}</SubTitle>
            {articleNode.jobs.availables}
            <Space h="sm" />
            <SubTitle>{t('preview_tag_positions')}</SubTitle>
            {articleNode.jobs.position}
          </Stack>
        </CollapseWithButton>
        <CollapseWithButton
          defaultState={false}
          textOpen={t('preview_open_detail_tags')}
          textClose={t('preview_close_detail_tags')}
        >
          <Stack spacing={2} style={{ paddingTop: 10, paddingBottom: 10 }}>
            <SubTitle>{t('preview_tag_essentials')}</SubTitle>
            {articleNode.details.essentials}
            <Space h="sm" />
            <SubTitle>{t('preview_tag_additionals')}</SubTitle>
            {articleNode.details.additionals}
            <Space h="sm" />
            <SubTitle>{t('preview_tag_lang_restrict')}</SubTitle>
            {articleNode.details.languageRestrictions}
          </Stack>
        </CollapseWithButton>
      </Stack>
    </Card>
  );
}
