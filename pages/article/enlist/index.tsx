import { getBulkArticleSummary } from '@lib/api/getArticle';
import { searchParamSolver } from '@lib/searchParamSolver';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ req, query, locale }: GetServerSidePropsContext) {
  const { page, number, ...searchStrings } = query;
  const searchIndexContexts = searchParamSolver(searchStrings); /*Object.fromEntries(
    Object.entries(searchStrings).map(([key, value]) =>
      value === undefined
        ? [key, value]
        : typeof value === 'string'
        ? [key, JSON.parse(value)]
        : [key, value.map((v) => JSON.parse(v))]
    )
  );*/
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'nav', 'data', 'article_view'])),
      articles: await getBulkArticleSummary(
        1,
        {
          articleType: 1,
          ...searchIndexContexts,
        },
        page ? Number(page) : undefined,
        number ? Number(number) : undefined
      ),
    },
  };
}

function enlistIndexPage({ articles }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(articles);
  return <></>;
}

export default enlistIndexPage;
