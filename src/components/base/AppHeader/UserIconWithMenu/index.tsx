import UserButton, { UserButtonProps } from '@components/UserButton';
import { Menu, MenuProps, MenuStylesNames, Styles } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { forwardRef } from 'react';
import { Alarm, Article, Logout, Pin, User } from 'tabler-icons-react';
import { signOut } from 'next-auth/react';

interface ForwardedButtonProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  name: string;
  icon?: React.ReactNode;
}
const ForwaredeButton = forwardRef<HTMLDivElement, ForwardedButtonProps>(
  ({ image, name, icon, ...etc }: ForwardedButtonProps, ref) => {
    return (
      <div ref={ref}>
        <UserButton image={image} name={name} icon={icon} {...etc} />
      </div>
    );
  }
);

interface UserIconMenuProps extends UserButtonProps, MenuProps {
  styles?: Styles<MenuStylesNames>;
}
export default function UserIconWithMenu({ image, name, icon, ...etc }: UserIconMenuProps) {
  const { t } = useTranslation('nav');
  return (
    <Menu {...etc}>
      <Menu.Target>
        <ForwaredeButton image={image} name={name} icon={icon} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<User size={14} />}>{t('user_account')}</Menu.Item>
        <Menu.Item icon={<Article size={14} />}>{t('user_my_articles')}</Menu.Item>
        <Menu.Item icon={<Pin size={14} />}>{t('user_pinned_articles')}</Menu.Item>
        <Menu.Item icon={<Alarm size={14} />}>{t('user_alarms')}</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          icon={<Logout size={14} />}
          onClick={() => {
            signOut();
          }}
        >
          {t('user_logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
