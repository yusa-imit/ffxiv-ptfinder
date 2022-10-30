import { Avatar, createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import { ArticleDataWithMeta } from '@type/data/ArticleData';
import { User } from '@type/data/User';
import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
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
    padding: theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export function MetaNodeGenerator(meta: ArticleMeta, user: User): MetaNodeGeneratorReturn {
  const { classes } = useStyles();
  const { t } = useTranslation();
  return {
    userIcon: (
      <WidthLimitedTooltip label={t('click_user_to_inspect')}>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={user.image} radius="xl" size="sm" />
            <Text size="md" weight={500}>
              {user.name}
            </Text>
          </Group>
        </UnstyledButton>
      </WidthLimitedTooltip>
    ),
    date: (
      <Text>
        {TimeFunctions.fromDateToString(TimeFunctions.unixTimestampToDay(meta.date.second))}
      </Text>
    ),
  };
}
