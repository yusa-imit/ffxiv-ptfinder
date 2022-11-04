import { atom } from 'recoil';
import { PinnedArticleStorage } from '../../type/PinnedArticleStorage';
import { persistAtomEffect } from '../SSR/persistAtomEffect';

export const PinnedArticles = atom<PinnedArticleStorage[]>({
  key: 'pinned_articles',
  default: [],
  effects_UNSTABLE: [persistAtomEffect],
});
