import ArticleBadge from '@components/Article/ArticleView/ArticleBadge';
import { BadgeColor } from '@constant/defaultBadgeColors';
import getAnnounceType from '@lib/getAnnounceType';
import { getArticleType } from '@lib/getArticleType';
import TimeFunctions from '@lib/TimeFunctions';
import { Title, Text, Center, Paper, TypographyStylesProvider } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { AnnounceData, AnnounceSummary } from '../../type/data/AnnounceData';

export function AnnounceSummaryNodeGenerator({
  data,
  type,
}: {
  data: AnnounceSummary;
  type: 'full' | 'compact';
}) {
  const { t } = useTranslation(['common']);
  return {
    title: (
      <Title order={type === 'full' ? 1 : 3} style={{ wordBreak: 'break-word', lineBreak: 'auto' }}>
        {data.title}
      </Title>
    ),
    type: (
      <ArticleBadge color={BadgeColor[getAnnounceType(data.type) as string]}>
        {t(`announce_type_${getAnnounceType(data.type)}`)}
      </ArticleBadge>
    ),
    date: (
      <Text size={14}>
        {TimeFunctions.fromDateToString(TimeFunctions.unixTimestampToDay(data.date.seconds))}
      </Text>
    ),
  };
}

export function AnnounceNodeGenerator({
  data,
  type,
}: {
  data: AnnounceData;
  type: 'full' | 'compact';
}) {
  const { t } = useTranslation(['common']);
  return {
    ...AnnounceSummaryNodeGenerator({ data, type }),
    description:
      data.description.replace(/(<([^>]+)>)/gi, '') === '' ? (
        <Text>{t('announce_no_description_provided')}</Text>
      ) : (
        <Center>
          <Paper
            sx={(theme) => ({
              padding: theme.spacing.md,
              width: '90%',
              [theme.fn.smallerThan('sm')]: {
                width: '100%',
              },
            })}
          >
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </TypographyStylesProvider>
          </Paper>
        </Center>
      ),
  };
}
