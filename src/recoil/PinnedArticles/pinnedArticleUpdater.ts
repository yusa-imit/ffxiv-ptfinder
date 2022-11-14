import { useSetRecoilState } from 'recoil';
import { PinnedArticles } from './PinnedArticles';
import { PinnedArticleStorage } from '../../type/PinnedArticleStorage';

export function pinnedArticleUpdater() {
  const setPinnedArticle = useSetRecoilState(PinnedArticles);
  const push = (value: PinnedArticleStorage) => {
    setPinnedArticle((prev) => {
      const newValue = [...prev];
      newValue.push(value);
      return newValue;
    });
  };
  const remove = (id: string, type?: 0 | 1) => {
    setPinnedArticle((prev) => {
      const newValue = [...prev];
      newValue.filter((v) => (v.id !== id && type === undefined ? true : v.type !== type));
      return newValue;
    });
  };
  return {
    push,
    remove,
  };
}
