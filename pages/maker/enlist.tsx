import ArticleMaker from '@components/Article/Maker/ArticleMaker';
import { useDocumentVisibility } from '@mantine/hooks';
import { Locale } from '@type/Locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { GetStaticPropsContext } from 'next';

function enlist() {
  const documentState = useDocumentVisibility();
  useEffect(() => {}, [documentState]);
  return <ArticleMaker type="enlist" />;
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['article', 'article_view', 'data'])),
  },
});

export default enlist;
