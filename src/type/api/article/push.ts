import { ArticleData } from '../../data/ArticleData';

export interface PushArticleBodyType {
  data: ArticleData;
}

export interface PushArticleReturnType {
  destination?: string;
  message: string;
  error?: Error;
}
