import { ArticleDataSummaryWithMeta, ArticleDataWithMeta } from '../../data/ArticleData';
import { User } from '../../data/User';

export interface GetArticleQueryType {
  id?: string;
  page?: string;
  number?: string;
  s?: string;
}

export interface GetArticleReturnType {
  message: string;
  error?: Error;
  data: [ArticleDataWithMeta, User];
}

export interface GetArticleBulkReturnType {
  message: string;
  error?: Error;
  data: [Record<string, ArticleDataSummaryWithMeta>, Record<string, User>];
}
