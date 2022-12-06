import AnnounceView from '@components/Announce/AnnounceView';
import ArticleView from '@components/Article/ArticleView/ArticleView';
import AnnounceHandler from '@components/Announce/AnnounceHandler';
import { baseUrl } from '@constant/baseUrl';
import { GetAnnounceReturnType } from '@type/api/annouce/get';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { Card, Space, Title, Text, Group, Button, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BigContainer from '@components/base/BigContainer';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'nav'])),
    },
  };
}

function _404() {
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <BigContainer
      sx={(theme) => ({
        gap: theme.spacing.xl,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Title order={1}>{t('404_title')}</Title>
      <Text>{t('404_description')}</Text>
      <Group>
        <Button component={Link} href="/">
          {t('404_go_main')}
        </Button>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          {t('404_go_back')}
        </Button>
      </Group>
    </BigContainer>
  );
}

export default _404;
