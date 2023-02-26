import { ArticleData } from '@type/data/ArticleData';
import { DBArticle } from '@type/data/DBArticle';
import { Job } from '@type/data/FFXIVInfo';

export function articleConverToData(articleFromDB: DBArticle) {
  const fromDB = { ...articleFromDB };
  fromDB.article.jobs = JSON.parse(fromDB.article.jobs);
  if (fromDB.article.schedule.time)
    fromDB.article.schedule.time = JSON.parse(fromDB.article.schedule.time);
  // TS-error ignored for data type conversion
  // @ts-ignore
  return fromDB;
}
