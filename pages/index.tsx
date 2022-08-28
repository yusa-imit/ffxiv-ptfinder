import AppFooter from '@components/base/AppFooter/AppFooter';
import { Locale } from '@type/Locale';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AppHeader from '../src/components/base/AppHeader/AppHeader';
import DEV_TOP_ICON from '../src/components/icons/DEV_TOP_ICON';
import { DEV_FOOTER_DATA } from '../src/constant/DEV/DEV_FOOTER_DATA';

function dev(props: GetStaticProps) {
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

export const getStaticProps = async ({ locale }: { locale: Locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default dev;
