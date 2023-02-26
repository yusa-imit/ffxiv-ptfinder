import { ArticleFromDB, ArticleFromDBSummary } from '@type/data/ArticleData';

export function articleSummarizer(value: ArticleFromDB | null): ArticleFromDBSummary | null {
  if (value === null) return null;
  const { description, schedule, ...rest } = value;
  return rest;
}
