import { Button, Group } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Headset, Home, List } from 'tabler-icons-react';

export default function ArticleHandler({ type }: { type: 'recruit' | 'enlist' }) {
  const { t } = useTranslation('nav');
  return (
    <Group>
      <Button component={Link} href="/" leftIcon={<Home />}>
        {t('controller_go_home')}
      </Button>
      <Button component={Link} href="/article" leftIcon={<Headset />}>
        {t('controller_article_main')}
      </Button>
      <Button component={Link} href={`/article/${type}`} leftIcon={<List />}>
        {t('controller_go_list')}
      </Button>
    </Group>
  );
}
