import { CollapseWithButton } from '@components/CollapseWithButton';
import { getArticleType } from '@lib/getArticleType';
import { Button, Card, Collapse, Group, Space, Stack, Tooltip } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Tags } from 'tabler-icons-react';
import { ArticleDataSummaryWithMeta } from '../../../type/data/ArticleData';
import { User } from '../../../type/data/User';
import ArticleNodeGenerator from '../ArticleView/ArticleNodeGenerator';
import { MetaNodeGenerator } from '../ArticleView/MetaNodeGenerator';
import SubTitle from '../ArticleView/SubTitle';

interface SmallPreviewProps {
  articleWithMeta: ArticleDataSummaryWithMeta;
  userData: User;
}
export default function SmallPreview({ articleWithMeta, userData }: SmallPreviewProps) {
  const articleNode = ArticleNodeGenerator(articleWithMeta.article, 'compact');
  const metaNode = MetaNodeGenerator(articleWithMeta.meta, userData);
  const { t } = useTranslation('article_view');
  const [detail, setDetail] = useState(false);
  return (
    <Card
      withBorder
      sx={(theme) => ({
        display: 'flex',
        padding: theme.spacing.md,
        //cursor: 'pointer',
      })}
    >
      <Stack style={{ width: '100%' }}>
        {
          // Grouping button & infos
        }
        <Group>
          {
            // Title, basic tags, user icon
          }
          <Stack
            sx={(theme) => ({
              //width: '100%',
            })}
            spacing={5}
          >
            <Group spacing={2}>
              {articleNode.status}
              {articleNode.default.isTemporary}
              <Group>{articleNode.default.props}</Group>
            </Group>
            {articleNode.title}
            {articleNode.default.dungeon}
            <Group>
              {metaNode.userIcon}
              {metaNode.date}
            </Group>
          </Stack>
          {
            // User controll buttons
          }
          <Stack
            sx={(theme) => ({
              marginLeft: 'auto',
              height: '100%',
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'row',
                height: 'fit-content',
                width: '100%',
              },
            })}
            spacing={2}
          >
            <Tooltip label={t('preview_go_to_article')} position="bottom">
              <Button
                component={Link}
                href={`/article/${getArticleType(articleWithMeta.article.articleType)}/${
                  articleWithMeta.meta.articleId
                }`}
                style={{ flexGrow: 3, paddingRight: 12, paddingLeft: 12 }}
              >
                <ChevronRight size={16} />
              </Button>
            </Tooltip>
            <Tooltip label={t('preview_see_more_tags')} position="top">
              <Button
                style={{ flexGrow: 1, paddingRight: 12, paddingLeft: 12 }}
                onClick={() => {
                  setDetail((p) => !p);
                }}
              >
                <Tags size={16} />
              </Button>
            </Tooltip>
          </Stack>
        </Group>
        {
          // Collapse
        }
        <Collapse in={detail}>
          <CollapseWithButton
            defaultState={false}
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
        </Collapse>
      </Stack>
    </Card>
  );
}
