import ArticleHandler from '@components/Article/ArticleView/ArticleHandler';
import ArticleView from '@components/Article/ArticleView/ArticleView';
import { baseUrl } from '@constant/baseUrl';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { GetArticleReturnType } from '../../../src/type/api/article/get';

export async function getServerSideProps({ req, res, locale, query }: GetServerSidePropsContext) {
  const { id } = query;
  const { message, data }: GetArticleReturnType = await (
    await fetch(`${baseUrl}/api/article/enlist/${id}`)
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

function IdEnlistPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const article = data;
  return (
    <>
      <ArticleView article={article} />
      <ArticleHandler type="enlist" />
    </>
  );
}

export default IdEnlistPage;
