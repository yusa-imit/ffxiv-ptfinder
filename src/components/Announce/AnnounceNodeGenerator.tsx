import ArticleBadge from '@components/Article/ArticleView/ArticleBadge';
import { BadgeColor } from '@constant/defaultBadgeColors';
import ClientTime from '@lib/day/ClientTime';
import { Center, Paper, Text, Title, TypographyStylesProvider } from '@mantine/core';
import { Tz } from '@recoil/Tz';
import { Locale } from '@type/Locale';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { AnnounceData, AnnounceSummary } from '../../type/data/AnnounceData';

export function AnnounceSummaryNodeGenerator({
  data,
  type,
}: {
  data: AnnounceSummary;
  type: 'full' | 'compact';
}) {
  const { t } = useTranslation(['common']);
  const tz = useRecoilValue(Tz);
  const router = useRouter();
  return {
    title: (
      <Title order={type === 'full' ? 1 : 3} style={{ wordBreak: 'break-word', lineBreak: 'auto' }}>
        {data.title}
      </Title>
    ),
    type: (
      <ArticleBadge color={BadgeColor[data.type] as string}>
        {t(`announce_type_${data.type}`)}
      </ArticleBadge>
    ),
    date: (
      <Text size={14}>
        {
          ClientTime.translateUnixTimeToLocalTime(data.date, tz, router.locale as Locale)
          //TimeFunctions.fromDateToString(TimeFunctions.unixTimestampToDay(data.date.seconds))
        }
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
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </TypographyStylesProvider>
          </Paper>
        </Center>
      ),
  };
}
