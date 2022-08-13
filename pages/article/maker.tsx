import { ArticleMaker } from '@components/Article/Maker/ArticleMaker';
import { ArticleData } from '../../src/type/data/ArticleData';

const DEV_TEST_DATA: ArticleData = {
  userId: '',
  title: '',
  description: '',
  isTemporary: false,
  game: {
    version: 6,
    patch: 1,
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
export default function article() {
  return <ArticleMaker data={DEV_TEST_DATA} />;
}
