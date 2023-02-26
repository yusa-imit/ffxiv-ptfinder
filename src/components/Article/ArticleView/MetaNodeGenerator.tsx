import { Avatar, createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import { Tz } from '@recoil/Tz';
import { UserSummary } from '@type/data/User';
import { Locale } from '@type/Locale';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { ChevronRight } from 'tabler-icons-react';
import ClientTime from '../../../lib/day/ClientTime';
import { ArticleData, ArticleFromDB } from '../../../type/data/ArticleData';
import { WidthLimitedTooltip } from '../../WidthLimitedTooltip';
import ArticleBadge from './ArticleBadge';

interface MetaNodeGeneratorReturn {
  status: ReactNode;
  userIcon: ReactNode;
  date: ReactNode;
}

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: 'fit-content',
    padding: 2,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export function MetaNodeGenerator(
  meta: { status: number; date: number },
  user: UserSummary
): MetaNodeGeneratorReturn {
  const { classes } = useStyles();
  const { t } = useTranslation('article_view');
  const tz = useRecoilValue(Tz);
  const router = useRouter();
  return {
    status: (
      <Group>
        {meta.status === 0 ? (
          <ArticleBadge color="green">{t('section_status_green')}</ArticleBadge>
        ) : meta.status === 1 ? (
          <ArticleBadge>{t('section_status_red')}</ArticleBadge>
        ) : (
          <ArticleBadge color="yellow">{t('section_status_yellow')}</ArticleBadge>
        )}
      </Group>
    ),
    userIcon: (
      <WidthLimitedTooltip label={t('click_user_to_inspect')}>
        <UnstyledButton className={classes.user}>
          <Group spacing={5}>
            <Text size={14}>{t('click_user_fore_text')}</Text>
            <Avatar src={user.image} radius={14} size="xs" />
            <Text size={14} weight={500}>
              {user.name}
            </Text>
            <ChevronRight size={12} />
          </Group>
        </UnstyledButton>
      </WidthLimitedTooltip>
    ),
    date: (
      <Text size={14}>
        {ClientTime.translateUnixTimeToLocalTime(meta.date, tz, router.locale as Locale)}
        {
          //TimeFunctions.fromDateToString( TimeFunctions.unixTimestampToDay(meta.date.seconds))
        }
      </Text>
    ),
  };
}
