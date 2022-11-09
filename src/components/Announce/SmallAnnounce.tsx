import { Button, Card, Group, Stack, Tooltip } from '@mantine/core';
import { AnnounceSummary } from '@type/data/AnnounceData';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { ChevronRight } from 'tabler-icons-react';
import { AnnounceSummaryNodeGenerator } from './AnnounceNodeGenerator';

interface SmallAnnounceProps {
  announce: AnnounceSummary;
  announceId: string;
}
export function SmallAnnounce({ announce, announceId }: SmallAnnounceProps) {
  const { t } = useTranslation(['common']);
  const AnnounceNode = AnnounceSummaryNodeGenerator({ data: announce, type: 'compact' });
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
            {AnnounceNode.type}
            {AnnounceNode.title}
          </Group>
          {AnnounceNode.date}
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
            <Button
              component={Link}
              href={`/announce/${announceId}`}
              style={{ flexGrow: 1, paddingRight: 12, paddingLeft: 12 }}
            >
              <ChevronRight size={16} />
            </Button>
          </Tooltip>
        </Stack>
      </Group>
    </Card>
  );
}
