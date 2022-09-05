import { AvailableClientLangs } from '@constant/Languages';
import { Button, Menu, MenuProps } from '@mantine/core';
import { Primary } from '@recoil/Primary';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Language } from 'tabler-icons-react';

interface LanguageSelectorProps extends MenuProps {
  title: string;
}
export default function LanguageSelector({ title, ...etc }: LanguageSelectorProps) {
  const primary = useRecoilValue(Primary);
  const { t } = useTranslation('data');
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const menuItems = AvailableClientLangs.map((v) => (
    <Menu.Item
      key={v}
      onClick={() => {
        router.push({ pathname, query }, asPath, { locale: v });
      }}
    >
      {t(`lang_${v.toUpperCase()}`)}
    </Menu.Item>
  ));
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button
          leftIcon={<Language />}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.colors[primary][6],
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.fn.lighten(theme.colors.dark[6], 0.05)
                  : theme.fn.darken(theme.colors.gray[0], 0.05),
            },
            '&:active': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.fn.lighten(theme.colors.dark[6], 0.1)
                  : theme.fn.darken(theme.colors.gray[0], 0.1),
            },
          })}
        >
          {title}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    </Menu>
  );
}
