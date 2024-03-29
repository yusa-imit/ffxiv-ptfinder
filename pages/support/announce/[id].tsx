import AnnounceView from '@components/Announce/AnnounceView';
import ArticleView from '@components/Article/ArticleView/ArticleView';
import AnnounceHandler from '@components/Announce/AnnounceHandler';
import { baseUrl } from '@constant/baseUrl';
import { GetAnnounceReturnType } from '@type/api/annouce/get';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { Space } from '@mantine/core';

export async function getServerSideProps({ req, res, locale, query }: GetServerSidePropsContext) {
  const { id } = query;
  const { message, data }: GetAnnounceReturnType = await (
    await fetch(`${baseUrl}/api/announce/${id}?locale=${locale}`)
  ).json();
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'data', 'nav'])),
      message,
      data,
    },
  };
}

function IdEnlistPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <AnnounceView data={data} />
      <Space h="xl" />
      <AnnounceHandler />
    </>
  );
}

export default IdEnlistPage;
