import SubTitle from '@components/Article/ArticleView/SubTitle';
import { CollapseWithButton } from '@components/CollapseWithButton';
import { Button, Card, Collapse, Group, Skeleton, Space, Stack, Tooltip } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ChevronRight, Tags } from 'tabler-icons-react';

export default function ArticlePrevSkeleton() {
  const { t } = useTranslation(['article_prev']);
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
              <Skeleton width={100} height={26} />
              <Skeleton width={100} height={26} />
              <Group>
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
              </Group>
            </Group>
            <Skeleton width={400} height={30} />
            <Skeleton width={300} height={26} />
            <Group>
              <Skeleton width={200} height={20} />
              <Skeleton width={120} height={20} />
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
              <Button style={{ flexGrow: 3, paddingRight: 12, paddingLeft: 12 }}>
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
              <Group>
                <Skeleton width={32} height={32} />
                <Skeleton width={32} height={32} />
                <Skeleton width={32} height={32} />
                <Skeleton width={32} height={32} />
              </Group>
              <Space h="sm" />
              <SubTitle>{t('preview_tag_positions')}</SubTitle>
              <Group>
                <Skeleton width={36} height={36} />
                <Skeleton width={36} height={36} />
                <Skeleton width={36} height={36} />
                <Skeleton width={36} height={36} />
              </Group>
            </Stack>
          </CollapseWithButton>
          <CollapseWithButton
            defaultState={false}
            textOpen={t('preview_open_detail_tags')}
            textClose={t('preview_close_detail_tags')}
          >
            <Stack spacing={2} style={{ paddingTop: 10, paddingBottom: 10 }}>
              <SubTitle>{t('preview_tag_essentials')}</SubTitle>
              <Group>
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
              </Group>
              <Space h="sm" />
              <SubTitle>{t('preview_tag_additionals')}</SubTitle>
              <Group>
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
              </Group>
              <Space h="sm" />
              <SubTitle>{t('preview_tag_lang_restrict')}</SubTitle>
              <Group>
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={26} />
              </Group>
            </Stack>
          </CollapseWithButton>
        </Collapse>
      </Stack>
    </Card>
  );
}
