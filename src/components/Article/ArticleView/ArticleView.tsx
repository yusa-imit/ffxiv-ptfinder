import BigContainer from '@components/base/BigContainer';
import { Group, Stack } from '@mantine/core';
import { ArticleData } from '@type/data/ArticleData';
import { useTranslation } from 'next-i18next';
import ArticleNodeGenerator from './ArticleNodeGenerator';
import Section from './Section';
import SubGroup from './SubGroup';
import SubTitle from './SubTitle';

interface ArticleViewProps {
  article: ArticleData;
}

export default function ArticleView({ article }: ArticleViewProps) {
  const { t } = useTranslation(['article_view', 'data']);
  const ArticleNode = ArticleNodeGenerator(article);
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
          <Section title={t('section_title_title')}>{ArticleNode.title}</Section>
          <Section title={t('section_default_title')}>
            <SubGroup>
              {ArticleNode.default.isTemporary}
              {
                // TODO
              }
              <Group>{ArticleNode.default.dungeon}</Group>
              <Group>{ArticleNode.default.props}</Group>
            </SubGroup>
          </Section>
          <Section title={t('section_jobs_title')}>
            <SubGroup>
              <SubTitle>{t('section_jobs_job_all')}</SubTitle>
              {ArticleNode.jobs.availables}
            </SubGroup>
            <SubGroup>
              <SubTitle>{t('section_jobs_job_position')}</SubTitle>
              {ArticleNode.jobs.position}
            </SubGroup>
          </Section>
          <Section title={t('section_details_title')}>
            <SubGroup>
              <SubTitle>{t('section_details_essentials')}</SubTitle>
              {ArticleNode.details.essentials}
            </SubGroup>
            <SubGroup>
              <SubTitle>{t('section_details_additionals')}</SubTitle>
              {ArticleNode.details.additionals}
            </SubGroup>
            <SubGroup>
              <SubTitle>{t('section_details_language_restrictions')}</SubTitle>
              {ArticleNode.details.languageRestrictions}
            </SubGroup>
          </Section>
          <Section title={t('section_schedules_title')}>
            <SubGroup>
              <SubTitle>{t('section_schedules_article_timezone')}</SubTitle>
              {ArticleNode.schedule.timezone}
            </SubGroup>
            <SubGroup>
              <SubTitle>{t('section_schedules_summary')}</SubTitle>
              {ArticleNode.schedule.summary}
            </SubGroup>
          </Section>
          <Section title={t('section_description_title')}>{ArticleNode.description}</Section>
        </Stack>
      </article>
    </BigContainer>
  );
}
