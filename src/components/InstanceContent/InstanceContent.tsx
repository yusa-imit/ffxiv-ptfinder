import { Badge, Group, Paper, PaperProps, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { Locale } from '@type/Locale';
import { useTranslation } from 'next-i18next';
import { VersionColor } from '@constant/defaultBadgeColors';
import { HTMLAttributes } from 'react';
import { DBInstance } from '../../type/data/DBInstance';
import { DungeonTypeColor } from '../../constant/defaultBadgeColors';

interface InstanceContentProps extends HTMLAttributes<HTMLDivElement> {
  data: DBInstance;
}

export default function InstanceContent({ data, ...etc }: InstanceContentProps) {
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const { code, title, type } = data;
  const version = code.toString()[0];
  const patch = code.toString()[1];
  return (
    <Paper
      withBorder
      tabIndex={0}
      sx={(theme) => ({
        padding: theme.spacing.sm,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        },
        '&:focus': {
          borderColor: theme.colors[theme.primaryColor][6],
        },
      })}
      onClick={(e) => {
        e.currentTarget.focus();
        if (etc.onClick) etc.onClick(e);
      }}
      {...etc}
    >
      <Group spacing={2}>
        <Badge
          variant="filled"
          radius="xs"
          color={VersionColor[version]}
        >{`${version}.${patch}`}</Badge>
        <Badge variant="filled" radius="xs" color={DungeonTypeColor[type]}>
          {t(`dungeon_type_${type}`, { ns: 'data' })}
        </Badge>
      </Group>
      <Title order={5}>{title[(locale || 'en') as Locale]}</Title>
    </Paper>
  );
}

export function EmptyInstanceContent(props: HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation('common');
  return (
    <Paper
      withBorder
      tabIndex={0}
      sx={(theme) => ({
        padding: theme.spacing.sm,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        },
        '&:focus': {
          borderColor: theme.colors[theme.primaryColor][6],
        },
      })}
      onClick={(e) => {
        e.currentTarget.focus();
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      <Group spacing={2}>
        <Badge variant="filled" radius="xs" color="red">
          N/A
        </Badge>
        <Badge variant="filled" radius="xs" color="red">
          N/A
        </Badge>
      </Group>
      <Title order={5}>{t('content_select_required')}</Title>
    </Paper>
  );
}
