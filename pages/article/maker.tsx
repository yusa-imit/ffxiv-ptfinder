import { ArticleMaker } from '@components/Article/Maker/ArticleMaker';
import { Locale } from '@type/Locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleData } from '../../src/type/data/ArticleData';

const DEV_TEST_DATA: ArticleData = {
  userId: '',
  title: '',
  description: '',
  isTemporary: false,
  game: {
    version: '6',
    patch: '1',
  },
  type: 'raid',
  many: 0,
  jobs: [['AST']],
  minimumWeek: 0,
  firstWeekClear: false,
  worldFirstRace: false,
  voiceChat: 0,
  region: 'JP',
  language: 'JP',
  answerType: 0,
};
function maker() {
  return <ArticleMaker data={DEV_TEST_DATA} />;
}

export const getServerSideProps = async ({ locale }: { locale: Locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['article'])),
  },
});

export default maker;
