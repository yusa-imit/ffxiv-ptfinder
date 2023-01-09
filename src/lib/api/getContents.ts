import { ContentStore } from '@lib/contents/ContentStore';
import { DBInstance } from '@type/data/DBInstance';

export async function getContents(query: { [key: string]: string | undefined | string[] }) {
  const { id, version, patch, type, title } = query;
  const contents = await ContentStore.Contents();
  if (!version && !patch && !type && !title && !id) {
    throw new Error('1002');
  }
  if (id && typeof id === 'string') {
    return { [id]: contents[id] };
  }
  let obj: { [key: string]: DBInstance } | null = null;
  if (title && typeof title === 'string') {
    const t = title.trim();
    if (t.length === 0) throw new Error('1003');
    obj = Object.keys(obj === null ? contents : obj)
      .filter((key) => {
        if (
          contents[key].title.en.includes(t) ||
          contents[key].title.jp.includes(t) ||
          contents[key].title.kr.includes(t)
        ) {
          return true;
        }
        return false;
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: contents[key] });
      }, {});
  }
  if (type && typeof type === 'string') {
    obj = Object.keys(obj === null ? contents : obj)
      .filter((key) => {
        return type.includes(key[2]);
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: contents[key] });
      }, {});
  }
  if (version && typeof version === 'string') {
    obj = Object.keys(obj === null ? contents : obj)
      .filter((key) => {
        return version.includes(key[0]);
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: contents[key] });
      }, {});
  }
  if (patch && typeof patch === 'string') {
    obj = Object.keys(obj === null ? contents : obj)
      .filter((key) => {
        return patch.includes(key[1]);
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: contents[key] });
      }, {});
  }
  return obj;
}
