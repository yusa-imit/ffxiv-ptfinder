import { Button, Group } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Headset, Home, List } from 'tabler-icons-react';

export default function AnnounceHandler() {
  const { t } = useTranslation('nav');
  return (
    <Group>
      <Button component={Link} href="/" leftIcon={<Home />}>
        {t('controller_go_home')}
      </Button>
      <Button component={Link} href="/support" leftIcon={<Headset />}>
        {t('controller_support_main')}
      </Button>
      <Button component={Link} href="/support/announce" leftIcon={<List />}>
        {t('controller_announce_list')}
      </Button>
    </Group>
  );
}
