import { mongodb_uris } from '@lib/db/mongodb/environments';
import { getCol } from '@lib/db/mongodb/singleton';
import { User } from '@type/data/User';
import { nanoid } from 'nanoid';
import { ArticleData, ArticleFromDB } from '../../type/data/ArticleData';
import { getArticleType } from '../getArticleType';
import { UNDER_TEST } from './UNDER_TEST';

export async function pushArticle(data: ArticleData, user: User) {
  const col = await getCol(
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    getArticleType(data.articleType)
  );
  const insertThis: ArticleFromDB = {
    ...data,
    id: nanoid(),
    date: Date.now(),
    authorId: user.id,
    authorInfo: { name: user.name, image: user.image },
    status: 0,
  };
  await col.insertOne(insertThis);
  return insertThis.id;
}
