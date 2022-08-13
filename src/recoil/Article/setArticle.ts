import { useSetRecoilState } from 'recoil';
import { Article } from '.';
import { ArticleData } from '../../type/data/ArticleData';

export function setArticle(data: ArticleData) {
  const setState = useSetRecoilState(Article);
  setState({ ...data });
}
