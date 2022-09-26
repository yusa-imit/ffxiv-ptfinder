import { DrawerLinkGroup } from '@components/base/AppHeader/HeaderDrawer/DrawerLinkGroup/DrawerLinkGroup';
import { AvailableClientLangs } from '@constant/Languages';
import { Menu, MenuProps, UnstyledButton } from '@mantine/core';
import { Primary } from '@recoil/Primary';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Language } from 'tabler-icons-react';

interface LanguageIconProps extends React.ComponentPropsWithoutRef<'button'> {
  title?: string;
}
const LanguageIconForwarded = forwardRef<HTMLButtonElement, LanguageIconProps>(
  ({ title, ...others }: LanguageIconProps, ref) => {
    return (
      <UnstyledButton ref={ref} style={{ display: 'block', width: '100%' }} {...others}>
        <DrawerLinkGroup icon={Language} label={title || ''} />
      </UnstyledButton>
    );
  }
);

interface NavLanguageSelectorProps extends MenuProps {
  title?: string;
}
export default function NavLanguageSelector({ title, ...etc }: NavLanguageSelectorProps) {
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
    <Menu shadow="md" {...etc}>
      <Menu.Target>
        <LanguageIconForwarded title={title} />
      </Menu.Target>
      <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    </Menu>
  );
}
