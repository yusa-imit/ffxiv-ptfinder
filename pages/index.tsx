import BigContainer from '@components/base/BigContainer';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import MainSection from '@components/MainSection/MainSection';
import { BulkPreview } from '@components/Preview/BulkPreview';
import IdPreview from '@components/Preview/IdPreview';
import { Button, Group, Image, Stack } from '@mantine/core';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]';

function dev() {
  const { t } = useTranslation('common');
  return (
    <>
      <BigContainer size="lg">
        <Stack spacing="xl">
          <ContentWrapper>
            <Group position="center">
              <Button component={Link} href="/maker/recruit">
                {t('main_button_make_recruit')}
              </Button>
              <Button component={Link} href="/maker/enlist">
                {t('main_button_make_enlist')}
              </Button>
            </Group>
          </ContentWrapper>
          <MainSection title={t('main_section_recent_announcement')} seeMore href="/announce">
            <BulkPreview type="announce" withPage={{ page: 0, number: 5 }} />
          </MainSection>
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

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'data', 'nav', 'article_view'])),
  },
});

export default dev;
