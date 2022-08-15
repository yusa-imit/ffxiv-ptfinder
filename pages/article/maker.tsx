import { ArticleMaker } from '@components/Article/Maker/ArticleMaker';
import { Locale } from '@type/Locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleData } from '../../src/type/data/ArticleData';

function maker() {
  return <ArticleMaker />;
}

export const getServerSideProps = async ({ locale }: { locale: Locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['article'])),
  },
});

export default maker;
