import AppFooter from '@components/base/AppFooter/AppFooter';
import { Locale } from '@type/Locale';
import { GetStaticProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AppHeader from '../src/components/base/AppHeader/AppHeader';
import DEV_TOP_ICON from '../src/components/icons/DEV_TOP_ICON';
import { DEV_FOOTER_DATA } from '../src/constant/DEV/DEV_FOOTER_DATA';
import { authOptions } from './api/auth/[...nextauth]';

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

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'data'])),
    session: await unstable_getServerSession(context.req, context.res, authOptions),
  },
});

export default dev;
