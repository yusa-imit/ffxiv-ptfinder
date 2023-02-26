import { InstanceStore } from '@lib/contents/InstanceStore';
import { DBInstance } from '@type/data/DBInstance';

export async function getInstance(query: { [key: string]: string | undefined | string[] }) {
  const { code, version, patch, type, title } = query;
  const instances = await InstanceStore.get();
  if (!version && !patch && !type && !title && !code) {
    throw new Error('1002');
  }
  if (code && typeof code === 'string') {
    return { [code]: instances[code] };
  }
  let obj: { [key: string]: DBInstance } | null = null;
  if (title && typeof title === 'string') {
    const t = title.trim();
    if (t.length === 0) throw new Error('1003');
    obj = Object.keys(obj === null ? instances : obj)
      .filter((key) => {
        if (
          instances[key].title.en.includes(t) ||
          instances[key].title.jp.includes(t) ||
          instances[key].title.kr.includes(t)
        ) {
          return true;
        }
        return false;
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: instances[key] });
      }, {});
  }
  if (type && typeof type === 'string') {
    obj = Object.keys(obj === null ? instances : obj)
      .filter((key) => {
        return type.includes(key[2]);
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: instances[key] });
      }, {});
  }
  if (version && typeof version === 'string') {
    obj = Object.keys(obj === null ? instances : obj)
      .filter((key) => {
        return version.includes(key[0]);
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: instances[key] });
      }, {});
  }
  if (patch && typeof patch === 'string') {
    obj = Object.keys(obj === null ? instances : obj)
      .filter((key) => {
        return patch.includes(key[1]);
      })
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: instances[key] });
      }, {});
  }
  return obj;
}
