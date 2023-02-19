// ** deprecated **

import { ArticleData, ArticleSummary, Schedule } from '../../type/data/ArticleData';

interface BeforeSummurize extends ArticleSummary {
  description?: string;
  schedule?: Schedule;
}

export function summarizeArticle(article: ArticleData) {
  const newArticle: BeforeSummurize = { ...article };
  delete newArticle.description;
  delete newArticle.schedule;
  return newArticle as ArticleSummary;
}
