import { ArticleData } from '@type/data/ArticleData';
import { DBArticle } from '@type/data/DBArticle';
import { DBArticleData } from '../../type/data/DBArticle';

export function articleConverToDb(article: ArticleData): DBArticleData {
  // TS-error ignored for data type conversion
  // @ts-ignore
  const articleToDB: DBArticleData = { ...article };
  articleToDB.jobs = JSON.stringify(articleToDB.jobs);
  if (articleToDB.schedule.time)
    articleToDB.schedule.time = JSON.stringify(articleToDB.schedule.time);
  return articleToDB;
}
