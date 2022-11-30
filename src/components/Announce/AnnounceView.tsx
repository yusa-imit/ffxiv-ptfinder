import Section from '@components/Article/ArticleView/Section';
import { Group, Stack } from '@mantine/core';
import { AnnounceData } from '@type/data/AnnounceData';
import { useTranslation } from 'next-i18next';
import { AnnounceNodeGenerator } from './AnnounceNodeGenerator';

interface AnnounceViewProps {
  data: AnnounceData;
}
export default function AnnounceView({ data }: AnnounceViewProps) {
  const AnnounceNode = AnnounceNodeGenerator({ data, type: 'full' });
  const { t } = useTranslation('common');
  return (
    <article>
      <Stack>
        <Section title={t('announce_status')}>
          <Group>
            {AnnounceNode.type} {AnnounceNode.date}
          </Group>
        </Section>
        <Section title={t('announce_title')}>{AnnounceNode.title}</Section>
        <Section title={t('announce_desc')}>{AnnounceNode.description}</Section>
      </Stack>
    </article>
  );
}
