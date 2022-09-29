import ArticleMaker from '@components/Article/Maker/ArticleMaker';
import { useDocumentVisibility } from '@mantine/hooks';
import { Locale } from '@type/Locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

function enlist() {
  const documentState = useDocumentVisibility();
  useEffect(() => {}, [documentState]);
  return <ArticleMaker type="enlist" />;
}

export const getServerSideProps = async ({ locale }: { locale: Locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['article', 'article_view', 'data'])),
  },
});

export default enlist;
