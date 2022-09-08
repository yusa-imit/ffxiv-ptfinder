import BigContainer from '@components/base/BigContainer';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import MainSection from '@components/MainSection/MainSection';
import { Button, Group, Image, Stack } from '@mantine/core';
import { GetStaticProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authOptions } from './api/auth/[...nextauth]';

function dev(props: GetStaticProps) {
  const { t } = useTranslation('common');
  return (
    <>
      <BigContainer size="lg">
        <Stack spacing="xl">
          <ContentWrapper
            style={{
              height: '200px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundImage: `url('/banner.jpg')`,
              backgroundPosition: 'top 30% left',
              backgroundSize: 'cover',
            }}
            withoutBorder
          >
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
