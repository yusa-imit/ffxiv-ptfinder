import { ArticleFromDB } from '../../data/ArticleData';

export interface GetArticleQueryType {
  id?: string;
  page?: string;
  number?: string;
  s?: string;
}

export interface GetArticleReturnType {
  message: string;
  error?: Error;
  data: ArticleFromDB;
}

export interface GetArticleBulkReturnType {
  message: string;
  error?: Error;
  data: ArticleFromDB[];
}
