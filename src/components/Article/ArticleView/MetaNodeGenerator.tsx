import { Avatar, createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import { ArticleDataWithMeta } from '@type/data/ArticleData';
import { User } from '@type/data/User';
import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import { ChevronRight } from 'tabler-icons-react';
import { ArticleMeta } from '../../../type/data/ArticleData';
import TimeFunctions from '../../../lib/TimeFunctions';
import { WidthLimitedTooltip } from '../../WidthLimitedTooltip';

interface MetaNodeGeneratorReturn {
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

export function MetaNodeGenerator(meta: ArticleMeta, user: User): MetaNodeGeneratorReturn {
  const { classes } = useStyles();
  const { t } = useTranslation('article_view');
  return {
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
        {TimeFunctions.fromDateToString(TimeFunctions.unixTimestampToDay(meta.date.seconds))}
      </Text>
    ),
  };
}
