import BigContainer from '@components/base/BigContainer';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import MainSection from '@components/MainSection/MainSection';
import { BulkPreview } from '@components/Preview/BulkPreview';
import IdPreview from '@components/Preview/IdPreview';
import { Button, Group, Stack } from '@mantine/core';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  console.log(locale);
  if (!locale) {
    return {
      redirect: {
        destination: '/en',
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'data', 'nav', 'article_view'])),
    },
  };
}

function Dev() {
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
            <BulkPreview type="announce" withPage={{ page: 1, number: 5 }} />
          </MainSection>
          <MainSection title={t('main_section_pinned_article')} seeMore href="/article/pinned">
            <IdPreview limit={5} />
          </MainSection>
          <MainSection title={t('main_section_recent_recruits')} seeMore href="/article/recruits">
            <BulkPreview type="recruit" withPage={{ page: 1, number: 5 }} />
          </MainSection>
          <MainSection title={t('main_section_recent_enlists')} seeMore href="/article/enlists">
            <BulkPreview type="enlist" withPage={{ page: 1, number: 5 }} />
          </MainSection>
        </Stack>
      </BigContainer>
    </>
  );
}
export default Dev;
