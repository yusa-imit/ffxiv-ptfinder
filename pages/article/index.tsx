import SearchPanel from '@components/Article/SearchPanel';
import { ResponsiveContentWrapper } from '@components/ContentWrapper/ContentWrapper';
import { Button, Group, Stack, Text } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
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
      <SearchPanel />
      <Group
        sx={(theme) => ({
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
          },
        })}
      >
        <ResponsiveContentWrapper
          sx={(theme) => ({
            flexGrow: 1,
            height: '40vh',
            [theme.fn.smallerThan('sm')]: {
              width: '100%',
            },
          })}
        >
          <Stack style={{ height: '100%', width: '100%' }}>
            <Stack>
              <Text>{t('article_type_recruit', { ns: 'data' })}</Text>
            </Stack>
            <Group style={{ marginTop: 'auto', marginLeft: 'auto' }}>
              <Button component={Link} href="/maker/recruit">
                {t('make_recruit')}
              </Button>
              <Button component={Link} href="/article/recruit/list">
                {t('list_recruit')}
              </Button>
            </Group>
          </Stack>
        </ResponsiveContentWrapper>
        <ResponsiveContentWrapper
          sx={(theme) => ({
            flexGrow: 1,
            height: '40vh',
            [theme.fn.smallerThan('sm')]: {
              width: '100%',
            },
          })}
        >
          <Stack style={{ height: '100%', width: '100%' }}>
            <Stack>
              <Text>{t('article_type_recruit', { ns: 'data' })}</Text>
            </Stack>
            <Group style={{ marginTop: 'auto', marginLeft: 'auto' }}>
              <Button component={Link} href="/maker/recruit">
                {t('make_recruit')}
              </Button>
              <Button component={Link} href="/article/recruit/list">
                {t('list_recruit')}
              </Button>
            </Group>
          </Stack>
        </ResponsiveContentWrapper>
      </Group>
    </Stack>
  );
}

export default ArticleMain;
