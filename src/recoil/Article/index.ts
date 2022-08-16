import { atom } from 'recoil';
import { ArticleData } from '../../type/data/ArticleData';

export const Article = atom<ArticleData>({
  key: 'article',
  default: {
    userId: '',
    title: '',
    description: '',
    isTemporary: false,
    game: { version: '6', patch: '0' },
    schedule: {
      writtenInDescription: false,
      dateTime: undefined,
      adjustable: false,
      day: undefined,
      dayPerWeek: undefined,
      timeType: 0,
      time: undefined,
      timezone: undefined,
    },
    type: 'raid',
    many: 0,
    jobs: [[]],
    minimumWeek: 0,
    firstWeekClear: false,
    worldFirstRace: false,
    farm: false,
    voiceChat: 0,
    region: 'JP',
    language: 'JP',
    specifyUserLanguage: undefined,
    answerType: 0,
    answerAddress: '',
  },
});
