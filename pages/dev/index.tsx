import AppFooter from '@components/base/AppFooter/AppFooter';
import AppHeader from '../../src/components/base/AppHeader/AppHeader';
import DEV_TOP_ICON from '../../src/components/icons/DEV_TOP_ICON';
import { DEV_FOOTER_DATA } from '../../src/constant/DEV/DEV_FOOTER_DATA';

export default function dev() {
  return (
    <>
      <AppHeader
        Logo={<DEV_TOP_ICON />}
        LogoForNav={<DEV_TOP_ICON size="xl" />}
        title="DEV_APP_TITLE"
        buttonText="DEV_BUTTON_TEXT"
      />
      <AppFooter Logo={<DEV_TOP_ICON />} title="DEV_APP_TITLE" links={DEV_FOOTER_DATA} />
    </>
  );
}
