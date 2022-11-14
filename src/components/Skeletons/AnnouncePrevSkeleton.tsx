import { Button, Card, Group, Skeleton, Stack, Tooltip } from '@mantine/core';
import { AnnounceSummary } from '@type/data/AnnounceData';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { ChevronRight } from 'tabler-icons-react';

export function AnnouncePrevSkeleton() {
  const { t } = useTranslation(['common']);
  return (
    <Card
      withBorder
      sx={(theme) => ({
        display: 'flex',
        padding: theme.spacing.md,
        overflow: 'visible',
        //cursor: 'pointer',
      })}
    >
      <Group spacing={5} style={{ width: '100%' }}>
        <Stack spacing={2}>
          <Group spacing={5}>
            <Skeleton height={30} width={90} />
            <Skeleton height={30} width={200} />
          </Group>
          <Skeleton height={20} width={120} />
        </Stack>

        <Stack
          sx={(theme) => ({
            marginLeft: 'auto',
            height: '100%',
            [theme.fn.smallerThan('sm')]: {
              height: 'fit-content',
              width: '100%',
            },
          })}
          spacing={2}
        >
          <Tooltip label={t('go_to_announce')} position="bottom">
            <Button style={{ flexGrow: 1, paddingRight: 12, paddingLeft: 12 }}>
              <ChevronRight size={16} />
            </Button>
          </Tooltip>
        </Stack>
      </Group>
    </Card>
  );
}
