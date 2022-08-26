import BigContainer from '@components/base/BigContainer';
import JobIcon from '@components/Jobs/Icon/JobIcon';
import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { JobSort } from '@constant/JobSort';
import {
  Badge,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  MantineColor,
  Tooltip,
  Button,
  Box,
  TypographyStylesProvider,
  Center,
} from '@mantine/core';
import { ArticleData } from '@type/data/ArticleData';
import { useTranslation } from 'next-i18next';
import ArticleBadge from './ArticleBadge';
import Section from './Section';
import SubTitle from './SubTitle';
import { RoleIconDiv } from '../../Jobs/Icon/RoleIconDiv';

interface ArticleViewProps {
  article: ArticleData;
}

export default function ArticleView({ article }: ArticleViewProps) {
  const { t } = useTranslation('article_view');
  const BadgeColor: { [key: string]: MantineColor } = {};
  return (
    <BigContainer
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      })}
    >
      <article style={{ width: '100%', position: 'relative' }}>
        <Stack>
          <Section title={t('section_title_title')}>
            <Title order={1} style={{ wordBreak: 'break-word', lineBreak: 'auto' }}>
              {article.title}
            </Title>
          </Section>
          <Section title={t('section_default_title')}>
            {article.isTemporary && (
              <Group>
                <ArticleBadge>{t('section_default_isTemporary_badge')}</ArticleBadge>
              </Group>
            )}
            {
              // TODO
            }
            <Group>
              <ArticleBadge>DEV_Unending Coil of Bahamut (Extreme)</ArticleBadge>
            </Group>
            <Group>
              <ArticleBadge>{`${t('section_default_region')} : ${article.region}`}</ArticleBadge>
              <ArticleBadge>{`${t('section_default_language')} : ${
                article.language
              }`}</ArticleBadge>
            </Group>
          </Section>
          <Section title={t('section_jobs_title')}>
            <SubTitle>{t('section_jobs_job_all')}</SubTitle>
            {article.jobs.flat(3).length === 0 ? (
              <Text>{t('section_jobs_job_not_specified')} </Text>
            ) : (
              <Group>
                {Array.from(new Set(article.jobs.flat(3)), (v) => v)
                  .sort((a, b) => JobSort[a].sort - JobSort[b].sort)
                  .map((v) => (
                    <JobIcon job={v} isChecked={false} disableHoverStyle key={v} />
                  ))}
              </Group>
            )}
            <SubTitle>{t('section_jobs_job_position')}</SubTitle>
            <Stack>
              {article.jobs.map((party, partyIndex) => (
                <Group key={partyIndex}>
                  {party.map((position, positionIndex) => (
                    <Tooltip
                      label={
                        position.length === 0
                          ? t('section_jobs_job_not_specified')
                          : position.map((v) => t(`jobs_${v}`)).join(', ')
                      }
                      key={positionIndex}
                    >
                      <Box>
                        <RoleIconDiv jobs={position} disableClick />
                      </Box>
                    </Tooltip>
                  ))}
                </Group>
              ))}
            </Stack>
          </Section>
          <Section title={t('section_details_title')}>
            <SubTitle>{t('section_details_essentials')}</SubTitle>
            <SubTitle>{t('section_details_additionals')}</SubTitle>
            <SubTitle>{t('section_details_language_restrictions')}</SubTitle>
          </Section>
          <Section title={t('section_schedules_title')}>
            <SubTitle>{t('section_schedules_detail')}</SubTitle>
          </Section>
          <Section title={t('section_description_title')}>
            {article.description.replace(/(<([^>]+)>)/gi, '') === '' ? (
              <Text>{t('section_description_no_description_provided')}</Text>
            ) : (
              <Center>
                <Paper
                  withBorder
                  sx={(theme) => ({
                    padding: theme.spacing.md,
                    width: '90%',
                    [theme.fn.smallerThan('sm')]: {
                      width: '100%',
                    },
                  })}
                >
                  <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{ __html: article.description }} />
                  </TypographyStylesProvider>
                </Paper>
              </Center>
            )}
          </Section>
        </Stack>
      </article>
    </BigContainer>
  );
}
