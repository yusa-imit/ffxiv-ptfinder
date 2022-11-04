import BigContainer from '@components/base/BigContainer';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import MainSection from '@components/MainSection/MainSection';
import { BulkPreview } from '@components/Preview/BulkPreview';
import IdPreview from '@components/Preview/IdPreview';
import { Button, Group, Image, Stack } from '@mantine/core';
import { GetStaticProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]';

function dev(props: unknown) {
  const { t } = useTranslation('common');
  return (
    <>
      <BigContainer size="lg">
        <Stack spacing="xl">
          <ContentWrapper>
            <Group position="center">
              <Link href="/maker/recruit" passHref>
                <Button>{t('main_button_make_recruit')}</Button>
              </Link>
              <Link href="/maker/enlist" passHref>
                <Button>{t('main_button_make_enlist')}</Button>
              </Link>
            </Group>
          </ContentWrapper>
          <MainSection title={t('main_section_recent_announcement')} seeMore href="/announce" />
          <MainSection title={t('main_section_pinned_article')} seeMore href="/article/pinned">
            <IdPreview limit={5} />
          </MainSection>
          <MainSection title={t('main_section_recent_recruits')} seeMore href="/article/recruits">
            <BulkPreview type="recruit" withPage={{ page: 0, number: 5 }} />
          </MainSection>
          <MainSection title={t('main_section_recent_enlists')} seeMore href="/article/enlists">
            <BulkPreview type="enlist" withPage={{ page: 0, number: 5 }} />
          </MainSection>
        </Stack>
      </BigContainer>
    </>
  );
}

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'data', 'nav', 'article_view'])),
    session: await unstable_getServerSession(context.req, context.res, authOptions),
  },
});

export default dev;
