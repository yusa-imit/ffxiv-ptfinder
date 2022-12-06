import ArticleHandler from '@components/Article/ArticleView/ArticleHandler';
import ArticleView from '@components/Article/ArticleView/ArticleView';
import { baseUrl } from '@constant/baseUrl';
import { Space } from '@mantine/core';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { GetArticleReturnType } from '../../../src/type/api/article/get';

export async function getServerSideProps({ req, res, locale, query }: GetServerSidePropsContext) {
  const { id } = query;
  const { message, data }: GetArticleReturnType = await (
    await fetch(`${baseUrl}/api/article/recruit/${id}`)
  ).json();
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'data',
        'nav',
        'article',
        'article_view',
      ])),
      message,
      data,
    },
  };
}

function IdRecruitPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [articleWithMeta, user] = data;
  return (
    <>
      <ArticleView article={articleWithMeta.article} meta={articleWithMeta.meta} userData={user} />
      <Space h="xl" />
      <ArticleHandler type="recruit" />
    </>
  );
}

export default IdRecruitPage;
