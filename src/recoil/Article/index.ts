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
      day: [0, 0, 0, 0, 0, 0, 0],
      timeType: 0,
      time: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      timezone: 'Pacific Daylight Time',
    },
    type: 'raid',
    many: 0,
    jobs: [[]],
    minimumWeek: 0,
    firstWeekClear: false,
    worldFirstRace: false,
    voiceChat: 0,
    region: 'JP',
    language: 'JP',
    answerType: 0,
    answerAddress: '',
  },
});
