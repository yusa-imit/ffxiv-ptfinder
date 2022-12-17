import ContentWrapper, {
  ResponsiveContentWrapper,
} from '@components/ContentWrapper/ContentWrapper';
import { Card, Group, Stack, Text } from '@mantine/core';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'data', 'nav'])),
    },
    revalidate: 3600,
  };
}

function ArticleMain() {
  const { t } = useTranslation('common');
  return (
    <Stack>
      <ContentWrapper>
        <Stack>
          <Group position="center">
            <Text>{t('article_index_text')}</Text>
          </Group>
        </Stack>
      </ContentWrapper>
      <Group>
        <ResponsiveContentWrapper style={{ flexGrow: 1 }}></ResponsiveContentWrapper>
        <ResponsiveContentWrapper style={{ flexGrow: 1 }}></ResponsiveContentWrapper>
      </Group>
    </Stack>
  );
}

export default ArticleMain;
