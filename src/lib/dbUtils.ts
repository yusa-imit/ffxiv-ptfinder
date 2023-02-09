import { Resource } from '@azure/cosmos';

export function exceptSystemGenerated<T>(value: unknown): T {
  const { _etag, _rid, _self, _ts, _attachments, ...others } = value as T &
    Resource & { _attachments: any };
  return others as T;
}
export function isoToTime(str: string) {
  return new Date(str).getTime();
}

export function convertTime(value: any) {
  if (value.expires !== undefined) {
    return { ...value, expires: new Date(value.expires) };
  }
  if (value.emailVerified !== undefined) {
    return { ...value, emailVerified: new Date(value.emailVerified) };
  }
  return value;
}

export function convertCosmosDocument(value: unknown) {
  return convertTime(exceptSystemGenerated(value));
}
