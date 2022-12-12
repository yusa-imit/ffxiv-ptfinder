import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    ...serverSideTranslations(locale || 'en', ['common', 'data', 'nav']),
    revalidate: 3600,
  };
}

function ArticleMain() {
  return <></>;
}

export default ArticleMain;
