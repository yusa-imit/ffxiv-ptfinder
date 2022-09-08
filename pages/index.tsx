import AppFooter from '@components/base/AppFooter/AppFooter';
import BigContainer from '@components/base/BigContainer';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import MainSection from '@components/MainSection/MainSection';
import { Button, Group, Stack } from '@mantine/core';
import { Locale } from '@type/Locale';
import { GetStaticProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AppHeader from '../src/components/base/AppHeader/AppHeader';
import DEV_TOP_ICON from '../src/components/icons/DEV_TOP_ICON';
import { DEV_FOOTER_DATA } from '../src/constant/DEV/DEV_FOOTER_DATA';
import { authOptions } from './api/auth/[...nextauth]';

function dev(props: GetStaticProps) {
  const { t } = useTranslation('common');
  return (
    <>
      <AppHeader
        Logo={<DEV_TOP_ICON />}
        LogoForNav={<DEV_TOP_ICON size="xl" />}
        title="DEV_APP_TITLE"
        buttonText="DEV_BUTTON_TEXT"
      />
      <BigContainer size="lg">
        <Stack spacing="xl">
          <ContentWrapper>
            <Group>
              <Button>{t('main_button_make_recruit')}</Button>
              <Button>{t('main_button_make_enlist')}</Button>
            </Group>
          </ContentWrapper>
          <MainSection title={t('main_section_recent_announcement')} />
          <MainSection title={t('main_section_pinned_article')} />
          <MainSection title={t('main_section_recent_article')} />
        </Stack>
      </BigContainer>
      <AppFooter Logo={<DEV_TOP_ICON />} title="DEV_APP_TITLE" links={DEV_FOOTER_DATA} />
    </>
  );
}

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'data', 'nav'])),
    session: await unstable_getServerSession(context.req, context.res, authOptions),
  },
});

export default dev;
